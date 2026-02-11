
import React from 'react';
import { FuelReport } from '../types';

interface ReportsTableProps {
  reports: FuelReport[];
}

const ReportsTable: React.FC<ReportsTableProps> = ({ reports }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
            <th className="px-6 py-4">📅 Sana</th>
            <th className="px-6 py-4">👤 Xodim</th>
            <th className="px-6 py-4">🚗 Avtomobil</th>
            <th className="px-6 py-4 text-right">🛣️ km</th>
            <th className="px-6 py-4 text-right">⛽ l</th>
            <th className="px-6 py-4 text-right">💰 Summa</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {reports.map((report) => (
            <tr key={report.id} className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-4 text-sm text-slate-600 font-medium whitespace-nowrap">
                {report.date}
              </td>
              <td className="px-6 py-4 text-sm text-slate-800 font-semibold whitespace-nowrap">
                {report.employeeName}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md text-xs font-bold border border-indigo-100">
                  {report.vehicleModel}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right tabular-nums">
                {report.distanceKm.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right tabular-nums">
                {report.liters.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm text-emerald-600 font-bold text-right tabular-nums whitespace-nowrap">
                {report.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {report.currency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {reports.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-400 italic">Hozircha ma'lumotlar yo'q</p>
        </div>
      )}
    </div>
  );
};

export default ReportsTable;
