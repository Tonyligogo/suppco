'use client';

import Header from "@/components/custom/Header";
import { DataTable } from "@/components/custom/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productsData } from "@/MockData";
import { productsColumns } from "@/TableColumns";

const renderProductDetails = (product) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><strong>Product ID:</strong> {product.id}</div>
          <div><strong>SKU:</strong> {product.sku}</div>
          <div><strong>Category:</strong> {product.category}</div>
          <div><strong>Supplier:</strong> {product.supplier}</div>
          <div><strong>Branch:</strong> {product.branch}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Stock & Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><strong>Current Stock:</strong> {product.stock} units</div>
          <div><strong>Low Stock Alert:</strong> {product.lowStockThreshold} units</div>
          <div><strong>Price:</strong> ${product.price.toFixed(2)}</div>
          <div><strong>Last Restocked:</strong> {product.lastRestocked}</div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Product Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div><strong>Description:</strong> {product.description}</div>
        <div><strong>Dimensions:</strong> {product.dimensions}</div>
        <div><strong>Weight:</strong> {product.weight}</div>
      </CardContent>
    </Card>
  </div>
);

export default function Products() {
  const handleRowAction = (action, row) => {
    console.log(`Action: ${action}`, row);
    // Handle different actions here
    switch (action) {
      case "edit":
        // Open edit dialog
        break;
      case "delete":
        // Confirm and delete
        break;
      case "export":
        // Export product data
        break;
    }
  };

  return (
    <div className="space-y-6">
      <Header title='Products & Inventory' description='Manage your product catalog and track inventory levels across all branches.'/>

      <DataTable
        data={productsData}
        columns={productsColumns}
        title="Product Inventory"
        searchPlaceholder="Search products..."
        onRowAction={handleRowAction}
        renderDetailView={renderProductDetails}
      />
    </div>
  );
}