
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import { Page, Employee, Vehicle, FuelReport } from './types';
import { MOCK_EMPLOYEES, MOCK_VEHICLES, MOCK_REPORTS, Icons } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  
  // Data State
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [reports, setReports] = useState<FuelReport[]>(MOCK_REPORTS);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'employee' | 'vehicle' | 'report' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem('neft_session');
    if (session) setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('neft_session', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('neft_session');
    setIsLoggedIn(false);
  };

  // CRUD Operations
  const deleteItem = (type: 'employee' | 'vehicle' | 'report', id: string) => {
    if (!confirm('Haqiqatan ham o\'chirmoqchimisiz?')) return;
    if (type === 'employee') setEmployees(employees.filter(e => e.id !== id));
    if (type === 'vehicle') setVehicles(vehicles.filter(v => v.id !== id));
    if (type === 'report') setReports(reports.filter(r => r.id !== id));
  };

  const openModal = (type: 'employee' | 'vehicle' | 'report', item: any = null) => {
    setModalType(type);
    setEditingItem(item);
    setModalOpen(true);
  };

  const saveItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (modalType === 'employee') {
      if (editingItem) {
        setEmployees(employees.map(emp => emp.id === editingItem.id ? { ...emp, ...data } as Employee : emp));
      } else {
        const newEmp: Employee = { id: Date.now().toString(), ...data, status: 'Faol' } as any;
        setEmployees([newEmp, ...employees]);
      }
    }

    if (modalType === 'vehicle') {
      if (editingItem) {
        setVehicles(vehicles.map(v => v.id === editingItem.id ? { ...v, ...data } as Vehicle : v));
      } else {
        const newV: Vehicle = { id: Date.now().toString(), ...data, lastService: new Date().toISOString().split('T')[0] } as any;
        setVehicles([newV, ...vehicles]);
      }
    }

    if (modalType === 'report') {
      if (editingItem) {
        setReports(reports.map(r => r.id === editingItem.id ? { ...r, ...data, liters: Number(data.liters), amount: Number(data.amount), distanceKm: Number(data.distanceKm) } as FuelReport : r));
      } else {
        const newR: FuelReport = { 
          id: Date.now().toString(), 
          date: new Date().toLocaleString().slice(0, 16),
          employeeName: data.employeeName as string,
          vehicleModel: data.vehicleModel as string,
          distanceKm: Number(data.distanceKm),
          liters: Number(data.liters),
          amount: Number(data.amount),
          currency: 'so\'m'
        };
        setReports([newR, ...reports]);
      }
    }

    setModalOpen(false);
    setEditingItem(null);
  };

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;

  const renderContent = () => {
    switch (currentPage) {
      case Page.DASHBOARD:
        return <Dashboard stats={{
          totalFuelMonth: reports.reduce((acc, curr) => acc + curr.liters, 0),
          activeVehicles: vehicles.length,
          totalExpense: reports.reduce((acc, curr) => acc + curr.amount, 0),
          safetyScore: 98
        }} reports={reports.slice(0, 5)} onAddReport={() => openModal('report')} />;
      
      case Page.USERS:
        return (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-3xl font-black text-slate-800">Xodimlar <span className="text-slate-400 text-lg">({employees.length})</span></h1>
              <button onClick={() => openModal('employee')} className="flex items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-teal-700 transition-all">
                <Icons.Plus />
                <span>Yangi xodim</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map((emp) => (
                <div key={emp.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-xl transition-all relative">
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openModal('employee', emp)} className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-teal-500 hover:text-white transition-all">✏️</button>
                    <button onClick={() => deleteItem('employee', emp.id)} className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-rose-500 hover:text-white transition-all">🗑️</button>
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-2xl teal-gradient flex items-center justify-center text-white text-2xl font-black">{emp.name[0]}</div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${emp.status === 'Faol' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                      {emp.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{emp.name}</h3>
                  <p className="text-slate-400 font-medium mb-4">{emp.role}</p>
                  <div className="flex items-center space-x-2 text-slate-600 font-bold bg-slate-50 p-4 rounded-xl">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <span>{emp.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case Page.VEHICLES:
        return (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-3xl font-black text-slate-800">Transportlar <span className="text-slate-400 text-lg">({vehicles.length})</span></h1>
              <button onClick={() => openModal('vehicle')} className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all">
                <Icons.Plus />
                <span>Yangi transport</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.map((v) => (
                <div key={v.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative">
                   <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button onClick={() => openModal('vehicle', v)} className="p-2 bg-white/80 backdrop-blur rounded-lg text-slate-600 hover:bg-blue-500 hover:text-white transition-all shadow-sm">✏️</button>
                    <button onClick={() => deleteItem('vehicle', v.id)} className="p-2 bg-white/80 backdrop-blur rounded-lg text-slate-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm">🗑️</button>
                  </div>
                   <div className="h-24 bg-slate-100 flex items-center justify-center text-4xl group-hover:bg-blue-50 transition-colors">🚛</div>
                   <div className="p-8">
                      <div className="flex justify-between items-center mb-4">
                        <span className="bg-slate-900 text-white px-4 py-1 rounded-lg font-black text-sm tracking-widest uppercase">{v.plateNumber}</span>
                        <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">{v.fuelType}</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-800 mb-6">{v.model}</h3>
                      <div className="flex justify-between items-center border-t border-slate-50 pt-6">
                        <div className="text-center">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Xizmat muddati</p>
                          <p className="text-slate-700 font-black">{v.lastService}</p>
                        </div>
                        <div className="w-px h-8 bg-slate-100"></div>
                        <div className="text-center">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Holat</p>
                          <p className="text-emerald-500 font-black">Onlayn</p>
                        </div>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        );
      case Page.REPORTS:
        return (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <h1 className="text-3xl font-black text-slate-800">Tizim Loglari</h1>
              <div className="flex space-x-3">
                <button onClick={() => openModal('report')} className="bg-teal-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg flex items-center space-x-2">
                   <Icons.Plus />
                   <span>Yangi quyish</span>
                </button>
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr className="text-slate-400 font-black uppercase text-[11px] tracking-widest">
                      <th className="px-8 py-5">Sana / Vaqt</th>
                      <th className="px-8 py-5">Mas'ul xodim</th>
                      <th className="px-8 py-5">Avtomobil</th>
                      <th className="px-8 py-5">Masofa</th>
                      <th className="px-8 py-5">Yoqilg'i</th>
                      <th className="px-8 py-5">Mablag'</th>
                      <th className="px-8 py-5 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {reports.map((r) => (
                      <tr key={r.id} className="hover:bg-teal-50/20 transition-all group">
                        <td className="px-8 py-6 font-bold text-slate-500 text-sm">{r.date}</td>
                        <td className="px-8 py-6 font-black text-slate-800">{r.employeeName}</td>
                        <td className="px-8 py-6 uppercase font-bold text-teal-600 text-xs tracking-tight">{r.vehicleModel}</td>
                        <td className="px-8 py-6 font-bold text-slate-700">{r.distanceKm.toLocaleString()} km</td>
                        <td className="px-8 py-6">
                           <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg font-black text-xs">{r.liters} l</span>
                        </td>
                        <td className="px-8 py-6 font-black text-slate-900">{r.amount.toLocaleString()} UZS</td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => openModal('report', r)} className="text-slate-400 hover:text-teal-600 font-bold">Tahrir</button>
                             <button onClick={() => deleteItem('report', r.id)} className="text-slate-400 hover:text-rose-600 font-bold">O'chirish</button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        );
      case Page.ANALYTICS:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
             <div className="w-24 h-24 teal-gradient rounded-3xl flex items-center justify-center text-white text-4xl mb-8 shadow-2xl animate-pulse">📈</div>
             <h2 className="text-4xl font-black text-slate-800 mb-4">Grafik Analitika</h2>
             <p className="text-slate-500 max-w-md mx-auto font-medium">Budjet sarfi va yoqilg'i dinamikasi haqida to'liq tasavvurga ega bo'ling.</p>
             <button onClick={() => setCurrentPage(Page.DASHBOARD)} className="mt-8 px-10 py-4 teal-gradient text-white rounded-2xl font-black shadow-xl hover:scale-105 transition-all">Panelga qaytish</button>
          </div>
        );
    }
  };

  return (
    <div className="flex">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />
      <main className="flex-1 ml-72 p-12 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* CRUD Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-800">
                {editingItem ? 'Tahrirlash' : 'Yangi kiritish'}: {modalType === 'employee' ? 'Xodim' : modalType === 'vehicle' ? 'Transport' : 'Hisobot'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl">×</button>
            </div>
            <form onSubmit={saveItem} className="p-8 space-y-6">
              {modalType === 'employee' && (
                <>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">To'liq ism</label>
                    <input name="name" defaultValue={editingItem?.name} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Lavozim</label>
                    <select name="role" defaultValue={editingItem?.role} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all">
                      <option>Haydovchi</option>
                      <option>Dispetcher</option>
                      <option>Omborchi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Telefon</label>
                    <input name="phone" defaultValue={editingItem?.phone} required placeholder="+998 90..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all" />
                  </div>
                </>
              )}

              {modalType === 'vehicle' && (
                <>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Model</label>
                    <input name="model" defaultValue={editingItem?.model} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Davlat raqami</label>
                    <input name="plateNumber" defaultValue={editingItem?.plateNumber} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Yoqilg'i turi</label>
                    <select name="fuelType" defaultValue={editingItem?.fuelType} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all">
                      <option>Benzin</option>
                      <option>Metan</option>
                      <option>Dizel</option>
                    </select>
                  </div>
                </>
              )}

              {modalType === 'report' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Xodim</label>
                      <select name="employeeName" defaultValue={editingItem?.employeeName} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                        {employees.map(e => <option key={e.id}>{e.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Transport</label>
                      <select name="vehicleModel" defaultValue={editingItem?.vehicleModel} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                        {vehicles.map(v => <option key={v.id}>{v.model}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Litr</label>
                      <input type="number" name="liters" defaultValue={editingItem?.liters} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Masofa (km)</label>
                      <input type="number" name="distanceKm" defaultValue={editingItem?.distanceKm} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Summa</label>
                      <input type="number" name="amount" defaultValue={editingItem?.amount} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-4 flex space-x-3">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">Bekor qilish</button>
                <button type="submit" className="flex-[2] py-4 teal-gradient text-white rounded-2xl font-black shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.02] transition-all">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
