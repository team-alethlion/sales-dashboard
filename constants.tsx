
import React from 'react';
import { LayoutGrid, Store, Package, Users, Settings, HelpCircle } from 'lucide-react';

export const COLORS = {
  primary: '#0d9488', // teal-600
  secondary: '#115e59', // teal-800
  background: '#f9fafb',
  storeA: '#115e59',
  storeB: '#99f6e4',
  storeC: '#2dd4bf'
};

export const NAVIGATION_ITEMS = [
  { id: 'overview', name: 'Overview', icon: <LayoutGrid size={20} />, section: 'MAIN MENU' },
  { id: 'store', name: 'Store', icon: <Store size={20} />, section: 'MAIN MENU' },
  { id: 'product', name: 'Product', icon: <Package size={20} />, section: 'MAIN MENU' },
  { id: 'customer', name: 'Customer', icon: <Users size={20} />, section: 'MAIN MENU' },
  { id: 'setting', name: 'Setting', icon: <Settings size={20} />, section: 'OTHER' },
  { id: 'help', name: 'Help Center', icon: <HelpCircle size={20} />, section: 'OTHER' },
];

export const SALES_CHART_DATA = [
  { name: 'Jan', sales: 2000, target: 4000 },
  { name: 'Feb', sales: 5000, target: 6000 },
  { name: 'Mar', sales: 12000, target: 8000 },
  { name: 'Apr', sales: 7000, target: 9000 },
  { name: 'May', sales: 8500, target: 10000 },
  { name: 'Jun', sales: 9000, target: 11000 },
];

export const PROFIT_LOSS_DATA = [
  { month: 'Jan', income: 45, expense: 30 },
  { month: 'Feb', income: 60, expense: 40 },
  { month: 'Mar', income: 55, expense: 45 },
  { month: 'Apr', income: 30, expense: 25 },
  { month: 'May', income: 65, expense: 35 },
  { month: 'Jun', income: 50, expense: 40 },
];

export const STORE_LOCATION_DATA = [
  { location: 'Downtown', value: 17, label: '$17.0M' },
  { location: 'Commercial', value: 7.1, label: '$7.1M' },
  { location: 'Airport', value: 13, label: '$13.0M' },
];

// Added GROWTH_DATA to fix the import error in GrowthChart.tsx
export const GROWTH_DATA = [
  { year: '2019', value: 12000 },
  { year: '2020', value: 15000 },
  { year: '2021', value: 18000 },
  { year: '2022', value: 24000 },
  { year: '2023', value: 32000 },
  { year: '2024', value: 37829 },
];
