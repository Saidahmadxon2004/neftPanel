
import React from 'react';
import { Page } from '../types';
import { Icons } from '../constants';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, onLogout }) => {
  const menuItems = [
    { id: Page.DASHBOARD, label: 'Asosiy panel', icon: <Icons.Dashboard /> },
    { id: Page.USERS, label: 'Xodimlar', icon: <Icons.Users /> },
    { id: Page.VEHICLES, label: 'Transport', icon: <Icons.Car /> },
    { id: Page.REPORTS, label: 'Loglar', icon: <Icons.Reports /> },
    { id: Page.ANALYTICS, label: 'Grafiklar', icon: <Icons.Analytics /> },
  ];

  return (
    <aside className="w-72 bg-slate-900 h-screen fixed left-0 top-0 text-slate-400 flex flex-col z-40">
      <div className="p-8 border-b border-slate-800 flex items-center space-x-3">
        <div className="teal-gradient p-2 rounded-lg text-white">
          <Icons.Gas />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">NeftNazorat</span>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all group ${
              currentPage === item.id
                ? 'bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/20'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className={`${currentPage === item.id ? 'text-teal-400' : 'text-slate-500 group-hover:text-white'}`}>
              {item.icon}
            </span>
            <span className="font-semibold tracking-wide">{item.label}</span>
            {currentPage === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400 shadow-lg shadow-teal-400"></div>}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800 bg-slate-900/50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-xl border border-slate-700 text-slate-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all font-bold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          <span>Tizimdan chiqish</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
