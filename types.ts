
export interface Employee {
  id: string;
  name: string;
  role: string;
  status: 'Faol' | 'Nofaol';
  phone: string;
}

export interface Vehicle {
  id: string;
  model: string;
  plateNumber: string;
  fuelType: 'Benzin' | 'Metan' | 'Dizel';
  lastService: string;
}

export interface FuelReport {
  id: string;
  date: string;
  employeeName: string;
  vehicleModel: string;
  distanceKm: number;
  liters: number;
  amount: number;
  currency: string;
}

export enum Page {
  DASHBOARD = 'dashboard',
  USERS = 'users',
  VEHICLES = 'vehicles',
  REPORTS = 'reports',
  ANALYTICS = 'analytics'
}
