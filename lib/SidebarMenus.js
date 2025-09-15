
import { Home, Users, Package, Wrench, Calendar, FileText, Truck, ClipboardList, BarChart3 } from 'lucide-react';

// Define menu items for each tenant type
export const SupplierMenuItems = [
  { title: 'Dashboard', href: `/supplier`, icon: Home },
  { title: 'Employees', href: `/supplier/employees`, icon: Users },
  { title: 'Products', href: `/supplier/products`, icon: Package },
  { title: 'Orders', href: `/supplier/orders`, icon: ClipboardList },
  { title: 'Invoices', href: `/supplier/invoices`, icon: FileText },
  { title: 'Reports', href: `/supplier/reports`, icon: BarChart3 },
];

export const ContractorMenuItems = [
  { title: 'Dashboard', href: `/contractor`, icon: Home },
  { title: 'Employees', href: `/contractor/employees`, icon: Users },
  { title: 'Projects', href: `/contractor/projects`, icon: Wrench },
  { title: 'Schedule', href: `/contractor/schedule`, icon: Calendar },
  { title: 'Equipment', href: `/contractor/equipment`, icon: Truck },
  { title: 'Invoices', href: `/contractor/invoices`, icon: FileText },
  { title: 'Reports', href: `/contractor/reports`, icon: BarChart3 },
];

// Menu configuration mapping
const MENU_CONFIGS = {
    supplier: SupplierMenuItems,
    contractor: ContractorMenuItems,
 };

 export const getMenuItems = (tenant) => {
    const normalizedTenant = tenant?.toLowerCase();
    return MENU_CONFIGS[normalizedTenant] || [];
  };