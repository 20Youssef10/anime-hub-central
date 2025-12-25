import { cn } from '@/lib/utils';

interface StatItem {
  label: string;
  value: string | number;
  color?: string;
}

interface StatsCardProps {
  stats: StatItem[];
  className?: string;
}

export function StatsCard({ stats, className }: StatsCardProps) {
  return (
    <div className={cn("glass-card rounded-xl p-5", className)}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className={cn(
              "text-2xl font-bold",
              stat.color || "text-primary"
            )}>
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ScoreDistributionProps {
  distribution: { score: number; amount: number }[];
  className?: string;
}

export function ScoreDistribution({ distribution, className }: ScoreDistributionProps) {
  const maxAmount = Math.max(...distribution.map(d => d.amount));
  
  return (
    <div className={cn("glass-card rounded-xl p-5", className)}>
      <h3 className="font-semibold mb-4">Score Distribution</h3>
      <div className="space-y-2">
        {distribution.reverse().map((item) => (
          <div key={item.score} className="flex items-center gap-3">
            <span className="w-6 text-sm text-muted-foreground">{item.score}</span>
            <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: `${(item.amount / maxAmount) * 100}%` }}
              />
            </div>
            <span className="w-16 text-sm text-muted-foreground text-right">
              {item.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface StatusDistributionProps {
  distribution: { status: string; amount: number; color: string }[];
  className?: string;
}

export function StatusDistribution({ distribution, className }: StatusDistributionProps) {
  const total = distribution.reduce((sum, d) => sum + d.amount, 0);
  
  return (
    <div className={cn("glass-card rounded-xl p-5", className)}>
      <h3 className="font-semibold mb-4">Status Distribution</h3>
      
      {/* Bar */}
      <div className="h-4 rounded-full overflow-hidden flex mb-4">
        {distribution.map((item, i) => (
          <div
            key={i}
            className="h-full transition-all duration-500"
            style={{ 
              width: `${(item.amount / total) * 100}%`,
              backgroundColor: item.color
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {distribution.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground">{item.status}</span>
            <span className="text-sm font-medium ml-auto">{item.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
