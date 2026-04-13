import React from 'react';
import { motion } from 'motion/react';
import { EmergingSignal } from '../services/clientData';

interface EmergingSignalsProps {
  signals: EmergingSignal[];
}

export const EmergingSignals: React.FC<EmergingSignalsProps> = ({ signals }) => {
  return (
    <section className="space-y-6">
      {/* Header — large, prominent, purple */}
      <h2 className="text-3xl font-bold tracking-tight text-primary">Emerging Signals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {signals.map((signal, i) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card p-5 space-y-4 hover:border-primary/40 transition-colors"
          >
            {/* Top row: NEW badge + score */}
            <div className="flex items-center justify-between">
              {signal.isNew && (
                <span className="text-[9px] font-mono font-bold tracking-widest text-amber-900 bg-amber-400 px-2 py-0.5 rounded">
                  NEW
                </span>
              )}
              <span className="text-3xl font-mono font-bold text-amber-400 ml-auto">{signal.score}</span>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold leading-snug">{signal.title}</h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">{signal.description}</p>

            {/* First seen */}
            <p className="text-[10px] font-mono text-muted-foreground/60">
              First seen: {signal.firstSeen}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
