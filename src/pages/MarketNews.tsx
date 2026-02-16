import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketQuote, MarketNews as MarketNewsType } from "@/types/investment";
import {
  TrendingUp, TrendingDown, Newspaper, BarChart3, Globe,
  Bitcoin, DollarSign, Building2, Cpu, ExternalLink
} from "lucide-react";

const mockQuotes: MarketQuote[] = [
  { symbol: "IBOV", name: "Ibovespa", price: 132450, change: 1250, changePercent: 0.95, type: "index" },
  { symbol: "S&P500", name: "S&P 500", price: 6120, change: -15, changePercent: -0.24, type: "index" },
  { symbol: "USD/BRL", name: "Dólar", price: 5.87, change: -0.03, changePercent: -0.51, type: "currency" },
  { symbol: "EUR/BRL", name: "Euro", price: 6.35, change: 0.02, changePercent: 0.32, type: "currency" },
  { symbol: "BTC", name: "Bitcoin", price: 485200, change: 12300, changePercent: 2.6, type: "crypto" },
  { symbol: "ETH", name: "Ethereum", price: 18450, change: -320, changePercent: -1.7, type: "crypto" },
  { symbol: "PETR4", name: "Petrobras", price: 38.75, change: 0.65, changePercent: 1.7, type: "stock" },
  { symbol: "VALE3", name: "Vale", price: 62.30, change: -0.90, changePercent: -1.42, type: "stock" },
  { symbol: "ITUB4", name: "Itaú Unibanco", price: 34.20, change: 0.45, changePercent: 1.33, type: "stock" },
  { symbol: "WEGE3", name: "WEG", price: 52.80, change: 1.10, changePercent: 2.13, type: "stock" },
];

const mockNews: MarketNewsType[] = [
  {
    id: "1", title: "Ibovespa fecha em alta com otimismo sobre corte na Selic",
    summary: "O principal índice da bolsa brasileira encerrou o pregão com ganhos expressivos, impulsionado pela expectativa de redução da taxa básica de juros na próxima reunião do Copom.",
    source: "InfoMoney", publishedAt: "2026-02-16T14:30:00", category: "acoes",
  },
  {
    id: "2", title: "Bitcoin supera US$ 100 mil e renova máxima histórica",
    summary: "A principal criptomoeda do mundo atingiu novo recorde com a aprovação de ETFs de Bitcoin à vista nos principais mercados globais e aumento da adoção institucional.",
    source: "CoinDesk", publishedAt: "2026-02-16T12:15:00", category: "cripto",
  },
  {
    id: "3", title: "Fed mantém juros e sinaliza possível corte no segundo semestre",
    summary: "O Federal Reserve decidiu manter a taxa de juros inalterada, mas indicou que há espaço para flexibilização monetária no segundo semestre de 2026.",
    source: "Bloomberg", publishedAt: "2026-02-16T10:00:00", category: "economia",
  },
  {
    id: "4", title: "Apple anuncia novo chip M5 com foco em inteligência artificial",
    summary: "A gigante de tecnologia revelou sua nova geração de processadores com capacidades avançadas de IA, prometendo revolucionar o mercado de computação pessoal.",
    source: "TechCrunch", publishedAt: "2026-02-15T18:45:00", category: "tecnologia",
  },
  {
    id: "5", title: "Dólar recua e fecha abaixo de R$ 5,90 com entrada de capital estrangeiro",
    summary: "A moeda americana perdeu força frente ao real após fluxo positivo de investimentos estrangeiros na bolsa brasileira e dados favoráveis da balança comercial.",
    source: "Valor Econômico", publishedAt: "2026-02-15T17:00:00", category: "economia",
  },
  {
    id: "6", title: "Petrobras anuncia dividendos extraordinários acima do esperado",
    summary: "A estatal divulgou política de dividendos mais agressiva, surpreendendo o mercado e elevando suas ações em mais de 3% no pregão.",
    source: "Exame", publishedAt: "2026-02-15T15:30:00", category: "acoes",
  },
  {
    id: "7", title: "Ethereum 3.0 é lançado com promessa de escalabilidade sem precedentes",
    summary: "A atualização mais esperada da rede Ethereum promete transações quase instantâneas e taxas próximas de zero, atraindo desenvolvedores de todo o mundo.",
    source: "Decrypt", publishedAt: "2026-02-14T20:00:00", category: "cripto",
  },
  {
    id: "8", title: "Banco Central eleva projeção de crescimento do PIB para 2026",
    summary: "O Relatório Focus revelou revisão para cima na expectativa de crescimento econômico do Brasil, refletindo melhora nos indicadores de consumo e investimento.",
    source: "G1 Economia", publishedAt: "2026-02-14T09:00:00", category: "economia",
  },
];

const categoryConfig = {
  acoes: { label: "Ações", icon: BarChart3, color: "text-primary" },
  cripto: { label: "Cripto", icon: Bitcoin, color: "text-warning" },
  economia: { label: "Economia", icon: DollarSign, color: "text-blue-400" },
  tecnologia: { label: "Tech", icon: Cpu, color: "text-purple-400" },
  global: { label: "Global", icon: Globe, color: "text-muted-foreground" },
};

type NewsFilter = "all" | MarketNewsType["category"];

