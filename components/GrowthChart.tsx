
import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { GROWTH_DATA, COLORS } from '../constants';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-indigo-100 border border-indigo-200 px-4 py-2 rounded-xl shadow-lg">
        <p className="text-[10px] text-indigo-400 font-bold uppercase">10 of September</p>
        <p className="text-lg font-bold text-indigo-800">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const GrowthChart: React.FC = () => {
  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={GROWTH_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            tick={{ fill: '#cbd5e1', fontSize: 10 }}
            dy={10}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={COLORS.primary} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            dot={{ r: 4, fill: COLORS.primary, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;
