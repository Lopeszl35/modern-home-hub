import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, CheckCircle, Trash2, Edit, Banknote, QrCode } from "lucide-react";
import { PaymentReminder } from "@/types/payment-reminder";
import { AddPaymentReminderModal } from "@/components/payment-reminders/AddPaymentReminderModal";
import { EditPaymentReminderModal } from "@/components/payment-reminders/EditPaymentReminderModal";
import { format, parseISO, isAfter, isBefore, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

const PaymentReminders = () => {
  const { toast } = useToast();
  const [reminders, setReminders] = useState<PaymentReminder[]>([
    {
      id: "1",
      description: "Bolo de aniversário",
      vendorName: "Maria Doces",
      amount: 150,
      purchaseDate: "2024-01-10",
      dueDate: "2024-01-15",
      paymentMethod: "pix",
      status: "pending",
    },
    {
      id: "2",
      description: "Marmitas da semana",
      vendorName: "Restaurante da Vó",
      amount: 200,
      purchaseDate: "2024-01-08",
      dueDate: "2024-01-12",
      paymentMethod: "dinheiro",
      status: "paid",
      paidAt: "2024-01-12",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState<PaymentReminder | null>(null);

  const handleAddReminder = (reminder: Omit<PaymentReminder, "id">) => {
    const newReminder: PaymentReminder = {
      ...reminder,
      id: Date.now().toString(),
    };
    setReminders([...reminders, newReminder]);
    toast({ title: "Lembrete adicionado!", description: "O lembrete de pagamento foi criado." });
  };

  const handleUpdateReminder = (updated: PaymentReminder) => {
    setReminders(reminders.map((r) => (r.id === updated.id ? updated : r)));
    toast({ title: "Lembrete atualizado!", description: "As alterações foram salvas." });
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
    toast({ title: "Lembrete removido!", description: "O lembrete foi excluído." });
  };

  const handleMarkAsPaid = (id: string) => {
    setReminders(
      reminders.map((r) =>
        r.id === id ? { ...r, status: "paid" as const, paidAt: new Date().toISOString() } : r
      )
    );
    toast({ title: "Pagamento confirmado!", description: "O lembrete foi marcado como pago." });
  };

  const pendingReminders = reminders.filter((r) => r.status === "pending");
  const paidReminders = reminders.filter((r) => r.status === "paid");
  const totalPending = pendingReminders.reduce((sum, r) => sum + r.amount, 0);

  const isOverdue = (dueDate: string) => {
    return isBefore(parseISO(dueDate), startOfDay(new Date()));
  };

  return (
    <DashboardLayout title="Lembretes de Pagamento">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Lembretes de Pagamento</h1>
            <p className="text-muted-foreground">Gerencie pagamentos pendentes com vendedores</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Lembrete
          </Button>
        </div>

        {/* Summary Card */}
        <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pendente</p>
                <p className="text-3xl font-bold text-foreground">
                  R$ {totalPending.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-500">{pendingReminders.length}</p>
                  <p className="text-xs text-muted-foreground">Pendentes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">{paidReminders.length}</p>
                  <p className="text-xs text-muted-foreground">Pagos</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Reminders */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Pagamentos Pendentes
          </h2>
          {pendingReminders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Nenhum pagamento pendente</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {pendingReminders.map((reminder) => (
                <Card
                  key={reminder.id}
                  className={`transition-all hover:shadow-md ${
                    isOverdue(reminder.dueDate) ? "border-red-500/50 bg-red-500/5" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{reminder.description}</h3>
                        <p className="text-sm text-muted-foreground">{reminder.vendorName}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {reminder.paymentMethod === "pix" ? (
                          <Badge variant="outline" className="gap-1">
                            <QrCode className="h-3 w-3" /> PIX
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1">
                            <Banknote className="h-3 w-3" /> Dinheiro
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xl font-bold text-foreground">
                        R$ {reminder.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Vencimento</p>
                        <p
                          className={`text-sm font-medium ${
                            isOverdue(reminder.dueDate) ? "text-red-500" : "text-foreground"
                          }`}
                        >
                          {format(parseISO(reminder.dueDate), "dd/MM/yyyy", { locale: ptBR })}
                          {isOverdue(reminder.dueDate) && " (Atrasado)"}
                        </p>
                      </div>
                    </div>

                    {reminder.notes && (
                      <p className="text-sm text-muted-foreground mb-3 italic">"{reminder.notes}"</p>
                    )}

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 gap-1"
                        onClick={() => handleMarkAsPaid(reminder.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Marcar Pago
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingReminder(reminder)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteReminder(reminder.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Paid Reminders */}
        {paidReminders.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Pagamentos Realizados
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {paidReminders.map((reminder) => (
                <Card key={reminder.id} className="opacity-75">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{reminder.description}</h3>
                        <p className="text-sm text-muted-foreground">{reminder.vendorName}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                        Pago
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-foreground">
                        R$ {reminder.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteReminder(reminder.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <AddPaymentReminderModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onAdd={handleAddReminder}
      />

      {editingReminder && (
        <EditPaymentReminderModal
          open={!!editingReminder}
          onOpenChange={(open) => !open && setEditingReminder(null)}
          reminder={editingReminder}
          onUpdate={handleUpdateReminder}
        />
      )}
    </DashboardLayout>
  );
};

export default PaymentReminders;
