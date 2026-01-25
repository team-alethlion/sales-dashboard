
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { SALES_CHART_DATA, PROFIT_LOSS_DATA, STORE_LOCATION_DATA, COLORS } from '../constants';

export const SalesVsTargetChart: React.FC = () => {
  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={SALES_CHART_DATA}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.1}/>
              <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickFormatter={(value) => `${value/1000}K`}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="sales" 
            stroke={COLORS.primary} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorSales)" 
          />
          <Area 
            type="monotone" 
            dataKey="target" 
            stroke="#e5e7eb" 
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="transparent" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ProfitAndLossChart: React.FC = () => {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={PROFIT_LOSS_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 11 }}
          />
          <Tooltip 
             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="income" fill={COLORS.primary} radius={[4, 4, 0, 0]} barSize={8} />
          <Bar dataKey="expense" fill="#e5e7eb" radius={[4, 4, 0, 0]} barSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SalesByStoreChart: React.FC = () => {
  return (
    <div className="h-48 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={STORE_LOCATION_DATA} layout="vertical" margin={{ left: -10, right: 20 }}>
          <XAxis type="number" hide />
          <YAxis 
            dataKey="location" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 11 }}
          />
          <Tooltip />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
            {STORE_LOCATION_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? COLORS.primary : '#99f6e4'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
