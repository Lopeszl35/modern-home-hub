import { CreditCard } from "@/types/finance";
import { cn } from "@/lib/utils";
import { CreditCard as CreditCardIcon, ChevronRight } from "lucide-react";

interface CreditCardItemProps {
  card: CreditCard;
  isSelected: boolean;
  onClick: () => void;
}

const brandLogos: Record<string, string> = {
  visa: "VISA",
  mastercard: "MC",
  elo: "ELO",
  amex: "AMEX",
  other: "CARD",
};

export function CreditCardItem({ card, isSelected, onClick }: CreditCardItemProps) {
  const usagePercent = (card.usedLimit / card.limit) * 100;

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer rounded-2xl p-4 transition-all duration-300 overflow-hidden active:scale-[0.98]",
        isSelected ? "ring-2 ring-primary shadow-glow" : "shadow-card"
      )}
      style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)` }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-2 border-white/30" />
        <div className="absolute top-8 right-8 w-16 h-16 rounded-full border-2 border-white/20" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCardIcon className="h-6 w-6 text-white/80" />
            <span className="text-white font-semibold">{card.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/90 font-bold text-sm tracking-wider">
              {brandLogos[card.brand]}
            </span>
            {!isSelected && <ChevronRight className="h-5 w-5 text-white/60" />}
          </div>
        </div>

        {/* Card Number */}
        <p className="text-white font-mono text-base tracking-widest mb-4">
          •••• •••• •••• {card.lastDigits}
        </p>

        {/* Limit Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-white/80">
            <span>Limite usado</span>
            <span>{usagePercent.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                usagePercent > 80 ? "bg-red-400" : usagePercent > 50 ? "bg-yellow-400" : "bg-green-400"
              )}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-white">
            <span className="font-semibold">{formatCurrency(card.usedLimit)}</span>
            <span className="text-white/70">{formatCurrency(card.limit)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
