
import React from 'react';
// Fix: Icons is exported from constants, not types. FuelReport is correct in types.
import { FuelReport } from '../types';
import { Icons } from '../constants';

interface DashboardProps {
  stats: {
    totalFuelMonth: number;
    activeVehicles: number;
    totalExpense: number;
    safetyScore: number;
  };
  // Fix: Specify the correct type for reports instead of any[]
  reports: FuelReport[];
  onAddReport: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, reports, onAddReport }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Xayrli kun, Administrator!</h1>
          <p className="text-slate-500 font-medium">Bugungi yoqilg'i nazorati va sarf-xarajatlar holati.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">Hisobotni yuklash</button>
          <button onClick={onAddReport} className="px-5 py-2.5 teal-gradient text-white rounded-xl font-bold shadow-lg shadow-teal-500/20 hover:scale-105 transition-all">Yangi quyish +</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Oylik yoqilg\'i', value: stats.totalFuelMonth.toFixed(1) + ' l', color: 'text-teal-600', bg: 'bg-teal-50', icon: '⛽' },
          { label: 'Faol transport', value: stats.activeVehicles, color: 'text-blue-600', bg: 'bg-blue-50', icon: '🚛' },
          { label: 'Oylik xarajat', value: stats.totalExpense.toLocaleString() + ' so\'m', color: 'text-amber-600', bg: 'bg-amber-50', icon: '💰' },
          { label: 'Xavfsizlik', value: stats.safetyScore + '%', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: '🛡️' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{stat.label}</p>
            <h3 className={`text-2xl font-black mt-1 ${stat.color} tracking-tight`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Oxirgi tranzaksiyalar</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr className="text-left text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                  <th className="px-8 py-4">Xodim</th>
                  <th className="px-8 py-4">Transport</th>
                  <th className="px-8 py-4">Litr</th>
                  <th className="px-8 py-4">Summa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {reports.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 group-hover:bg-teal-500 group-hover:text-white transition-all">{r.employeeName[0]}</div>
                        <span className="font-bold text-slate-700">{r.employeeName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg font-bold text-xs uppercase tracking-tight">{r.vehicleModel}</span>
                    </td>
                    <td className="px-8 py-5 font-black text-slate-800">{r.liters} l</td>
                    <td className="px-8 py-5 text-emerald-600 font-black">{r.amount.toLocaleString()} UZS</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-2xl shadow-slate-900/20">
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <span className="text-teal-400">⚡</span>
              <span>Tezkor monitoring</span>
            </h3>
            <div className="space-y-6">
               <div className="space-y-2">
                 <div className="flex justify-between text-sm font-bold text-slate-400 uppercase tracking-widest">
                   <span>Litiy limit</span>
                   <span>75%</span>
                 </div>
                 <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                   <div className="w-3/4 h-full teal-gradient rounded-full"></div>
                 </div>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between text-sm font-bold text-slate-400 uppercase tracking-widest">
                   <span>Budjet sarfi</span>
                   <span>42%</span>
                 </div>
                 <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                   <div className="w-[42%] h-full bg-amber-500 rounded-full"></div>
                 </div>
               </div>
            </div>
          </div>
          <div className="mt-12 bg-teal-500/10 border border-teal-500/20 rounded-2xl p-5">
            <p className="text-teal-400 font-bold mb-2 uppercase text-[10px] tracking-widest">Tizim holati</p>
            <p className="text-slate-300 text-sm">Barcha yoqilg'i datchiklari real-vaqt rejimida nazorat qilinmoqda.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