export default function MarketNews() {
  const [newsFilter, setNewsFilter] = useState<NewsFilter>("all");

  const filteredNews = newsFilter === "all"
    ? mockNews
    : mockNews.filter((n) => n.category === newsFilter);

  const formatCurrency = (value: number, symbol?: string) => {
    if (symbol?.includes("/")) return `R$ ${value.toFixed(2)}`;
    if (value >= 1000) return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    return `R$ ${value.toFixed(2)}`;
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffH = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffH < 1) return "Agora";
    if (diffH < 24) return `${diffH}h atrás`;
    const diffD = Math.floor(diffH / 24);
    return `${diffD}d atrás`;
  };

  const QuoteCard = ({ quote }: { quote: MarketQuote }) => {
    const isUp = quote.change >= 0;
    return (
      <div className="flex-shrink-0 w-[140px] p-3 rounded-2xl bg-card border border-border/50 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold font-mono">{quote.symbol}</span>
          {isUp ? <TrendingUp className="h-3 w-3 text-success" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
        </div>
        <p className="text-[10px] text-muted-foreground truncate">{quote.name}</p>
        <p className="text-sm font-bold">{formatCurrency(quote.price, quote.symbol)}</p>
        <p className={`text-[10px] font-semibold ${isUp ? "text-success" : "text-destructive"}`}>
          {isUp ? "+" : ""}{quote.changePercent.toFixed(2)}%
        </p>
      </div>
    );
  };

  return (
    <DashboardLayout title="Mercado" subtitle="Notícias e cotações">
      <div className="space-y-5 pb-24">
        <Tabs defaultValue="news">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="news" className="gap-2">
              <Newspaper className="h-4 w-4" />
              Notícias
            </TabsTrigger>
            <TabsTrigger value="quotes" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Cotações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-4 mt-4">
            {/* Ticker strip */}
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
              {mockQuotes.slice(0, 5).map((q) => (
                <QuoteCard key={q.symbol} quote={q} />
              ))}
            </div>

            {/* News filter */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              <Badge variant={newsFilter === "all" ? "default" : "secondary"} className="cursor-pointer flex-shrink-0" onClick={() => setNewsFilter("all")}>
                Todas
              </Badge>
              {Object.entries(categoryConfig).map(([key, config]) => (
                <Badge
                  key={key}
                  variant={newsFilter === key ? "default" : "secondary"}
                  className="cursor-pointer flex-shrink-0"
                  onClick={() => setNewsFilter(key as NewsFilter)}
                >
                  <config.icon className="h-3 w-3 mr-1" />
                  {config.label}
                </Badge>
              ))}
            </div>

            {/* News List */}
            <div className="space-y-3">
              {filteredNews.map((news, index) => {
                const cat = categoryConfig[news.category];
                return (
                  <Card key={news.id} variant="glass" className="animate-fade-in cursor-pointer hover:border-primary/30 transition-colors" style={{ animationDelay: `${index * 40}ms` }}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 p-2.5 rounded-xl bg-muted/50 ${cat.color}`}>
                          <cat.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">{cat.label}</Badge>
                            <span className="text-[10px] text-muted-foreground">{formatTime(news.publishedAt)}</span>
                          </div>
                          <h3 className="text-sm font-semibold leading-tight mb-1.5">{news.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{news.summary}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] text-muted-foreground">{news.source}</span>
                            <ExternalLink className="h-3 w-3 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="quotes" className="space-y-4 mt-4">
            {/* Indices */}
            <Card variant="glass">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  Índices
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {mockQuotes.filter((q) => q.type === "index").map((q) => (
                  <QuoteRow key={q.symbol} quote={q} formatCurrency={formatCurrency} />
                ))}
              </CardContent>
            </Card>

            {/* Currencies */}
            <Card variant="glass">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-blue-400" />
                  Câmbio
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {mockQuotes.filter((q) => q.type === "currency").map((q) => (
                  <QuoteRow key={q.symbol} quote={q} formatCurrency={formatCurrency} />
                ))}
              </CardContent>
            </Card>

            {/* Crypto */}
            <Card variant="glass">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Bitcoin className="h-4 w-4 text-warning" />
                  Criptomoedas
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {mockQuotes.filter((q) => q.type === "crypto").map((q) => (
                  <QuoteRow key={q.symbol} quote={q} formatCurrency={formatCurrency} />
                ))}
              </CardContent>
            </Card>

            {/* Stocks */}
            <Card variant="glass">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Ações
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {mockQuotes.filter((q) => q.type === "stock").map((q) => (
                  <QuoteRow key={q.symbol} quote={q} formatCurrency={formatCurrency} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function QuoteRow({ quote, formatCurrency }: { quote: MarketQuote; formatCurrency: (v: number, s?: string) => string }) {
  const isUp = quote.change >= 0;
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
      <div>
        <p className="text-sm font-bold font-mono">{quote.symbol}</p>
        <p className="text-[10px] text-muted-foreground">{quote.name}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">{formatCurrency(quote.price, quote.symbol)}</p>
        <p className={`text-[10px] font-semibold ${isUp ? "text-success" : "text-destructive"}`}>
          {isUp ? "▲" : "▼"} {isUp ? "+" : ""}{quote.changePercent.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
