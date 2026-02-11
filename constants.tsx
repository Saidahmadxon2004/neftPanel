
import React from 'react';
import { FuelReport, Employee, Vehicle } from './types';

export const MOCK_REPORTS: FuelReport[] = [
  { id: '1', date: '2025-05-20 09:12', employeeName: 'Jasur Bekov', vehicleModel: 'Isuzu NPR', distanceKm: 45200, liters: 45, amount: 450000, currency: 'soʻm' },
  { id: '2', date: '2025-05-20 11:45', employeeName: 'Alisher S.', vehicleModel: 'Chevrolet Labo', distanceKm: 12500, liters: 12, amount: 115000, currency: 'soʻm' },
  { id: '3', date: '2025-05-19 18:30', employeeName: 'Malika Karimova', vehicleModel: 'Damas', distanceKm: 88400, liters: 15, amount: 140000, currency: 'soʻm' },
  { id: '4', date: '2025-05-18 07:00', employeeName: 'Xurshid T.', vehicleModel: 'Isuzu NPR', distanceKm: 46100, liters: 40, amount: 400000, currency: 'soʻm' },
];

export const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Jasur Bekov', role: 'Haydovchi', status: 'Faol', phone: '+998 90 123 45 67' },
  { id: '2', name: 'Alisher S.', role: 'Haydovchi', status: 'Faol', phone: '+998 93 456 78 90' },
  { id: '3', name: 'Malika Karimova', role: 'Dispetcher', status: 'Faol', phone: '+998 97 777 00 11' },
  { id: '4', name: 'Xurshid T.', role: 'Haydovchi', status: 'Nofaol', phone: '+998 91 333 44 55' },
];

export const MOCK_VEHICLES: Vehicle[] = [
  { id: '1', model: 'Isuzu NPR', plateNumber: '01 A 777 AA', fuelType: 'Dizel', lastService: '2025-04-10' },
  { id: '2', model: 'Chevrolet Labo', plateNumber: '10 B 222 BB', fuelType: 'Benzin', lastService: '2025-05-01' },
  { id: '3', model: 'Damas', plateNumber: '20 C 333 CC', fuelType: 'Metan', lastService: '2025-05-15' },
];

export const MOCK_STATS = {
  totalFuelMonth: 1450,
  activeVehicles: 12,
  totalExpense: 14500000,
  safetyScore: 98
};

export const Icons = {
  Dashboard: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Users: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  Car: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
  Reports: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Analytics: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  Lock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Plus: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
  Gas: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" /></svg>,
  Logout: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
};
