import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

// ─── Model ───────────────────────────────────────────────────────────
class PaymentReminder {
  final String id;
  String description;
  String vendorName;
  double amount;
  String purchaseDate; // yyyy-MM-dd
  String dueDate;      // yyyy-MM-dd
  String paymentMethod; // 'pix' | 'dinheiro'
  String status;        // 'pending' | 'paid'
  String? notes;
  String? paidAt;

  PaymentReminder({
    required this.id,
    required this.description,
    required this.vendorName,
    required this.amount,
    required this.purchaseDate,
    required this.dueDate,
    required this.paymentMethod,
    this.status = 'pending',
    this.notes,
    this.paidAt,
  });

  PaymentReminder copyWith({
    String? description,
    String? vendorName,
    double? amount,
    String? purchaseDate,
    String? dueDate,
    String? paymentMethod,
    String? status,
    String? notes,
    String? paidAt,
  }) {
    return PaymentReminder(
      id: id,
      description: description ?? this.description,
      vendorName: vendorName ?? this.vendorName,
      amount: amount ?? this.amount,
      purchaseDate: purchaseDate ?? this.purchaseDate,
      dueDate: dueDate ?? this.dueDate,
      paymentMethod: paymentMethod ?? this.paymentMethod,
      status: status ?? this.status,
      notes: notes ?? this.notes,
      paidAt: paidAt ?? this.paidAt,
    );
  }
}

// ─── Colors ──────────────────────────────────────────────────────────
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
final List<PaymentReminder> _mockReminders = [
  PaymentReminder(
    id: '1',
    description: 'Bolo de aniversário',
    vendorName: 'Maria Doces',
    amount: 150,
    purchaseDate: '2024-01-10',
    dueDate: '2024-01-15',
    paymentMethod: 'pix',
  ),
  PaymentReminder(
    id: '2',
    description: 'Marmitas da semana',
    vendorName: 'Restaurante da Vó',
    amount: 200,
    purchaseDate: '2024-01-08',
    dueDate: '2024-01-12',
    paymentMethod: 'dinheiro',
    status: 'paid',
    paidAt: '2024-01-12',
  ),
  PaymentReminder(
    id: '3',
    description: 'Salgados para festa',
    vendorName: 'Dona Cida Salgados',
    amount: 320,
    purchaseDate: '2024-01-20',
    dueDate: '2025-02-25',
    paymentMethod: 'pix',
    notes: 'Pagar até sexta sem falta',
  ),
];

// ═════════════════════════════════════════════════════════════════════
// SCREEN
// ═════════════════════════════════════════════════════════════════════
class PaymentRemindersScreen extends StatefulWidget {
  const PaymentRemindersScreen({super.key});

  @override
  State<PaymentRemindersScreen> createState() => _PaymentRemindersScreenState();
}

class _PaymentRemindersScreenState extends State<PaymentRemindersScreen> {
  late List<PaymentReminder> _reminders;
  final _currencyFormat = NumberFormat.currency(locale: 'pt_BR', symbol: 'R\$');
  final _dateFormat = DateFormat('dd/MM/yyyy');

  @override
  void initState() {
    super.initState();
    _reminders = List.from(_mockReminders);
  }

  List<PaymentReminder> get _pending => _reminders.where((r) => r.status == 'pending').toList();
  List<PaymentReminder> get _paid => _reminders.where((r) => r.status == 'paid').toList();
  double get _totalPending => _pending.fold(0, (s, r) => s + r.amount);

  bool _isOverdue(String dueDate) {
    try {
      final due = DateTime.parse(dueDate);
      return due.isBefore(DateTime.now().copyWith(hour: 0, minute: 0, second: 0));
    } catch (_) {
      return false;
    }
  }

  String _formatDate(String dateStr) {
    try {
      return _dateFormat.format(DateTime.parse(dateStr));
    } catch (_) {
      return dateStr;
    }
  }

  void _markAsPaid(String id) {
    setState(() {
      final i = _reminders.indexWhere((r) => r.id == id);
      if (i != -1) {
        _reminders[i].status = 'paid';
        _reminders[i].paidAt = DateTime.now().toIso8601String();
      }
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Pagamento confirmado! ✅')),
    );
  }

  void _deleteReminder(String id) {
    setState(() => _reminders.removeWhere((r) => r.id == id));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Lembrete removido!')),
    );
  }

  void _addReminder(PaymentReminder reminder) {
    setState(() => _reminders.add(reminder));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Lembrete adicionado!')),
    );
  }

  void _updateReminder(PaymentReminder reminder) {
    setState(() {
      final i = _reminders.indexWhere((r) => r.id == reminder.id);
      if (i != -1) _reminders[i] = reminder;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Lembrete atualizado!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _C.background,
      appBar: AppBar(
        backgroundColor: _C.surface,
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Lembretes de Pagamento',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: _C.textPrimary)),
            Text('Compras fiado / pagamentos futuros',
                style: TextStyle(fontSize: 11, color: _C.textSecondary)),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: _C.primary,
        onPressed: () => _showAddModal(context),
        child: const Icon(Icons.add_rounded, color: Colors.white),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildSummaryCard(),
          const SizedBox(height: 20),
          // Pending
          _sectionHeader('Pagamentos Pendentes', Icons.access_time_rounded, _C.warning, _pending.length),
          const SizedBox(height: 10),
          if (_pending.isEmpty)
            _emptyState('Nenhum pagamento pendente 🎉')
          else
            ..._pending.map((r) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: _buildPendingCard(r),
            )),
          const SizedBox(height: 16),
          // Paid
          if (_paid.isNotEmpty) ...[
            _sectionHeader('Pagamentos Realizados', Icons.check_circle_outline_rounded, _C.success, _paid.length),
            const SizedBox(height: 10),
            ..._paid.map((r) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: _buildPaidCard(r),
            )),
          ],
          const SizedBox(height: 80),
        ],
      ),
    );
  }

  // ─── Summary Card ──────────────────────────────────────────────
  Widget _buildSummaryCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [_C.warning.withOpacity(0.12), Colors.orange.withOpacity(0.08)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: _C.warning.withOpacity(0.2)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('Total Pendente', style: TextStyle(fontSize: 12, color: _C.textSecondary)),
              const SizedBox(height: 4),
              Text(_currencyFormat.format(_totalPending),
                  style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: _C.textPrimary)),
            ],
          ),
          Row(children: [
            _miniStat('${_pending.length}', 'Pendentes', _C.warning),
            const SizedBox(width: 20),
            _miniStat('${_paid.length}', 'Pagos', _C.success),
          ]),
        ],
      ),
    );
  }

  Widget _miniStat(String value, String label, Color color) {
    return Column(children: [
      Text(value, style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: color)),
      Text(label, style: const TextStyle(fontSize: 10, color: _C.textSecondary)),
    ]);
  }

  // ─── Section Header ────────────────────────────────────────────
  Widget _sectionHeader(String title, IconData icon, Color color, int count) {
    return Row(children: [
      Icon(icon, size: 18, color: color),
      const SizedBox(width: 8),
      Text(title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: _C.textPrimary)),
      const SizedBox(width: 8),
      Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
        decoration: BoxDecoration(color: color.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
        child: Text('$count', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: color)),
      ),
    ]);
  }

  Widget _emptyState(String text) {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        color: _C.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: _C.border),
      ),
      child: Center(child: Text(text, style: const TextStyle(color: _C.textSecondary))),
    );
  }

  // ─── Pending Card ──────────────────────────────────────────────
  Widget _buildPendingCard(PaymentReminder r) {
    final overdue = _isOverdue(r.dueDate);

    return GestureDetector(
      onTap: () => _showEditModal(context, r),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: _C.surface,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: overdue ? _C.destructive.withOpacity(0.5) : _C.border),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header row
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(r.description,
                          style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: _C.textPrimary)),
                      const SizedBox(height: 2),
                      Text(r.vendorName, style: const TextStyle(fontSize: 12, color: _C.textSecondary)),
                    ],
                  ),
                ),
                _paymentMethodBadge(r.paymentMethod),
              ],
            ),
            const SizedBox(height: 12),
            // Amount + Due date
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(_currencyFormat.format(r.amount),
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: _C.textPrimary)),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    const Text('Vencimento', style: TextStyle(fontSize: 10, color: _C.textSecondary)),
                    Text(
                      '${_formatDate(r.dueDate)}${overdue ? ' (Atrasado)' : ''}',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: overdue ? _C.destructive : _C.textPrimary,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            // Notes
            if (r.notes != null && r.notes!.isNotEmpty) ...[
              const SizedBox(height: 8),
              Text('"${r.notes}"',
                  style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic, color: _C.textSecondary.withOpacity(0.8))),
            ],
            const SizedBox(height: 14),
            // Action buttons
            Row(children: [
              Expanded(
                child: SizedBox(
                  height: 40,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _C.success,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                    onPressed: () => _markAsPaid(r.id),
                    icon: const Icon(Icons.check_circle_rounded, size: 16, color: Colors.white),
                    label: const Text('Marcar Pago', style: TextStyle(fontSize: 13, color: Colors.white)),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              _actionIconButton(Icons.edit_rounded, _C.primary, () => _showEditModal(context, r)),
              const SizedBox(width: 6),
              _actionIconButton(Icons.delete_rounded, _C.destructive, () => _confirmDelete(r.id)),
            ]),
          ],
        ),
      ),
    );
  }

  // ─── Paid Card ─────────────────────────────────────────────────
  Widget _buildPaidCard(PaymentReminder r) {
    return Opacity(
      opacity: 0.7,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: _C.surface,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: _C.border),
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(children: [
                    Text(r.description,
                        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: _C.textPrimary)),
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: _C.success.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Text('Pago', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: _C.success)),
                    ),
                  ]),
                  const SizedBox(height: 2),
                  Text(r.vendorName, style: const TextStyle(fontSize: 12, color: _C.textSecondary)),
                ],
              ),
            ),
            Text(_currencyFormat.format(r.amount),
                style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: _C.textPrimary)),
            const SizedBox(width: 8),
            _actionIconButton(Icons.delete_rounded, _C.textSecondary, () => _confirmDelete(r.id)),
          ],
        ),
      ),
    );
  }

  // ─── Shared Widgets ────────────────────────────────────────────
  Widget _paymentMethodBadge(String method) {
    final isPix = method == 'pix';
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: (isPix ? _C.primary : _C.warning).withOpacity(0.12),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: (isPix ? _C.primary : _C.warning).withOpacity(0.3)),
      ),
      child: Row(mainAxisSize: MainAxisSize.min, children: [
        Icon(isPix ? Icons.qr_code_rounded : Icons.money_rounded,
            size: 14, color: isPix ? _C.primary : _C.warning),
        const SizedBox(width: 4),
        Text(isPix ? 'PIX' : 'Dinheiro',
            style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: isPix ? _C.primary : _C.warning)),
      ]),
    );
  }

  Widget _actionIconButton(IconData icon, Color color, VoidCallback onTap) {
    return Material(
      color: color.withOpacity(0.1),
      borderRadius: BorderRadius.circular(10),
      child: InkWell(
        borderRadius: BorderRadius.circular(10),
        onTap: onTap,
        child: SizedBox(width: 40, height: 40, child: Icon(icon, size: 18, color: color)),
      ),
    );
  }

  void _confirmDelete(String id) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: _C.surface,
        title: const Text('Excluir lembrete?', style: TextStyle(color: _C.textPrimary)),
        content: const Text('Esta ação não pode ser desfeita.', style: TextStyle(color: _C.textSecondary)),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Cancelar')),
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              _deleteReminder(id);
            },
            child: const Text('Excluir', style: TextStyle(color: _C.destructive)),
          ),
        ],
      ),
    );
  }

  // ─── Add Modal ─────────────────────────────────────────────────
  void _showAddModal(BuildContext context) {
    String description = '';
    String vendorName = '';
    String amount = '';
    String dueDate = '';
    String paymentMethod = 'pix';
    String notes = '';

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
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(
                    color: _C.textSecondary.withOpacity(0.3), borderRadius: BorderRadius.circular(2)))),
                  const SizedBox(height: 20),
                  const Text('Novo Lembrete de Pagamento',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: _C.textPrimary)),
                  const SizedBox(height: 20),
                  _modalTextField('O que comprou?', 'Ex: Bolo de aniversário', (v) => description = v),
                  const SizedBox(height: 12),
                  _modalTextField('Nome do vendedor', 'Ex: Maria Doces', (v) => vendorName = v),
                  const SizedBox(height: 12),
                  _modalTextField('Valor (R\$)', '0,00', (v) => amount = v, isNumber: true),
                  const SizedBox(height: 12),
                  // Due date
                  GestureDetector(
                    onTap: () async {
                      final picked = await showDatePicker(
                        context: ctx,
                        initialDate: DateTime.now().add(const Duration(days: 7)),
                        firstDate: DateTime.now(),
                        lastDate: DateTime.now().add(const Duration(days: 365)),
                        builder: (c, child) => Theme(
                          data: ThemeData.dark().copyWith(colorScheme: const ColorScheme.dark(primary: _C.primary)),
                          child: child!,
                        ),
                      );
                      if (picked != null) {
                        setModalState(() => dueDate = picked.toIso8601String().split('T')[0]);
                      }
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 16),
                      decoration: BoxDecoration(
                        color: _C.surfaceLight,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: _C.border),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            dueDate.isEmpty ? 'Data do pagamento' : _formatDate(dueDate),
                            style: TextStyle(fontSize: 14, color: dueDate.isEmpty ? _C.textSecondary : _C.textPrimary),
                          ),
                          const Icon(Icons.calendar_today_rounded, size: 18, color: _C.textSecondary),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  // Payment method toggle
                  const Text('Forma de pagamento', style: TextStyle(fontSize: 13, color: _C.textSecondary)),
                  const SizedBox(height: 8),
                  Row(children: [
                    _paymentToggle('PIX', Icons.qr_code_rounded, 'pix', paymentMethod, (v) {
                      setModalState(() => paymentMethod = v);
                    }),
                    const SizedBox(width: 10),
                    _paymentToggle('Dinheiro', Icons.money_rounded, 'dinheiro', paymentMethod, (v) {
                      setModalState(() => paymentMethod = v);
                    }),
                  ]),
                  const SizedBox(height: 12),
                  _modalTextField('Observações (opcional)', 'Alguma anotação...', (v) => notes = v),
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
                        if (description.isEmpty || vendorName.isEmpty || amount.isEmpty || dueDate.isEmpty) return;
                        _addReminder(PaymentReminder(
                          id: DateTime.now().millisecondsSinceEpoch.toString(),
                          description: description,
                          vendorName: vendorName,
                          amount: double.tryParse(amount.replaceAll(',', '.')) ?? 0,
                          purchaseDate: DateTime.now().toIso8601String().split('T')[0],
                          dueDate: dueDate,
                          paymentMethod: paymentMethod,
                          notes: notes.isEmpty ? null : notes,
                        ));
                        Navigator.pop(ctx);
                      },
                      child: const Text('Adicionar', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: Colors.white)),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  // ─── Edit Modal ────────────────────────────────────────────────
  void _showEditModal(BuildContext context, PaymentReminder reminder) {
    String description = reminder.description;
    String vendorName = reminder.vendorName;
    String amount = reminder.amount.toString();
    String dueDate = reminder.dueDate;
    String paymentMethod = reminder.paymentMethod;
    String notes = reminder.notes ?? '';

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
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(
                    color: _C.textSecondary.withOpacity(0.3), borderRadius: BorderRadius.circular(2)))),
                  const SizedBox(height: 20),
                  const Text('Editar Lembrete',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: _C.textPrimary)),
                  const SizedBox(height: 20),
                  _modalTextField('O que comprou?', '', (v) => description = v, initial: description),
                  const SizedBox(height: 12),
                  _modalTextField('Nome do vendedor', '', (v) => vendorName = v, initial: vendorName),
                  const SizedBox(height: 12),
                  _modalTextField('Valor (R\$)', '', (v) => amount = v, isNumber: true, initial: amount),
                  const SizedBox(height: 12),
                  GestureDetector(
                    onTap: () async {
                      final picked = await showDatePicker(
                        context: ctx,
                        initialDate: DateTime.tryParse(dueDate) ?? DateTime.now(),
                        firstDate: DateTime(2020),
                        lastDate: DateTime.now().add(const Duration(days: 365)),
                        builder: (c, child) => Theme(
                          data: ThemeData.dark().copyWith(colorScheme: const ColorScheme.dark(primary: _C.primary)),
                          child: child!,
                        ),
                      );
                      if (picked != null) {
                        setModalState(() => dueDate = picked.toIso8601String().split('T')[0]);
                      }
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 16),
                      decoration: BoxDecoration(
                        color: _C.surfaceLight,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: _C.border),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(_formatDate(dueDate), style: const TextStyle(fontSize: 14, color: _C.textPrimary)),
                          const Icon(Icons.calendar_today_rounded, size: 18, color: _C.textSecondary),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text('Forma de pagamento', style: TextStyle(fontSize: 13, color: _C.textSecondary)),
                  const SizedBox(height: 8),
                  Row(children: [
                    _paymentToggle('PIX', Icons.qr_code_rounded, 'pix', paymentMethod, (v) {
                      setModalState(() => paymentMethod = v);
                    }),
                    const SizedBox(width: 10),
                    _paymentToggle('Dinheiro', Icons.money_rounded, 'dinheiro', paymentMethod, (v) {
                      setModalState(() => paymentMethod = v);
                    }),
                  ]),
                  const SizedBox(height: 12),
                  _modalTextField('Observações (opcional)', '', (v) => notes = v, initial: notes),
                  const SizedBox(height: 24),
                  Row(children: [
                    Expanded(
                      child: SizedBox(
                        height: 50,
                        child: OutlinedButton(
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(color: _C.border),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                          ),
                          onPressed: () => Navigator.pop(ctx),
                          child: const Text('Cancelar', style: TextStyle(color: _C.textSecondary)),
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
                            if (description.isEmpty || vendorName.isEmpty || amount.isEmpty || dueDate.isEmpty) return;
                            _updateReminder(reminder.copyWith(
                              description: description,
                              vendorName: vendorName,
                              amount: double.tryParse(amount.replaceAll(',', '.')) ?? reminder.amount,
                              dueDate: dueDate,
                              paymentMethod: paymentMethod,
                              notes: notes.isEmpty ? null : notes,
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
            ),
          );
        },
      ),
    );
  }

  // ─── Helpers ───────────────────────────────────────────────────
  Widget _paymentToggle(String label, IconData icon, String value, String current, ValueChanged<String> onSelect) {
    final selected = current == value;
    return Expanded(
      child: GestureDetector(
        onTap: () => onSelect(value),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: selected ? _C.primary.withOpacity(0.15) : _C.surfaceLight,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: selected ? _C.primary : _C.border),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 18, color: selected ? _C.primary : _C.textSecondary),
              const SizedBox(width: 6),
              Text(label, style: TextStyle(
                fontSize: 13,
                fontWeight: selected ? FontWeight.w600 : FontWeight.normal,
                color: selected ? _C.primary : _C.textSecondary,
              )),
            ],
          ),
        ),
      ),
    );
  }

  Widget _modalTextField(String label, String hint, ValueChanged<String> onChanged,
      {bool isNumber = false, String? initial}) {
    return TextFormField(
      initialValue: initial,
      style: const TextStyle(color: _C.textPrimary, fontSize: 14),
      keyboardType: isNumber ? const TextInputType.numberWithOptions(decimal: true) : TextInputType.text,
      decoration: InputDecoration(
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
      ),
      onChanged: onChanged,
    );
  }
}
