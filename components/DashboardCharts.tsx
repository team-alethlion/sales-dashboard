
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { COLORS } from '../constants';

interface ChartProps {
  data: any[];
}

// Custom hook to detect dark mode for chart styling
const useIsDark = () => {
  const [isDark, setIsDark] = React.useState(document.documentElement.classList.contains('dark'));
  
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  
  return isDark;
};

export const SalesVsTargetChart: React.FC<ChartProps> = ({ data }) => {
  const isDark = useIsDark();
  const labelColor = isDark ? '#64748b' : '#9ca3af';
  const gridColor = isDark ? '#1e293b' : '#f3f4f6';

  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.1}/>
              <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: labelColor, fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: labelColor, fontSize: 12 }}
            tickFormatter={(value) => `${value/1000}K`}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              backgroundColor: isDark ? '#1e293b' : '#fff',
              color: isDark ? '#f1f5f9' : '#1e293b'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="sales" 
            stroke={COLORS.primary} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorSales)" 
            isAnimationActive={true}
          />
          <Area 
            type="monotone" 
            dataKey="target" 
            stroke={isDark ? '#334155' : '#e5e7eb'} 
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="transparent" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ProfitAndLossChart: React.FC<ChartProps> = ({ data }) => {
  const isDark = useIsDark();
  const labelColor = isDark ? '#64748b' : '#9ca3af';

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: labelColor, fontSize: 11 }}
          />
          <Tooltip 
             contentStyle={{ 
               borderRadius: '12px', 
               border: 'none', 
               boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
               backgroundColor: isDark ? '#1e293b' : '#fff',
               color: isDark ? '#f1f5f9' : '#1e293b'
             }}
          />
          <Bar dataKey="income" fill={COLORS.primary} radius={[4, 4, 0, 0]} barSize={8} isAnimationActive={true} />
          <Bar dataKey="expense" fill={isDark ? '#334155' : '#e5e7eb'} radius={[4, 4, 0, 0]} barSize={8} isAnimationActive={true} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SalesByStoreChart: React.FC<ChartProps> = ({ data }) => {
  const isDark = useIsDark();
  const labelColor = isDark ? '#64748b' : '#9ca3af';

  return (
    <div className="h-48 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
          <XAxis type="number" hide />
          <YAxis 
            dataKey="location" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: labelColor, fontSize: 11 }}
            width={80}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              backgroundColor: isDark ? '#1e293b' : '#fff',
              color: isDark ? '#f1f5f9' : '#1e293b'
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? COLORS.primary : (isDark ? '#134e4a' : '#99f6e4')} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
