export interface SurpriseExpense {
  id: string;
  description: string;
  category: "car" | "health" | "home" | "appliance" | "pet" | "other";
  amount: number;
  date: string;
  notes?: string;
}

export const surpriseExpenseCategories = {
  car: { label: "Veículo", icon: "Car" },
  health: { label: "Saúde", icon: "Heart" },
  home: { label: "Casa", icon: "Home" },
  appliance: { label: "Eletrodoméstico", icon: "Tv" },
  pet: { label: "Pet", icon: "PawPrint" },
  other: { label: "Outros", icon: "HelpCircle" },
} as const;
