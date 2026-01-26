
import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, RefreshCcw } from 'lucide-react';
import InventoryToolbar from './InventoryToolbar';
import InventoryTable from './InventoryTable';
import InventoryEditModal from './InventoryEditModal';

interface ProductItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const MOCK_INVENTORY: ProductItem[] = [
  { id: '1', sku: 'ELE-MON-01', name: 'UltraHD Curved Monitor 32"', category: 'Electronics', price: 299.99, stock: 12, status: 'In Stock' },
  { id: '2', sku: 'F&B-BEA-05', name: 'Premium Coffee Beans (1kg)', category: 'Food & Bev', price: 24.50, stock: 85, status: 'In Stock' },
  { id: '3', sku: 'APP-MSK-02', name: 'Silk Sleep Mask', category: 'Apparel', price: 35.00, stock: 110, status: 'In Stock' },
  { id: '4', sku: 'HOM-CHR-09', name: 'Ergonomic Office Chair', category: 'Home & Living', price: 145.00, stock: 4, status: 'Low Stock' },
  { id: '5', sku: 'ELE-LAP-M3', name: 'MacBook Pro M3 14"', category: 'Electronics', price: 1599.00, stock: 2, status: 'Low Stock' },
  { id: '6', sku: 'ELE-HDP-S5', name: 'Sony WH-1000XM5', category: 'Electronics', price: 349.00, stock: 0, status: 'Out of Stock' },
  { id: '7', sku: 'HOM-MAT-L1', name: 'Leather Desk Mat', category: 'Home & Living', price: 42.00, stock: 3, status: 'Low Stock' },
  { id: '8', sku: 'APP-BAG-T1', name: 'Leather Travel Bag', category: 'Apparel', price: 120.00, stock: 15, status: 'In Stock' },
  { id: '9', sku: 'ELE-HUB-U1', name: 'USB-C Multi-port Hub', category: 'Electronics', price: 55.00, stock: 42, status: 'In Stock' },
  { id: '10', sku: 'F&B-TEA-G1', name: 'Organic Green Tea', category: 'Food & Bev', price: 18.00, stock: 64, status: 'In Stock' },
];

const InventoryTab: React.FC = () => {
  const [inventory, setInventory] = useState<ProductItem[]>(MOCK_INVENTORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'alert' | 'info' } | null>(null);

  const [editingItem, setEditingItem] = useState<ProductItem | null>(null);
  const [isEditSaving, setIsEditSaving] = useState(false);

  const itemsPerPage = 5;

  const showToast = (msg: string, type: 'success' | 'alert' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredProducts = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.sku.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === 'All Categories' || item.category === categoryFilter;
      const matchesStatus = statusFilter === 'All Statuses' || item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [inventory, searchQuery, categoryFilter, statusFilter]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleRestock = (id: string) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = item.stock + 10;
        return { ...item, stock: newStock, status: newStock > 10 ? 'In Stock' : newStock > 0 ? 'Low Stock' : 'Out of Stock' };
      }
      return item;
    }));
    showToast('Inventory replenished (+10 units)');
  };

  const handleDeleteItem = (id: string) => {
    const itemToDelete = inventory.find(i => i.id === id);
    setInventory(prev => prev.filter(i => i.id !== id));
    showToast(`${itemToDelete?.sku} removed from registry`, 'alert');
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewAudit = (sku: string) => {
    showToast(`Accessing secure audit logs for ${sku}...`, 'info');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    setIsEditSaving(true);
    setTimeout(() => {
      const updatedItem: ProductItem = {
        ...editingItem,
        status: editingItem.stock > 10 ? 'In Stock' : editingItem.stock > 0 ? 'Low Stock' : 'Out of Stock'
      };

      setInventory(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
      setIsEditSaving(false);
      setEditingItem(null);
      showToast(`Record for ${updatedItem.sku} synchronized`);
    }, 1200);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('All Categories');
    setStatusFilter('All Statuses');
    setCurrentPage(1);
  };

  return (
    <div className="animate-in fade-in slide-in-from-left-2 duration-300 relative">
      {toast && (
        <div className="fixed bottom-24 lg:bottom-8 right-8 z-[150] animate-in slide-in-from-right-8 duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
            {toast.type === 'success' && <CheckCircle2 size={18} className="text-teal-400" />}
            {toast.type === 'alert' && <AlertCircle size={18} className="text-rose-400" />}
            {toast.type === 'info' && <RefreshCcw size={18} className="text-blue-400 animate-spin" />}
            <span className="text-[11px] font-black tracking-tight uppercase">{toast.msg}</span>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden min-h-[550px] flex flex-col">
        <InventoryToolbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          resetFilters={resetFilters}
          isFilterMenuOpen={isFilterMenuOpen}
          setIsFilterMenuOpen={setIsFilterMenuOpen}
          setCurrentPage={setCurrentPage}
        />

        <InventoryTable 
          items={currentItems}
          onRestock={handleRestock}
          onEdit={setEditingItem}
          onDelete={handleDeleteItem}
          onViewAudit={handleViewAudit}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          totalFilteredCount={filteredProducts.length}
          resetFilters={resetFilters}
        />
      </div>

      {editingItem && (
        <InventoryEditModal 
          item={editingItem}
          setItem={setEditingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveEdit}
          isSaving={isEditSaving}
        />
      )}
    </div>
  );
};

export default InventoryTab;
