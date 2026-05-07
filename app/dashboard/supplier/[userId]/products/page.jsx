'use client';

import { DataTable } from "@/components/custom/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productsColumns } from "@/TableColumns";
import { useProducts } from "@/hooks/(inventory)/useInventoryManagement";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import TableSkeleton from "@/components/custom/table-skeleton";

const renderProductDetails = (product) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><strong>Product Ref:</strong> {product.reference}</div>
          <div><strong>SKU:</strong> {product.sku}</div>
          <div><strong>Supplier:</strong> {product.company}</div>
          <div><strong>Branch:</strong> {product.branch}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Stock & Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><strong>Current Stock:</strong> {product.quantity}</div>
          <div><strong>Price:</strong> Ksh {Number(product.price).toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Product Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div><strong>Manufacturer:</strong> {product.specifications?.manufacturer}</div>
        <div><strong>Minimum order quantity:</strong> {product.specifications?.minimum_order_quantity}</div>
        <div><strong>Units of Measurement:</strong> {product.specifications?.units_of_measurement}</div>
        <div><strong>Description:</strong> {product.specifications?.description}</div>
        <div><strong>Dimensions:</strong> {product.specifications?.dimensions}</div>
      </CardContent>
    </Card>
  </div>
);

export default function Products() {
  const pathname = usePathname();
  const router = useRouter()
  const {data:products, isPending} = useProducts() 
  const handleRowAction = (action, row) => {
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
  if(isPending){
    return (
      <div className="pt-6">
        <div className="flex border-b pb-2 flex-col md:flex-row md:justify-between md:items-center">
            <h1 className="text-2xl font-semibold">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog across all branches.</p>
        </div>
            <TableSkeleton/>
      </div>
    )
  }

  return (
    <div className="py-6 space-y-6">
      <div className="flex border-b pb-2 flex-col md:flex-row md:justify-between md:items-center">
        <div>
        <h1 className="text-2xl font-semibold">Products</h1>
        <p className="text-muted-foreground">Manage your product catalog across all branches.</p>
    </div>
    <Button onClick={() => router.push(`${pathname}/create`)}>Add Product</Button>
      </div>      
      {products.length > 0 ? <DataTable
        data={products}
        columns={productsColumns}
        title="Product Inventory"
        searchPlaceholder="Search products..."
        onRowAction={handleRowAction}
        renderDetailView={renderProductDetails}
      /> 
      :
      <div className="flex flex-col items-center justify-center rounded-lg border p-12 text-center">
  {/* Icon Placeholder: Use a Lucide or Heroicon search/package icon here */}
  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
    <svg
      className="h-10 w-10 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  </div>

  <h3 className="mt-4 text-lg font-semibold text-gray-900">No inventory found</h3>
  <p className="mt-2 mb-6 max-w-xs text-sm text-gray-500">
    We couldn't find what you're looking for. Try adjusting your filters or adding a new item to your stock.
  </p>

  <div className="flex gap-3">
    <Button onClick={() => router.push(`${pathname}/create`)}>Add Product</Button>
  </div>
</div>
    }
    </div>
  );
}