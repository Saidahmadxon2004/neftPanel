
import React from 'react';
import { Icons } from '../constants';

const TopBar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-6 z-50">
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-500 p-1.5 rounded-lg">
          {/* Fix: Property 'Fuel' does not exist on 'Icons', using 'Gas' instead */}
          <Icons.Gas />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">GSM REPORT</h1>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-none">Admin-panel</p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden sm:flex items-center space-x-3 group cursor-pointer">
          <div className="text-right">
            <p className="text-sm font-semibold">Saidbek</p>
            <p className="text-xs text-slate-400 group-hover:text-indigo-400 transition-colors">Bosh administrator</p>
          </div>
          <div className="w-9 h-9 bg-slate-700 rounded-full flex items-center justify-center border border-slate-600 overflow-hidden">
             <img src="https://picsum.photos/seed/admin/40/40" alt="Avatar" />
          </div>
        </div>
        
        <button className="flex items-center space-x-2 bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-sm">
          {/* Fix: Property 'Logout' does not exist on 'Icons', using added 'Logout' icon */}
          <Icons.Logout />
          <span>Chiqish</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
