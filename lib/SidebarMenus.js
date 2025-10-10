
import { Home, Users, Package, Wrench, FileText, ClipboardList, Warehouse, ChartNoAxesCombined } from 'lucide-react';

export const SupplierMenuItems = [
  { title: 'Dashboard', href: `/dashboard`, icon: Home },
  { title: 'Branches', href: `/dashboard/branches`, icon: Warehouse },
  { title: 'Employees', href: `/dashboard/employees`, icon: Users },
  { title: 'Products', href: `/dashboard/products`, icon: Package },
  { title: 'Orders', href: `/dashboard/orders`, icon: ClipboardList },
  { title: 'Quotations', href: `/dashboard/quotations`, icon: FileText },
];

export const ContractorMenuItems = [
  { title: 'Dashboard', href: `/dashboard`, icon: Home },
  { title: 'Sites', href: `/dashboard/sites`, icon: Warehouse },
  { title: 'Workers', href: `/dashboard/workers`, icon: Users },
  { title: 'Orders', href: `/dashboard/orders`, icon: ClipboardList },
  { title: 'Materials', href: `/dashboard/materials`, icon: Wrench },
  { title: 'Quotations', href: `/dashboard/quotations`, icon: FileText },
];

export const AdminMenuItems = [
  { title: 'Dashboard', href: `/dashboard`, icon: Home },
  { title: 'Suppliers', href: `/dashboard/suppliers`, icon: Warehouse },
  { title: 'Contractors', href: `/dashboard/contractors`, icon: Warehouse },
  { title: 'Orders', href: `/dashboard/orders`, icon: ClipboardList },
  { title: 'Employees', href: `/dashboard/employees`, icon: Users },
  { title: 'Revenue', href: `/dashboard/revenue`, icon: ChartNoAxesCombined },
  { title: 'Reports', href: `/dashboard/reports`, icon: FileText },
];

export const EmployeeMenuItems = [
  { title: 'Dashboard', href: `/dashboard`, icon: Home },
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