import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'text' | 'fade'>('logo');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('text'), 600);
    const timer2 = setTimeout(() => setPhase('fade'), 1800);
    const timer3 = setTimeout(() => onFinish(), 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        phase === 'fade' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      {/* Logo container */}
      <div
        className={`relative transition-all duration-700 ease-out ${
          phase === 'logo'
            ? 'scale-0 opacity-0'
            : 'scale-100 opacity-100'
        }`}
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 w-24 h-24 rounded-2xl gradient-primary blur-xl opacity-50 animate-pulse-glow" />
          
          {/* Logo */}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl gradient-primary shadow-glow">
            <Wallet className="h-12 w-12 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* App name */}
      <div
        className={`mt-8 text-center transition-all duration-500 delay-300 ${
          phase === 'text' || phase === 'fade'
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0'
        }`}
      >
        <h1 className="text-4xl font-bold text-foreground tracking-tight">
          Finance<span className="text-gradient">App</span>
        </h1>
        <p className="mt-2 text-muted-foreground text-sm">
          Gestão Inteligente de Finanças
        </p>
      </div>

      {/* Loading indicator */}
      <div
        className={`mt-12 transition-all duration-500 delay-500 ${
          phase === 'text' || phase === 'fade'
            ? 'opacity-100'
            : 'opacity-0'
        }`}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-primary animate-pulse"
              style={{
                animationDelay: `${i * 200}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
