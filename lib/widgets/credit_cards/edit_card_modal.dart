import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../theme/app_theme.dart';

class EditableCreditCard {
  final String id;
  String name;
  String lastDigits;
  String brand;
  double limit;
  double usedLimit;
  int dueDay;
  int closingDay;
  String color;

  EditableCreditCard({
    required this.id,
    required this.name,
    required this.lastDigits,
    required this.brand,
    required this.limit,
    required this.usedLimit,
    required this.dueDay,
    required this.closingDay,
    required this.color,
  });

  EditableCreditCard copyWith({
    String? name,
    String? lastDigits,
    String? brand,
    double? limit,
    double? usedLimit,
    int? dueDay,
    int? closingDay,
    String? color,
  }) {
    return EditableCreditCard(
      id: id,
      name: name ?? this.name,
      lastDigits: lastDigits ?? this.lastDigits,
      brand: brand ?? this.brand,
      limit: limit ?? this.limit,
      usedLimit: usedLimit ?? this.usedLimit,
      dueDay: dueDay ?? this.dueDay,
      closingDay: closingDay ?? this.closingDay,
      color: color ?? this.color,
    );
  }
}

class EditCardModal extends StatefulWidget {
  final EditableCreditCard card;
  final void Function(EditableCreditCard) onSave;

  const EditCardModal({super.key, required this.card, required this.onSave});

  @override
  State<EditCardModal> createState() => _EditCardModalState();
}

class _EditCardModalState extends State<EditCardModal> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _nameController;
  late final TextEditingController _lastDigitsController;
  late final TextEditingController _limitController;
  late final TextEditingController _usedLimitController;
  late final TextEditingController _dueDayController;
  late final TextEditingController _closingDayController;

  late String _selectedBrand;
  late String _selectedColor;

  static const List<Map<String, String>> cardColors = [
    {'name': 'Azul', 'value': '#1e40af'},
    {'name': 'Roxo', 'value': '#7c3aed'},
    {'name': 'Verde', 'value': '#059669'},
    {'name': 'Vermelho', 'value': '#dc2626'},
    {'name': 'Laranja', 'value': '#ea580c'},
    {'name': 'Rosa', 'value': '#db2777'},
    {'name': 'Cinza', 'value': '#475569'},
    {'name': 'Preto', 'value': '#18181b'},
  ];

  static const List<Map<String, String>> brands = [
    {'label': 'Visa', 'value': 'visa'},
    {'label': 'Mastercard', 'value': 'mastercard'},
    {'label': 'Elo', 'value': 'elo'},
    {'label': 'American Express', 'value': 'amex'},
    {'label': 'Outro', 'value': 'other'},
  ];

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: widget.card.name);
    _lastDigitsController = TextEditingController(text: widget.card.lastDigits);
    _limitController = TextEditingController(text: widget.card.limit.toStringAsFixed(0));
    _usedLimitController = TextEditingController(text: widget.card.usedLimit.toStringAsFixed(0));
    _dueDayController = TextEditingController(text: widget.card.dueDay.toString());
    _closingDayController = TextEditingController(text: widget.card.closingDay.toString());
    _selectedBrand = widget.card.brand;
    _selectedColor = widget.card.color;
  }

  @override
  void dispose() {
    _nameController.dispose();
    _lastDigitsController.dispose();
    _limitController.dispose();
    _usedLimitController.dispose();
    _dueDayController.dispose();
    _closingDayController.dispose();
    super.dispose();
  }

  void _handleSubmit() {
    if (_formKey.currentState!.validate()) {
      widget.onSave(widget.card.copyWith(
        name: _nameController.text,
        lastDigits: _lastDigitsController.text,
        brand: _selectedBrand,
        limit: double.tryParse(_limitController.text) ?? widget.card.limit,
        usedLimit: double.tryParse(_usedLimitController.text) ?? widget.card.usedLimit,
        dueDay: int.tryParse(_dueDayController.text) ?? widget.card.dueDay,
        closingDay: int.tryParse(_closingDayController.text) ?? widget.card.closingDay,
        color: _selectedColor,
      ));
      Navigator.of(context).pop();
    }
  }

  Color _hexToColor(String hex) {
    hex = hex.replaceFirst('#', '');
    return Color(int.parse('FF$hex', radix: 16));
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: AppColors.card,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      insetPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Editar Cartão',
                      style: TextStyle(
                        color: AppColors.foreground,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    IconButton(
                      onPressed: () => Navigator.of(context).pop(),
                      icon: const Icon(Icons.close, color: AppColors.mutedForeground),
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(),
                    ),
                  ],
                ),
                const SizedBox(height: 20),

                // Nome do Cartão
                _buildLabel('Nome do Cartão'),
                const SizedBox(height: 6),
                _buildTextField(
                  controller: _nameController,
                  hint: 'Ex: Nubank, Itaú...',
                  validator: (v) => v == null || v.isEmpty ? 'Informe o nome' : null,
                ),
                const SizedBox(height: 16),

                // Últimos 4 dígitos + Bandeira
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildLabel('Últimos 4 dígitos'),
                          const SizedBox(height: 6),
                          _buildTextField(
                            controller: _lastDigitsController,
                            hint: '0000',
                            maxLength: 4,
                            keyboardType: TextInputType.number,
                            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                            validator: (v) => v == null || v.length != 4 ? '4 dígitos' : null,
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildLabel('Bandeira'),
                          const SizedBox(height: 6),
                          _buildDropdown(
                            value: _selectedBrand,
                            items: brands,
                            onChanged: (v) => setState(() => _selectedBrand = v!),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Limite Total + Limite Usado
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildLabel('Limite Total'),
                          const SizedBox(height: 6),
                          _buildTextField(
                            controller: _limitController,
                            hint: '5000',
                            keyboardType: TextInputType.number,
                            validator: (v) => v == null || v.isEmpty ? 'Informe o limite' : null,
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildLabel('Limite Usado'),
                          const SizedBox(height: 6),
                          _buildTextField(
                            controller: _usedLimitController,
                            hint: '0',
                            keyboardType: TextInputType.number,
                            validator: (v) => v == null || v.isEmpty ? 'Informe o valor' : null,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Fechamento + Vencimento
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildLabel('Dia do Fechamento'),
                          const SizedBox(height: 6),
                          _buildTextField(
                            controller: _closingDayController,
                            hint: '15',
                            keyboardType: TextInputType.number,
                            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                            validator: (v) {
                              final n = int.tryParse(v ?? '');
                              if (n == null || n < 1 || n > 31) return '1-31';
                              return null;
                            },
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildLabel('Dia do Vencimento'),
                          const SizedBox(height: 6),
                          _buildTextField(
                            controller: _dueDayController,
                            hint: '25',
                            keyboardType: TextInputType.number,
                            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                            validator: (v) {
                              final n = int.tryParse(v ?? '');
                              if (n == null || n < 1 || n > 31) return '1-31';
                              return null;
                            },
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Cor do Cartão
                _buildLabel('Cor do Cartão'),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 10,
                  runSpacing: 10,
                  children: cardColors.map((c) {
                    final isSelected = _selectedColor == c['value'];
                    return GestureDetector(
                      onTap: () => setState(() => _selectedColor = c['value']!),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        width: 36,
                        height: 36,
                        decoration: BoxDecoration(
                          color: _hexToColor(c['value']!),
                          shape: BoxShape.circle,
                          border: isSelected
                              ? Border.all(color: AppColors.primary, width: 3)
                              : null,
                          boxShadow: isSelected
                              ? [BoxShadow(color: AppColors.primary.withOpacity(0.4), blurRadius: 8)]
                              : null,
                        ),
                        child: isSelected
                            ? const Icon(Icons.check, color: Colors.white, size: 18)
                            : null,
                      ),
                    );
                  }).toList(),
                ),
                const SizedBox(height: 24),

                // Botões Cancelar + Salvar
                Row(
                  children: [
                    Expanded(
                      child: SizedBox(
                        height: 48,
                        child: OutlinedButton(
                          onPressed: () => Navigator.of(context).pop(),
                          style: OutlinedButton.styleFrom(
                            foregroundColor: AppColors.foreground,
                            side: BorderSide(color: AppColors.border),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          child: const Text(
                            'Cancelar',
                            style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: SizedBox(
                        height: 48,
                        child: ElevatedButton(
                          onPressed: _handleSubmit,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.primary,
                            foregroundColor: AppColors.background,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                            elevation: 0,
                          ),
                          child: const Text(
                            'Salvar Alterações',
                            style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLabel(String text) {
    return Text(
      text,
      style: const TextStyle(
        color: AppColors.foreground,
        fontSize: 13,
        fontWeight: FontWeight.w500,
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String hint,
    int? maxLength,
    TextInputType? keyboardType,
    List<TextInputFormatter>? inputFormatters,
    String? Function(String?)? validator,
  }) {
    return TextFormField(
      controller: controller,
      maxLength: maxLength,
      keyboardType: keyboardType,
      inputFormatters: inputFormatters,
      validator: validator,
      style: const TextStyle(color: AppColors.foreground, fontSize: 14),
      decoration: InputDecoration(
        hintText: hint,
        hintStyle: TextStyle(color: AppColors.mutedForeground.withOpacity(0.5)),
        counterText: '',
        filled: true,
        fillColor: AppColors.background,
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide(color: AppColors.border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide(color: AppColors.border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: AppColors.primary, width: 1.5),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: AppColors.danger),
        ),
      ),
    );
  }

  Widget _buildDropdown({
    required String value,
    required List<Map<String, String>> items,
    required void Function(String?) onChanged,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14),
      decoration: BoxDecoration(
        color: AppColors.background,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppColors.border),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          value: value,
          isExpanded: true,
          dropdownColor: AppColors.card,
          style: const TextStyle(color: AppColors.foreground, fontSize: 14),
          icon: const Icon(Icons.keyboard_arrow_down, color: AppColors.mutedForeground),
          items: items
              .map((item) => DropdownMenuItem(
                    value: item['value'],
                    child: Text(item['label']!),
                  ))
              .toList(),
          onChanged: onChanged,
        ),
      ),
    );
  }
}

/// Helper para abrir o modal de edição
void showEditCardModal(
  BuildContext context,
  EditableCreditCard card,
  void Function(EditableCreditCard) onSave,
) {
  showDialog(
    context: context,
    builder: (_) => EditCardModal(card: card, onSave: onSave),
  );
}
