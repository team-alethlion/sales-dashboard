
import React from 'react';
import { 
  LayoutGrid, 
  Store, 
  Package, 
  Users, 
  Settings, 
  HelpCircle, 
  Sparkles, 
  Activity,
  TrendingUp,
  ClipboardList,
  ArrowLeftRight,
  Receipt,
  Wallet,
  MessageSquare,
  CheckSquare,
  Truck
} from 'lucide-react';

export const COLORS = {
  primary: '#0d9488', // teal-600
  secondary: '#115e59', // teal-800
  background: '#f9fafb',
  storeA: '#115e59',
  storeB: '#99f6e4',
  storeC: '#2dd4bf'
};

export const NAVIGATION_ITEMS = [
  // CORE
  { id: 'dashboard', name: 'Dashboard', icon: <LayoutGrid size={20} />, section: 'CORE' },
  { id: 'sales', name: 'Sales', icon: <TrendingUp size={20} />, section: 'CORE' },
  { id: 'customers', name: 'Customers', icon: <Users size={20} />, section: 'CORE' },
  { id: 'products', name: 'Products', icon: <Package size={20} />, section: 'CORE' },
  { id: 'inventory', name: 'Inventory', icon: <ClipboardList size={20} />, section: 'CORE' },
  { id: 'carriage_inwards', name: 'Carriage', icon: <Truck size={20} />, section: 'CORE' },
  { id: 'transfer', name: 'Transfer', icon: <ArrowLeftRight size={20} />, section: 'CORE' },
  
  // BUSINESS
  { id: 'expenses', name: 'Expenses', icon: <Receipt size={20} />, section: 'BUSINESS' },
  { id: 'finance', name: 'Finance', icon: <Wallet size={20} />, section: 'BUSINESS' },
  { id: 'messaging', name: 'Messaging', icon: <MessageSquare size={20} />, section: 'BUSINESS' },
  { id: 'tasks', name: 'Tasks', icon: <CheckSquare size={20} />, section: 'BUSINESS' },
  
  // SYSTEM
  { id: 'support', name: 'Support', icon: <HelpCircle size={20} />, section: 'SYSTEM' },
  { id: 'settings', name: 'Settings', icon: <Settings size={20} />, section: 'SYSTEM' },
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

export const GROWTH_DATA = [
  { year: '2019', value: 12000 },
  { year: '2020', value: 15000 },
  { year: '2021', value: 18000 },
  { year: '2022', value: 24000 },
  { year: '2023', value: 32000 },
  { year: '2024', value: 37829 },
];

export const RECENT_ACTIVITY_DATA = [
  { id: 1, type: 'user', content: 'Nicholas updated sales targets for Q3', time: '2 mins ago', color: 'bg-teal-500' },
  { id: 2, type: 'ai', content: 'System generated new AI insights for May', time: '1 hour ago', color: 'bg-purple-500' },
  { id: 3, type: 'store', content: 'Airport store reached its daily target', time: '3 hours ago', color: 'bg-amber-500' },
  { id: 4, type: 'system', content: 'Monthly backup completed successfully', time: '5 hours ago', color: 'bg-blue-500' },
  { id: 5, type: 'product', content: 'New inventory items added to Downtown', time: 'Yesterday', color: 'bg-rose-500' },
];
