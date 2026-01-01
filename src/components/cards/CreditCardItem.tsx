import { CreditCard } from "@/types/finance";
import { cn } from "@/lib/utils";
import { CreditCard as CreditCardIcon } from "lucide-react";

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

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer rounded-2xl p-5 transition-all duration-300 overflow-hidden",
        "hover:scale-[1.02] hover:shadow-elevated",
        isSelected ? "ring-2 ring-primary shadow-glow" : "shadow-card"
      )}
      style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)` }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white/30" />
        <div className="absolute top-8 right-8 w-24 h-24 rounded-full border-2 border-white/20" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <CreditCardIcon className="h-8 w-8 text-white/80" />
          <span className="text-white/90 font-bold text-lg tracking-wider">
            {brandLogos[card.brand]}
          </span>
        </div>

        {/* Card Number */}
        <div className="mb-4">
          <p className="text-white/60 text-xs mb-1">Número do Cartão</p>
          <p className="text-white font-mono text-lg tracking-widest">
            •••• •••• •••• {card.lastDigits}
          </p>
        </div>

        {/* Card Name */}
        <p className="text-white font-semibold text-sm mb-4">{card.name}</p>

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
          <div className="flex justify-between text-xs text-white/70">
            <span>R$ {card.usedLimit.toLocaleString("pt-BR")}</span>
            <span>R$ {card.limit.toLocaleString("pt-BR")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
