import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MarketTrend } from '@/src/services/marketData';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketCardProps {
  trend: MarketTrend;
  isSelected: boolean;
  onClick: () => void;
}

export const MarketCard: React.FC<MarketCardProps> = ({ trend, isSelected, onClick }) => {
  const isBullish = trend.sentiment === 'bullish';
  const isBearish = trend.sentiment === 'bearish';

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:border-primary/50 bg-card/50 backdrop-blur-sm",
        isSelected ? "border-primary ring-1 ring-primary/50" : "border-border"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col">
          <CardTitle className="text-sm font-mono font-bold tracking-wider">{trend.symbol}</CardTitle>
          <span className="text-[10px] text-muted-foreground uppercase">{trend.name}</span>
        </div>
        <Badge variant={isBullish ? "default" : isBearish ? "destructive" : "secondary"} className="font-mono text-[10px]">
          {isBullish && <TrendingUp className="w-3 h-3 mr-1" />}
          {isBearish && <TrendingDown className="w-3 h-3 mr-1" />}
          {!isBullish && !isBearish && <Minus className="w-3 h-3 mr-1" />}
          {trend.changePercent.toFixed(2)}%
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-mono font-bold tracking-tighter">
          ${trend.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
        <div className="h-[60px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend.history}>
              <defs>
                <linearGradient id={`gradient-${trend.symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isBullish ? "#10b981" : isBearish ? "#ef4444" : "#8b5cf6"} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={isBullish ? "#10b981" : isBearish ? "#ef4444" : "#8b5cf6"} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={isBullish ? "#10b981" : isBearish ? "#ef4444" : "#8b5cf6"} 
                fillOpacity={1} 
                fill={`url(#gradient-${trend.symbol})`} 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
