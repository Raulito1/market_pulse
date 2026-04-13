import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { MarketTrend } from '@/src/services/marketData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { StockNews } from './StockNews';
import { getStockNews } from '@/src/services/newsData';

interface MainChartProps {
  trend: MarketTrend;
  allTrends: MarketTrend[];
  compareSymbols: string[];
  onToggleCompare: (symbol: string) => void;
}

export const MainChart: React.FC<MainChartProps> = ({ trend, allTrends, compareSymbols, onToggleCompare }) => {
  const compareTrends = allTrends.filter(t => compareSymbols.includes(t.symbol) && t.symbol !== trend.symbol);
  
  // Merge data for comparison
  const chartData = trend.history.map((point, index) => {
    const dataPoint: any = { ...point };
    compareTrends.forEach(ct => {
      if (ct.history[index]) {
        dataPoint[ct.symbol] = ct.history[index].price;
      }
    });
    return dataPoint;
  });

  const comparisonColors = ['#3b82f6', '#10b981', '#f59e0b'];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return '#10b981'; // Emerald-500
      case 'bearish': return '#ef4444'; // Red-500
      default: return '#8b5cf6'; // Violet-500 (Neutral)
    }
  };

  const primaryColor = getSentimentColor(trend.sentiment);

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm h-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-lg font-mono font-bold flex items-center gap-2">
            {trend.name} Performance
            {compareTrends.length > 0 && (
              <span className="text-xs font-normal text-muted-foreground">
                vs {compareTrends.map(t => t.symbol).join(', ')}
              </span>
            )}
          </CardTitle>
          <p className="text-xs text-muted-foreground font-mono">Real-time tracking • 1m intervals</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex flex-wrap gap-1 mr-2">
            {compareSymbols.map((symbol) => (
              <Badge key={symbol} variant="secondary" className="font-mono text-[10px] gap-1">
                {symbol}
                <X 
                  className="w-2 h-2 cursor-pointer hover:text-destructive" 
                  onClick={() => onToggleCompare(symbol)}
                />
              </Badge>
            ))}
          </div>

          <Popover>
            <PopoverTrigger render={<Button variant="outline" size="sm" className="h-8 text-xs font-mono gap-1" disabled={compareSymbols.length >= 2}>
                <Plus className="w-3 h-3" />
                Compare
              </Button>}>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2" align="end">
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-muted-foreground uppercase px-2 py-1">Select up to 2</p>
                {allTrends
                  .filter(t => t.symbol !== trend.symbol)
                  .map((t) => (
                    <Button
                      key={t.symbol}
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start font-mono text-xs ${compareSymbols.includes(t.symbol) ? 'bg-primary/10 text-primary' : ''}`}
                      onClick={() => onToggleCompare(t.symbol)}
                      disabled={!compareSymbols.includes(t.symbol) && compareSymbols.length >= 2}
                    >
                      {t.symbol} - {t.name}
                    </Button>
                  ))}
              </div>
            </PopoverContent>
          </Popover>

          <div className="text-right ml-4">
            <div className="text-2xl font-mono font-bold">${trend.price.toLocaleString()}</div>
            <div className={`text-xs font-mono ${trend.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {trend.change >= 0 ? '+' : ''}{trend.change.toFixed(2)} ({trend.changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
                </linearGradient>
                {compareTrends.map((ct, i) => {
                  const ctColor = getSentimentColor(ct.sentiment);
                  return (
                    <linearGradient key={ct.symbol} id={`color${ct.symbol}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={ctColor} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={ctColor} stopOpacity={0}/>
                    </linearGradient>
                  );
                })}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                fontFamily="JetBrains Mono"
              />
              <YAxis 
                stroke="var(--color-muted-foreground)" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                fontFamily="JetBrains Mono"
                domain={['auto', 'auto']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)', 
                  borderRadius: '8px', 
                  fontFamily: 'JetBrains Mono',
                  color: 'var(--color-foreground)'
                }}
                itemStyle={{ color: primaryColor }}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontFamily: 'JetBrains Mono', fontSize: '10px' }} />
              <Area 
                type="monotone" 
                dataKey="price" 
                name={trend.symbol}
                stroke={primaryColor} 
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                strokeWidth={3}
                animationDuration={1500}
              />
              {compareTrends.map((ct, i) => (
                <Area
                  key={ct.symbol}
                  type="monotone"
                  dataKey={ct.symbol}
                  name={ct.symbol}
                  stroke={getSentimentColor(ct.sentiment)}
                  fillOpacity={1}
                  fill={`url(#color${ct.symbol})`}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <StockNews news={getStockNews(trend.symbol)} symbol={trend.symbol} />
      </CardContent>
    </Card>
  );
};
