
import React from 'react';
import StatCard from './StatCard';

interface MetricStatsProps {
  stats: {
    sales: number;
    profit: number;
    cost: number;
  };
}

const MetricStats: React.FC<MetricStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        label="REVENUE GENERATED" 
        value={`$${stats.sales.toLocaleString()}`} 
        subValue={`vs target: +$${(stats.sales * 0.1).toLocaleString()}`} 
        change="14.2" 
        isPositive={true} 
        barColor="bg-teal-500" 
      />
      <StatCard 
        label="OPERATIONAL COST" 
        value={`$${stats.cost.toLocaleString()}`} 
        subValue="Mainly logistics & staff" 
        change="3.1" 
        isPositive={false} 
        barColor="bg-rose-400" 
      />
      <StatCard 
        label="NET MARGIN" 
        value={`$${stats.profit.toLocaleString()}`} 
        subValue="After all expenses" 
        change="9.5" 
        isPositive={true} 
        barColor="bg-teal-500" 
      />
    </div>
  );
};

export default MetricStats;
