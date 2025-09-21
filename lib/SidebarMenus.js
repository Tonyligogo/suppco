
import { Home, Users, Package, Wrench, FileText, ClipboardList, Warehouse, ChartNoAxesCombined } from 'lucide-react';

export const SupplierMenuItems = [
  { title: 'Dashboard', href: ``, icon: Home },
  { title: 'Branches', href: `/branches`, icon: Warehouse },
  { title: 'Employees', href: `/employees`, icon: Users },
  { title: 'Products', href: `/products`, icon: Package },
  { title: 'Orders', href: `/orders`, icon: ClipboardList },
  { title: 'Quotations', href: `/quotations`, icon: FileText },
];

export const ContractorMenuItems = [
  { title: 'Dashboard', href: ``, icon: Home },
  { title: 'Sites', href: `/sites`, icon: Warehouse },
  { title: 'Workers', href: `/workers`, icon: Users },
  { title: 'Orders', href: `/orders`, icon: ClipboardList },
  { title: 'Materials', href: `/materials`, icon: Wrench },
  { title: 'Quotations', href: `/quotations`, icon: FileText },
];

export const AdminMenuItems = [
  { title: 'Dashboard', href: ``, icon: Home },
  { title: 'Suppliers', href: `/suppliers`, icon: Warehouse },
  { title: 'Contractors', href: `/contractors`, icon: Warehouse },
  { title: 'Orders', href: `/orders`, icon: ClipboardList },
  { title: 'Employees', href: `/employees`, icon: Users },
  { title: 'Revenue', href: `/revenue`, icon: ChartNoAxesCombined },
  { title: 'Reports', href: `/reports`, icon: FileText },
];

export const EmployeeMenuItems = [
  { title: 'Dashboard', href: ``, icon: Home },
];

// Menu configuration mapping
const MENU_CONFIGS = {
    supplier: SupplierMenuItems,
    contractor: ContractorMenuItems,
    admin:AdminMenuItems,
    employee:EmployeeMenuItems
 };

 export const getMenuItems = (tenant) => {
    const normalizedTenant = tenant?.toLowerCase();
    return MENU_CONFIGS[normalizedTenant] || [];
  };