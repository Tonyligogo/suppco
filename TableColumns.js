import { CheckCircle, Clock, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { getInitials } from "./lib/utils";

// orders table columns
export const ordersColumns = [
    {
      key: "id",
      label: "Order ID",
      sortable: true,
      filterable: true,
      filterType: "text",
    },
    {
      key: "customerName",
      label: "Customer",
      sortable: true,
      filterable: true,
      filterType: "text",
    },
    {
      key: "orderDate",
      label: "Order Date",
      sortable: true,
      filterable: true,
      filterType: "date",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "deliveryDate", 
      label: "Delivery Date",
      sortable: true,
      filterable: true,
      filterType: "date",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      filterable: true,
      filterType: "text",
      render: (value) => {
        const variants = {
          pending: "secondary",
          shipped: "default", 
          completed: "default",
          cancelled: "destructive",
        };
        return <Badge variant={variants[value]} className='py-1 rounded-xl text-white'>{value}</Badge>;
      },
    },
    {
      key: "paymentStatus",
      label: "Payment",
      sortable: true,
      filterable: true,
      filterType: "text",
      render: (value) => {
        const variants = {
          paid: "default",
          pending: "secondary",
          refunded: "outline",
        };
        return <Badge variant={variants[value]} className='py-1 rounded-xl text-white'>{value}</Badge>;
      },
    },
    {
      key: "total",
      label: "Total",
      sortable: true,
      filterable: true,
      filterType: "number",
      render: (value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
  ];

// products table columns
export const productsColumns = [
    {
      key: "id",
      label: "Product ID",
      sortable: true,
      filterable: true,
      filterType: "text",
    },
    {
      key: "name", 
      label: "Product Name",
      sortable: true,
      filterable: true,
      filterType: "text",
    },
    {
      key: "category",
      label: "Category", 
      sortable: true,
      filterable: true,
      filterType: "text",
      render: (value) => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: "stock",
      label: "Stock Level",
      sortable: true,
      filterable: true,
      filterType: "number",
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      filterable: true,
      filterType: "number",
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      filterable: true,
      filterType: "text",
      render: (value) => {
        const variants = {
          active: "default",
          low_stock: "secondary", 
          no_stock: "destructive",
        };
        return <Badge variant={variants[value]} className='py-1 rounded-xl text-white'>{value.replace('_', ' ')}</Badge>;
      },
    },
  ]; 
  
export const oldBranchesColumns = [
    {
      key: "id",
      label: "Branch ID",
      sortable: true,
      filterable: true,
      filterType: "text",
    },
    {
      key: "name",
      label: "Branch Name", 
      sortable: true,
      filterable: true,
      filterType: "text",
    },
    {
      key: "manager",
      label: "Manager",
      sortable: true,
      filterable: true,
      filterType: "text",
    },
    {
      key: "employees",
      label: "Employees",
      sortable: true,
      render: (value) => `${value} staff`,
    },
    {
      key: "monthlyRevenue",
      label: "Monthly Revenue",
      sortable: true,
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      filterable: true,
      render: (value) => {
        const variants= {
          active: "default",
          maintenance: "secondary", 
          closed: "destructive",
        };
        return <Badge variant={variants[value]} className='py-1 rounded-xl text-white'>{value}</Badge>;
      },
    },
  ];

  export const branchesColumns = [
    {
      key: "name",
      label: "Branch Name", 
      sortable: true,
      filterable: true,
      filterType: "text",
    },
    {
      key: "address",
      label: "Address", 
      sortable: true,
      filterable: true,
      filterType: "text",
    }
  ];

export  const employeeColumns = [
    {
      key: "name",
      label: "Employee",
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={row.avatarUrl} alt={value} />
            <AvatarFallback 
              className="font-semibold bg-slate-100"
            >
              {getInitials(value)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">{row.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      filterable: true,
    },
    {
      key: "phone",
      label: "Phone",
      sortable: true,
      filterable: true,
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      filterable: true,
      render: (value) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    {
      key: "branch",
      label: "Branch",
      sortable: true,
      filterable: true,
    },
  ];  

export const quotationColumns = [
    { key: "id", label: "Quote/Request ID", sortable: true, filterable: true },
    { key: "contractorName", label: "Contractor", sortable: true, filterable: true },
    { key: "projectName", label: "Project", sortable: true, filterable: true },
    { key: "items", label: "Items", filterable: true },
    { 
      key: "totalAmount", 
      label: "Amount", 
      sortable: true, 
      filterable: true,
      filterType: "number",
      render: (value) => value ? `$${value.toLocaleString()}` : "Pending"
    },
    { 
      key: "status", 
      label: "Status", 
      sortable: true, 
      filterable: true,
      render: (value) => {
        const statusConfig = {
          sent: { icon: CheckCircle, color: "text-success", label: "Sent" },
          draft: { icon: FileText, color: "text-warning", label: "Draft" },
          pending_quote: { icon: Clock, color: "text-muted-foreground", label: "Pending Quote" }
        };
        const config = statusConfig[value];
        const Icon = config.icon;
        return (
          <div className="flex items-center gap-2">
            <Icon className={`h-4 w-4 ${config.color}`} />
            <span className={config.color}>{config.label}</span>
          </div>
        );
      }
    },
    { key: "createdDate", label: "Created", sortable: true, filterable: true },
    { key: "validUntil", label: "Valid Until", sortable: true, filterable: true, render: (value) => value || "N/A" }
  ];