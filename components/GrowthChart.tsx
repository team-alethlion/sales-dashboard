
import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { COLORS } from '../constants';

interface GrowthChartProps {
  data: any[];
}

const CustomTooltip = ({ active, payload, isDark }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={`${isDark ? 'bg-indigo-950/50 border-indigo-900/50' : 'bg-indigo-100 border-indigo-200'} border px-4 py-2 rounded-xl shadow-lg backdrop-blur-sm`}>
        <p className={`text-[10px] ${isDark ? 'text-indigo-400' : 'text-indigo-400'} font-bold uppercase`}>Historical Performance</p>
        <p className={`text-lg font-bold ${isDark ? 'text-indigo-100' : 'text-indigo-800'}`}>${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  const [isDark, setIsDark] = React.useState(document.documentElement.classList.contains('dark'));
  
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const labelColor = isDark ? '#475569' : '#cbd5e1';

  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.1}/>
              <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: labelColor, fontSize: 10 }}
            dy={10}
          />
          <Tooltip content={<CustomTooltip isDark={isDark} />} />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={COLORS.primary} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            dot={{ r: 4, fill: COLORS.primary, strokeWidth: 2, stroke: isDark ? '#0f172a' : '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;
