
import React, { useState } from 'react';
import { Icons } from '../constants';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('Login yoki parol noto\'g\'ri!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="grid grid-cols-12 gap-4 rotate-12 scale-150">
            {Array.from({ length: 144 }).map((_, i) => (
               <div key={i} className="h-20 bg-teal-500/20 rounded-lg"></div>
            ))}
         </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 p-8 sm:p-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl teal-gradient text-white mb-6 shadow-xl shadow-teal-500/20">
            <Icons.Gas />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">NeftNazorat <span className="text-teal-600">Pro</span></h1>
          <p className="text-slate-500 mt-2 font-medium">Boshqaruv tizimiga kirish</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Login</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Parol</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium animate-bounce">{error}</p>}

          <button 
            type="submit"
            className="w-full py-4 teal-gradient text-white rounded-xl font-bold text-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Tizimga kirish
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400 text-sm font-medium">
          Texnik yordam: +998 71 200 00 00
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
