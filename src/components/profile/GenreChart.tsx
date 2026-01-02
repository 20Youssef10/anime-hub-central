import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { cn } from '@/lib/utils';

interface GenreData {
  name: string;
  value: number;
  color: string;
}

interface GenreChartProps {
  data: GenreData[];
  className?: string;
}

const GENRE_COLORS: Record<string, string> = {
  'Action': 'hsl(8, 85%, 68%)',
  'Adventure': 'hsl(24, 95%, 64%)',
  'Comedy': 'hsl(50, 85%, 60%)',
  'Drama': 'hsl(270, 60%, 60%)',
  'Fantasy': 'hsl(190, 90%, 50%)',
  'Horror': 'hsl(0, 70%, 50%)',
  'Mystery': 'hsl(230, 60%, 55%)',
  'Romance': 'hsl(340, 80%, 65%)',
  'Sci-Fi': 'hsl(160, 70%, 50%)',
  'Slice of Life': 'hsl(140, 60%, 55%)',
  'Sports': 'hsl(30, 80%, 55%)',
  'Supernatural': 'hsl(280, 70%, 60%)',
  'Thriller': 'hsl(0, 0%, 40%)',
  'Other': 'hsl(220, 20%, 50%)',
};

export function GenreChart({ data, className }: GenreChartProps) {
  const chartData = data.map(item => ({
    ...item,
    color: GENRE_COLORS[item.name] || GENRE_COLORS['Other'],
  }));

  return (
    <div className={cn("glass-card rounded-xl p-5", className)}>
      <h3 className="font-semibold mb-4">Favorite Genres</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="glass-card rounded-lg px-3 py-2 border border-border">
                      <p className="font-medium">{data.name}</p>
                      <p className="text-sm text-muted-foreground">{data.value} anime</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              formatter={(value: string) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

interface WatchTimeChartProps {
  data: { month: string; hours: number }[];
  className?: string;
}

export function WatchTimeChart({ data, className }: WatchTimeChartProps) {
  const maxHours = Math.max(...data.map(d => d.hours));
  
  return (
    <div className={cn("glass-card rounded-xl p-5", className)}>
      <h3 className="font-semibold mb-4">Watch Time (Last 6 Months)</h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.month} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.month}</span>
              <span className="font-medium">{item.hours}h</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: `${(item.hours / maxHours) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
