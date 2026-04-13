import React, { useState } from 'react';
import { Activity, Search, Bell, User, Sun, Moon, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MarketTrend } from '@/src/services/marketData';
import { cn } from '@/lib/utils';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  marketData: MarketTrend[];
  onSelectSymbol: (symbol: string) => void;
  selectedSymbol: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  isDark, 
  onToggleTheme, 
  marketData, 
  onSelectSymbol,
  selectedSymbol 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredData = marketData.filter(item => 
    item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="border-b border-border bg-background/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Activity className="text-primary-foreground w-6 h-6" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-mono font-bold tracking-tighter">MARKET PULSE</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Live Terminal v2.4.0</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger render={
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search symbols (e.g. BTC, AAPL)..." 
                  className="pl-10 bg-muted/30 border-border focus-visible:ring-primary h-9 text-sm font-mono"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (!isOpen) setIsOpen(true);
                  }}
                  onFocus={() => setIsOpen(true)}
                />
              </div>
            }>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-1" align="start">
              <div className="max-h-[300px] overflow-y-auto">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <button
                      key={item.symbol}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-sm font-mono rounded-sm hover:bg-accent transition-colors",
                        selectedSymbol === item.symbol && "bg-accent"
                      )}
                      onClick={() => {
                        onSelectSymbol(item.symbol);
                        setIsOpen(false);
                        setSearchQuery('');
                      }}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-bold">{item.symbol}</span>
                        <span className="text-[10px] text-muted-foreground">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "text-xs",
                          item.changePercent >= 0 ? "text-emerald-500" : "text-destructive"
                        )}>
                          {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                        </span>
                        {selectedSymbol === item.symbol && <Check className="w-4 h-4 text-primary" />}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-4 text-center text-xs text-muted-foreground font-mono">
                    No symbols found for "{searchQuery}"
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2 md:gap-6 shrink-0">
          <nav className="hidden lg:flex items-center gap-4">
            {['Dashboard', 'Analytics', 'Signals'].map((item) => (
              <Button key={item} variant="ghost" className="text-xs font-mono text-muted-foreground hover:text-foreground">
                {item}
              </Button>
            ))}
          </nav>
          
          <Separator orientation="vertical" className="h-6 hidden md:block" />
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border relative overflow-hidden group">
              <motion.div
                animate={{ 
                  rotate: isDark ? 0 : 180,
                  scale: isDark ? 0.8 : 1.1,
                  opacity: isDark ? 0.5 : 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Sun className={cn("w-3.5 h-3.5 transition-colors", !isDark ? 'text-yellow-500' : 'text-muted-foreground')} />
              </motion.div>
              
              <Switch 
                checked={isDark} 
                onCheckedChange={onToggleTheme}
                className="scale-75 data-[state=checked]:bg-primary"
              />

              <motion.div
                animate={{ 
                  rotate: isDark ? 0 : -180,
                  scale: isDark ? 1.1 : 0.8,
                  opacity: isDark ? 1 : 0.5
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Moon className={cn("w-3.5 h-3.5 transition-colors", isDark ? 'text-primary' : 'text-muted-foreground')} />
              </motion.div>

              {/* Subtle background glow effect */}
              <motion.div 
                className="absolute inset-0 bg-primary/5 pointer-events-none"
                animate={{ opacity: isDark ? 1 : 0 }}
              />
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground md:hidden">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
