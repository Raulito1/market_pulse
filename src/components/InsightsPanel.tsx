import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Zap, ShieldAlert, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';

export interface Insight {
  id: string;
  title: string;
  description: string;
}

interface InsightsPanelProps {
  insights: Insight[];
  loading: boolean;
  onDismiss: (id: string) => void;
}

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights, loading, onDismiss }) => {
  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle className="text-sm font-mono font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          AI MARKET INSIGHTS
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="space-y-2 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-12 bg-muted rounded" />
            </div>
          ))
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {insights.map((insight, i) => (
                <motion.div 
                  key={insight.id}
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95, height: 0, marginBottom: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    opacity: { duration: 0.2 }
                  }}
                  className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors group relative overflow-hidden"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onDismiss(insight.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>

                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {i % 2 === 0 ? <Zap className="w-4 h-4 text-yellow-500" /> : <ShieldAlert className="w-4 h-4 text-blue-500" />}
                    </div>
                    <div className="pr-6">
                      <h4 className="text-sm font-mono font-bold group-hover:text-primary transition-colors">{insight.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {insights.length === 0 && !loading && (
              <div className="text-center py-8 text-xs text-muted-foreground font-mono">
                No active insights. Select a symbol to generate new analysis.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
