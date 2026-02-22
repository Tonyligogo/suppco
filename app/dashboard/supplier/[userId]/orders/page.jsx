'use client';
import { DataTable } from "@/components/custom/DataTable";
import Header from "@/components/custom/Header";
import TableSkeleton from "@/components/custom/table-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSupplierOrders } from "@/hooks/(payments)/usePaymentManagement";
import { ordersData } from "@/MockData";
import { ordersColumns } from "@/TableColumns";

const SupplierOrders = () => {
  const {data:orders, isPending, isError} = useSupplierOrders()
    const handleRowAction = (action, row) => {
        console.log(`Action: ${action}`, row);
        // Handle different actions here
      };
      if(isPending){
        return(
          <div className="pt-6">
                <Header title='Orders' description='Track and manage all customer orders, payments, and deliveries.'/>
                <TableSkeleton/>
          </div>
        )
      }
    
      return (
        <div className="space-y-6 pt-6">
          <Header title='Orders' description='Track and manage all customer orders, payments, and deliveries.'/>
    
          <DataTable
            data={orders}
            columns={ordersColumns}
            title="Customer Orders"
            searchPlaceholder="Search orders..."
            onRowAction={handleRowAction}
            renderDetailView={renderOrderDetails}
          />
        </div>
      );
}

export default SupplierOrders

const renderOrderDetails = (order) => (
    <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Order Ref:</strong> {order.reference}</div>
            <div><strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}</div>
            <div><strong>Total Items:</strong> {order.items.length}</div>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Customer Details</CardTitle>
          </CardHeader>
          {/* <CardContent className="space-y-2">
            <div><strong>Name:</strong> {order.customerName}</div>
            <div><strong>Email:</strong> {order.customerEmail}</div>
            <div><strong>Shipping Address:</strong></div>
            <div className="text-sm text-muted-foreground ml-4">{order.shippingAddress}</div>
          </CardContent> */}
        </Card>
  
      <Card>
        <CardHeader className="">
          <CardTitle className="text-lg">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.reference} className="flex justify-between items-center p-3 bg-muted/30 rounded">
                <div>
                  <div className="font-medium">{item.product_name}</div>
                  <div className="text-sm text-muted-foreground">Qty: {item.quantity} @ Ksh {item.price_at_purchase}</div>
                </div>
                <div className="font-medium">Ksh {(Number(item.quantity) * Number(item.price_at_purchase)).toFixed(2)}</div>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>Ksh {order.total_amount}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );