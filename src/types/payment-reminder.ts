export interface PaymentReminder {
  id: string;
  description: string;
  vendorName: string;
  amount: number;
  purchaseDate: string;
  dueDate: string;
  paymentMethod: "pix" | "dinheiro";
  status: "pending" | "paid";
  notes?: string;
  paidAt?: string;
}
