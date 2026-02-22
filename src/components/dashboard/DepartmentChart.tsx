import { useMemo, useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { GlassCard } from '@/components/ui/GlassCard';
import { getDepartmentCounts } from '@/services/teacherService';

const COLORS = ['hsl(263, 70%, 58%)', 'hsl(189, 94%, 43%)', 'hsl(38, 92%, 50%)'];

export function DepartmentChart() {
  const [counts, setCounts] = useState<Record<string, number>>({ ai: 0, cs: 0, ee: 0 });

  useEffect(() => {
    getDepartmentCounts().then(setCounts);
  }, []);

  const data = useMemo(() => {
    return [
      { name: 'AI', value: counts.ai || 0 },
      { name: 'CS', value: counts.cs || 0 },
      { name: 'EE', value: counts.ee || 0 },
    ];
  }, [counts]);

  return (
    <GlassCard className="p-5 h-full" hover={false}>
      <h3 className="font-display text-sm font-semibold text-foreground mb-3">Departments</h3>
      <ResponsiveContainer width="100%" height={140}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" stroke="none">
            {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'hsl(240 6% 7%)',
              border: '1px solid hsl(240 4% 16%)',
              borderRadius: '8px',
              color: 'hsl(0 0% 95%)',
              fontSize: '12px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
            {d.name} ({d.value})
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
