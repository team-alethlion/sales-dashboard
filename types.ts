
export interface SalesData {
  name: string;
  sales: number;
  target: number;
}

export interface ProfitLossData {
  month: string;
  income: number;
  expense: number;
}

export interface StoreLocationData {
  location: string;
  value: number;
  label: string;
}

export interface DashboardStats {
  sales: number;
  salesYoY: string;
  profit: number;
  profitYoY: string;
  cost: number;
  costYoY: string;
}
