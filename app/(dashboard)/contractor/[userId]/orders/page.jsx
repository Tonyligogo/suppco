'use client';
import { DataTable } from "@/components/custom/DataTable";
import Header from "@/components/custom/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ordersData } from "@/MockData";
import { ordersColumns } from "@/TableColumns";

const SupplierOrders = () => {
    const handleRowAction = (action, row) => {
        console.log(`Action: ${action}`, row);
        // Handle different actions here
      };
    
      return (
        <div className="space-y-6">
          <Header title='Orders Management' description='Track and manage all customer orders, payments, and deliveries.'/>
    
          <DataTable
            data={ordersData}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Order ID:</strong> {order.id}</div>
            <div><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</div>
            <div><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</div>
            <div><strong>Branch:</strong> {order.branch}</div>
            <div><strong>Total Items:</strong> {order.items}</div>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Customer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Name:</strong> {order.customerName}</div>
            <div><strong>Email:</strong> {order.customerEmail}</div>
            <div><strong>Shipping Address:</strong></div>
            <div className="text-sm text-muted-foreground ml-4">{order.shippingAddress}</div>
          </CardContent>
        </Card>
      </div>
  
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded">
                <div>
                  <div className="font-medium">{item.product}</div>
                  <div className="text-sm text-muted-foreground">Qty: {item.quantity} @ ${item.unitPrice}</div>
                </div>
                <div className="font-medium">${(item.quantity * item.unitPrice).toFixed(2)}</div>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>${order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );