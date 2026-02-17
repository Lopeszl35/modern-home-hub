import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

// ─── Model ───────────────────────────────────────────────────────────
class FixedExpense {
  final String id;
  final String name;
  final String category;
  final double amount;
  final int dueDay;
  bool isActive;

  FixedExpense({
    required this.id,
    required this.name,
    required this.category,
    required this.amount,
    required this.dueDay,
    this.isActive = true,
  });

  FixedExpense copyWith({
    String? name,
    String? category,
    double? amount,
    int? dueDay,
    bool? isActive,
  }) {
    return FixedExpense(
      id: id,
      name: name ?? this.name,
      category: category ?? this.category,
      amount: amount ?? this.amount,
      dueDay: dueDay ?? this.dueDay,
      isActive: isActive ?? this.isActive,
    );
  }
}

// ─── Category Config ─────────────────────────────────────────────────
class _CategoryConfig {
  final String label;
  final IconData icon;
  final Color color;

  const _CategoryConfig({
    required this.label,
    required this.icon,
    required this.color,
  });
}

final Map<String, _CategoryConfig> _categoryConfig = {
  'utilities': _CategoryConfig(
    label: 'Utilidades',
    icon: Icons.bolt_rounded,
    color: const Color(0xFFF59E0B),
  ),
  'subscriptions': _CategoryConfig(
    label: 'Assinaturas',
    icon: Icons.subscriptions_rounded,
    color: const Color(0xFF8B5CF6),
  ),
  'health': _CategoryConfig(
    label: 'Saúde',
    icon: Icons.favorite_rounded,
    color: const Color(0xFFEF4444),
  ),
  'education': _CategoryConfig(
    label: 'Educação',
    icon: Icons.school_rounded,
    color: const Color(0xFF3B82F6),
  ),
  'housing': _CategoryConfig(
    label: 'Moradia',
    icon: Icons.home_rounded,
    color: const Color(0xFF10B981),
  ),
  'other': _CategoryConfig(
    label: 'Outros',
    icon: Icons.more_horiz_rounded,
    color: const Color(0xFF6B7280),
  ),
};

// ─── AppColors (reuse from your theme) ───────────────────────────────
class _C {
  static const background = Color(0xFF0F1117);
  static const surface = Color(0xFF1A1D27);
  static const surfaceLight = Color(0xFF252836);
  static const primary = Color(0xFF6C63FF);
  static const textPrimary = Color(0xFFF1F1F1);
  static const textSecondary = Color(0xFF9CA3AF);
  static const destructive = Color(0xFFEF4444);
  static const success = Color(0xFF10B981);
  static const warning = Color(0xFFF59E0B);
  static const border = Color(0xFF2A2D3A);
}

// ─── Mock Data ───────────────────────────────────────────────────────
final List<FixedExpense> _mockExpenses = [
  FixedExpense(id: '1', name: 'Conta de Luz', category: 'utilities', amount: 180, dueDay: 10),
  FixedExpense(id: '2', name: 'Conta de Água', category: 'utilities', amount: 85, dueDay: 15),
  FixedExpense(id: '3', name: 'Internet', category: 'subscriptions', amount: 120, dueDay: 5),
  FixedExpense(id: '4', name: 'Netflix', category: 'subscriptions', amount: 55.90, dueDay: 8),
  FixedExpense(id: '5', name: 'Spotify', category: 'subscriptions', amount: 21.90, dueDay: 12),
  FixedExpense(id: '6', name: 'Academia', category: 'health', amount: 150, dueDay: 1),
  FixedExpense(id: '7', name: 'Plano de Saúde', category: 'health', amount: 450, dueDay: 20),
  FixedExpense(id: '8', name: 'Aluguel', category: 'housing', amount: 1800, dueDay: 5),
  FixedExpense(id: '9', name: 'Condomínio', category: 'housing', amount: 600, dueDay: 10),
  FixedExpense(id: '10', name: 'Curso de Inglês', category: 'education', amount: 300, dueDay: 15, isActive: false),
];

// ═════════════════════════════════════════════════════════════════════
// SCREEN
// ═════════════════════════════════════════════════════════════════════
class FixedExpensesScreen extends StatefulWidget {
  const FixedExpensesScreen({super.key});

  @override
  State<FixedExpensesScreen> createState() => _FixedExpensesScreenState();
}

class _FixedExpensesScreenState extends State<FixedExpensesScreen> {
  late List<FixedExpense> _expenses;
  String _activeFilter = 'all';

  final _currencyFormat = NumberFormat.currency(locale: 'pt_BR', symbol: 'R\$');

  @override
  void initState() {
    super.initState();
    _expenses = List.from(_mockExpenses);
  }

  List<FixedExpense> get _activeExpenses => _expenses.where((e) => e.isActive).toList();

  double get _totalMonthly => _activeExpenses.fold(0, (s, e) => s + e.amount);

  double get _totalAnnual => _totalMonthly * 12;

  List<FixedExpense> get _upcomingExpenses {
    final today = DateTime.now().day;
    return _activeExpenses.where((e) => e.dueDay >= today && e.dueDay <= today + 7).toList();
  }

  List<FixedExpense> get _filteredExpenses {
    if (_activeFilter == 'all') return _expenses;
    return _expenses.where((e) => e.category == _activeFilter).toList();
  }

  Map<String, double> get _categoryTotals {
    final map = <String, double>{};
    for (final e in _activeExpenses) {
      map[e.category] = (map[e.category] ?? 0) + e.amount;
    }
    return map;
  }

  void _toggleExpense(String id) {
    setState(() {
      final i = _expenses.indexWhere((e) => e.id == id);
      if (i != -1) _expenses[i].isActive = !_expenses[i].isActive;
    });
  }

  void _deleteExpense(String id) {
    setState(() => _expenses.removeWhere((e) => e.id == id));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Gasto fixo removido!')),
    );
  }

  void _addExpense(FixedExpense expense) {
    setState(() => _expenses.add(expense));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Gasto fixo adicionado!')),
    );
  }

  void _updateExpense(FixedExpense expense) {
    setState(() {
      final i = _expenses.indexWhere((e) => e.id == expense.id);
      if (i != -1) _expenses[i] = expense;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Gasto fixo atualizado!')),
    );
  }

  // ─── Build ───────────────────────────────────────────────────────
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _C.background,
      appBar: AppBar(
        backgroundColor: _C.surface,
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Gastos Fixos', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: _C.textPrimary)),
            Text('Despesas recorrentes', style: TextStyle(fontSize: 12, color: _C.textSecondary)),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: _C.primary,
        onPressed: () => _showAddModal(context),
        child: const Icon(Icons.add_rounded, color: Colors.white),
      ),
      body: RefreshIndicator(
        onRefresh: () async => setState(() {}),
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _buildStatCards(),
            const SizedBox(height: 16),
            _buildCategorySummary(),
            const SizedBox(height: 16),
            _buildFilterTabs(),
            const SizedBox(height: 12),
            ..._filteredExpenses.map((e) => Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: _buildExpenseCard(e),
            )),
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }

  // ─── Stat Cards (horizontal scroll) ────────────────────────────
  Widget _buildStatCards() {
    return SizedBox(
      height: 110,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: [
          _statCard('Total Mensal', _currencyFormat.format(_totalMonthly),
              '${_activeExpenses.length} ativas', Icons.trending_up_rounded, _C.primary),
          const SizedBox(width: 12),
          _statCard('Total Anual', _currencyFormat.format(_totalAnnual),
              '12 meses', Icons.calendar_month_rounded, _C.warning),
          const SizedBox(width: 12),
          _statCard('Em 7 dias',
              _currencyFormat.format(_upcomingExpenses.fold(0.0, (s, e) => s + e.amount)),
              '${_upcomingExpenses.length} vencimentos', Icons.warning_amber_rounded, _C.destructive),
        ],
      ),
    );
  }

  Widget _statCard(String title, String value, String subtitle, IconData icon, Color accentColor) {
    return Container(
      width: 170,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: _C.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: _C.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(children: [
            Icon(icon, size: 16, color: accentColor),
            const SizedBox(width: 6),
            Text(title, style: const TextStyle(fontSize: 11, color: _C.textSecondary)),
          ]),
          const SizedBox(height: 8),
          Text(value, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: _C.textPrimary)),
          const SizedBox(height: 4),
          Text(subtitle, style: const TextStyle(fontSize: 11, color: _C.textSecondary)),
        ],
      ),
    );
  }

  // ─── Category Summary ──────────────────────────────────────────
  Widget _buildCategorySummary() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: _C.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: _C.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Por Categoria', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: _C.textPrimary)),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: _categoryTotals.entries.map((entry) {
              final cfg = _categoryConfig[entry.key]!;
              return Container(
                width: (MediaQuery.of(context).size.width - 56) / 2,
                padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 10),
                decoration: BoxDecoration(
                  color: cfg.color.withOpacity(0.08),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Column(
                  children: [
                    Text(cfg.label, style: TextStyle(fontSize: 11, color: cfg.color)),
                    const SizedBox(height: 4),
                    Text(_currencyFormat.format(entry.value),
                        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: _C.textPrimary)),
                  ],
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  // ─── Filter Tabs ───────────────────────────────────────────────
  Widget _buildFilterTabs() {
    final filters = [
      MapEntry('all', 'Todas'),
      ..._categoryConfig.entries.map((e) => MapEntry(e.key, e.value.label)),
    ];

    return SizedBox(
      height: 36,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: filters.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (_, i) {
          final f = filters[i];
          final selected = _activeFilter == f.key;
          return GestureDetector(
            onTap: () => setState(() => _activeFilter = f.key),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: selected ? _C.primary : _C.surfaceLight,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(f.value,
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: selected ? FontWeight.w600 : FontWeight.normal,
                    color: selected ? Colors.white : _C.textSecondary,
                  )),
            ),
          );
        },
      ),
    );
  }

  // ─── Expense Card ──────────────────────────────────────────────
  Widget _buildExpenseCard(FixedExpense expense) {
    final cfg = _categoryConfig[expense.category] ?? _categoryConfig['other']!;

    return GestureDetector(
      onTap: () => _showEditModal(context, expense),
      child: AnimatedOpacity(
        opacity: expense.isActive ? 1.0 : 0.5,
        duration: const Duration(milliseconds: 200),
        child: Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: _C.surface,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: _C.border),
          ),
          child: Row(
            children: [
              // Icon
              Container(
                width: 42,
                height: 42,
                decoration: BoxDecoration(
                  color: cfg.color.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(cfg.icon, size: 20, color: cfg.color),
              ),
              const SizedBox(width: 12),
              // Info
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(expense.name,
                        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: _C.textPrimary)),
                    const SizedBox(height: 2),
                    Row(children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: cfg.color.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(cfg.label, style: TextStyle(fontSize: 10, color: cfg.color)),
                      ),
                      const SizedBox(width: 8),
                      Text('Dia ${expense.dueDay}',
                          style: const TextStyle(fontSize: 11, color: _C.textSecondary)),
                    ]),
                  ],
                ),
              ),
              // Amount + Switch
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(_currencyFormat.format(expense.amount),
                      style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: _C.textPrimary)),
                  const SizedBox(height: 4),
                  SizedBox(
                    height: 24,
                    child: Switch(
                      value: expense.isActive,
                      activeColor: _C.success,
                      onChanged: (_) => _toggleExpense(expense.id),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  // ─── Add Modal ─────────────────────────────────────────────────
  void _showAddModal(BuildContext context) {
    String name = '';
    String category = 'utilities';
    String amount = '';
    String dueDay = '';

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: _C.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setModalState) {
          return Padding(
            padding: EdgeInsets.only(
              left: 20, right: 20, top: 24,
              bottom: MediaQuery.of(ctx).viewInsets.bottom + 24,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(width: 40, height: 4, decoration: BoxDecoration(
                    color: _C.textSecondary.withOpacity(0.3), borderRadius: BorderRadius.circular(2))),
                ),
                const SizedBox(height: 20),
                const Text('Adicionar Gasto Fixo',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: _C.textPrimary)),
                const SizedBox(height: 20),
                _modalTextField('Nome', 'Ex: Conta de Luz', (v) => name = v),
                const SizedBox(height: 12),
                // Category Dropdown
                DropdownButtonFormField<String>(
                  value: category,
                  dropdownColor: _C.surfaceLight,
                  decoration: _inputDecoration('Categoria'),
                  style: const TextStyle(color: _C.textPrimary, fontSize: 14),
                  items: _categoryConfig.entries.map((e) => DropdownMenuItem(
                    value: e.key,
                    child: Row(children: [
                      Icon(e.value.icon, size: 16, color: e.value.color),
                      const SizedBox(width: 8),
                      Text(e.value.label),
                    ]),
                  )).toList(),
                  onChanged: (v) => setModalState(() => category = v!),
                ),
                const SizedBox(height: 12),
                Row(children: [
                  Expanded(child: _modalTextField('Valor (R\$)', '150.00', (v) => amount = v, isNumber: true)),
                  const SizedBox(width: 12),
                  Expanded(child: _modalTextField('Dia Venc.', '10', (v) => dueDay = v, isNumber: true)),
                ]),
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _C.primary,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    ),
                    onPressed: () {
                      if (name.isEmpty || amount.isEmpty || dueDay.isEmpty) return;
                      final expense = FixedExpense(
                        id: DateTime.now().millisecondsSinceEpoch.toString(),
                        name: name,
                        category: category,
                        amount: double.tryParse(amount) ?? 0,
                        dueDay: int.tryParse(dueDay) ?? 1,
                      );
                      _addExpense(expense);
                      Navigator.pop(ctx);
                    },
                    child: const Text('Adicionar', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: Colors.white)),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  // ─── Edit Modal ────────────────────────────────────────────────
  void _showEditModal(BuildContext context, FixedExpense expense) {
    String name = expense.name;
    String category = expense.category;
    String amount = expense.amount.toString();
    String dueDay = expense.dueDay.toString();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: _C.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setModalState) {
          return Padding(
            padding: EdgeInsets.only(
              left: 20, right: 20, top: 24,
              bottom: MediaQuery.of(ctx).viewInsets.bottom + 24,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(width: 40, height: 4, decoration: BoxDecoration(
                    color: _C.textSecondary.withOpacity(0.3), borderRadius: BorderRadius.circular(2))),
                ),
                const SizedBox(height: 20),
                const Text('Editar Gasto Fixo',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: _C.textPrimary)),
                const SizedBox(height: 20),
                _modalTextField('Nome', '', (v) => name = v, initial: name),
                const SizedBox(height: 12),
                DropdownButtonFormField<String>(
                  value: category,
                  dropdownColor: _C.surfaceLight,
                  decoration: _inputDecoration('Categoria'),
                  style: const TextStyle(color: _C.textPrimary, fontSize: 14),
                  items: _categoryConfig.entries.map((e) => DropdownMenuItem(
                    value: e.key,
                    child: Row(children: [
                      Icon(e.value.icon, size: 16, color: e.value.color),
                      const SizedBox(width: 8),
                      Text(e.value.label),
                    ]),
                  )).toList(),
                  onChanged: (v) => setModalState(() => category = v!),
                ),
                const SizedBox(height: 12),
                Row(children: [
                  Expanded(child: _modalTextField('Valor (R\$)', '', (v) => amount = v, isNumber: true, initial: amount)),
                  const SizedBox(width: 12),
                  Expanded(child: _modalTextField('Dia Venc.', '', (v) => dueDay = v, isNumber: true, initial: dueDay)),
                ]),
                const SizedBox(height: 16),
                Row(children: [
                  Expanded(
                    child: SizedBox(
                      height: 50,
                      child: OutlinedButton(
                        style: OutlinedButton.styleFrom(
                          side: const BorderSide(color: _C.destructive),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                        onPressed: () {
                          Navigator.pop(ctx);
                          _deleteExpense(expense.id);
                        },
                        child: const Text('Excluir', style: TextStyle(color: _C.destructive)),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: SizedBox(
                      height: 50,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: _C.primary,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                        onPressed: () {
                          if (name.isEmpty || amount.isEmpty || dueDay.isEmpty) return;
                          _updateExpense(expense.copyWith(
                            name: name,
                            category: category,
                            amount: double.tryParse(amount) ?? expense.amount,
                            dueDay: int.tryParse(dueDay) ?? expense.dueDay,
                          ));
                          Navigator.pop(ctx);
                        },
                        child: const Text('Salvar', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: Colors.white)),
                      ),
                    ),
                  ),
                ]),
              ],
            ),
          );
        },
      ),
    );
  }

  // ─── Helpers ───────────────────────────────────────────────────
  Widget _modalTextField(String label, String hint, ValueChanged<String> onChanged,
      {bool isNumber = false, String? initial}) {
    return TextFormField(
      initialValue: initial,
      style: const TextStyle(color: _C.textPrimary, fontSize: 14),
      keyboardType: isNumber ? const TextInputType.numberWithOptions(decimal: true) : TextInputType.text,
      decoration: _inputDecoration(label, hint: hint),
      onChanged: onChanged,
    );
  }

  InputDecoration _inputDecoration(String label, {String? hint}) {
    return InputDecoration(
      labelText: label,
      hintText: hint,
      labelStyle: const TextStyle(color: _C.textSecondary, fontSize: 13),
      hintStyle: TextStyle(color: _C.textSecondary.withOpacity(0.5), fontSize: 13),
      filled: true,
      fillColor: _C.surfaceLight,
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
      enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: _C.border)),
      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: _C.primary)),
      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
    );
  }
}
