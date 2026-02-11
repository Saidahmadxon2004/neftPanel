
import React from 'react';

interface SummaryCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-500 text-sm font-medium">{label}</span>
        <div className={`p-2 rounded-xl bg-opacity-10 ${color}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline space-x-1">
        <span className={`text-3xl font-bold ${color.replace('bg-', 'text-')}`}>{value}</span>
        {label.includes('litr') && <span className="text-slate-400 text-sm font-normal">l</span>}
      </div>
    </div>
  );
};

export default SummaryCard;
