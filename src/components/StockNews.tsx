import React, { useState } from 'react';
import { Newspaper, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsItem } from '@/src/services/newsData';
import { cn } from '@/lib/utils';

interface StockNewsProps {
  news: NewsItem[];
  symbol: string;
}

export const StockNews: React.FC<StockNewsProps> = ({ news, symbol }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4 border-t border-border pt-4">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full group"
      >
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider">
            {symbol} News Feed
          </span>
          <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-mono">
            {news.length}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">
              {news.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col gap-1 p-3 rounded-md bg-muted/20 border border-border/50 hover:border-primary/30 transition-colors group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        item.sentiment === 'positive' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" :
                        item.sentiment === 'negative' ? "bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                        "bg-muted-foreground"
                      )} />
                      <span className="text-[10px] font-mono text-primary uppercase tracking-tighter">
                        {item.source}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {item.time}
                    </span>
                  </div>
                  <h5 className="text-xs font-medium leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </h5>
                  <div className="flex items-center justify-between mt-1">
                    <div className={cn(
                      "text-[9px] font-mono px-1.5 py-0.5 rounded-full uppercase",
                      item.sentiment === 'positive' ? "bg-emerald-500/10 text-emerald-500" :
                      item.sentiment === 'negative' ? "bg-destructive/10 text-destructive" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {item.sentiment}
                    </div>
                    <a 
                      href={item.url} 
                      className="text-[10px] text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                    >
                      Read More <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
