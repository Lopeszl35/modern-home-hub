// Credit Card Types
export interface CreditCard {
  id: string;
  name: string;
  lastDigits: string;
  brand: "visa" | "mastercard" | "elo" | "amex" | "other";
  limit: number;
  usedLimit: number;
  dueDay: number;
  closingDay: number;
  color: string;
}

export interface CardExpense {
  id: string;
  cardId: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  currentInstallment?: number;
  totalInstallments?: number;
  isInstallment: boolean;
}

// Fixed Expenses Types
export interface FixedExpense {
  id: string;
  name: string;
  category: "utilities" | "subscriptions" | "health" | "education" | "housing" | "other";
  amount: number;
  dueDay: number;
  isActive: boolean;
  icon?: string;
}

// Financing Types
export interface Financing {
  id: string;
  name: string;
  type: "vehicle" | "property" | "personal" | "other";
  totalAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
  interestRate: number;
  totalInstallments: number;
  paidInstallments: number;
  startDate: string;
  bank: string;
}

export interface AmortizationResult {
  extraPayment: number;
  monthsReduced: number;
  interestSaved: number;
  newEndDate: string;
}
