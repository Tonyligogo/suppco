'use client';

import Header from "@/components/custom/Header";
import { DataTable } from "@/components/custom/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productsData } from "@/MockData";
import { productsColumns } from "@/TableColumns";
import { useCreateInventory, useInventory, useProducts } from "@/hooks/(inventory)/useInventoryManagement";
import DynamicDialog from "@/components/custom/dynamic-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InventoryTypes } from "@/data";
import { useCompanyInfo } from "@/hooks/(company)/useCompanyManagement";
import { usePathname, useRouter } from "next/navigation";
import { PaymentOptionForm } from "@/components/custom/paymentOptionForm";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inventoryTypes = InventoryTypes;
  const pathname = usePathname();
  const router = useRouter()
  const {mutate:createInventory} = useCreateInventory();
  const { data: companyInfo } = useCompanyInfo();
  const {data:products, isPending} = useProducts()
  const options = inventoryTypes.map((type)=>{
    return {
      label:type,
      value:type
    }
  })
  const inventoryFields = [
    { 
      name: "name", 
      label: "Inventory type", 
      type: "select", 
      required:true,
      placeholder: "Select a type",
      options
    },
  ];
  const {data:inventories} = useInventory()
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
  const handleDataSubmit = (info) => {
    const data = {
      ...info,
      company: companyInfo?.name,
    }
    createInventory({data})
  }; 
  if(isPending){
    return (
      <div className="pt-6">
            <Header title='Products & Inventory' description='Manage your product catalog and track inventory levels across all branches.'/>
            <TableSkeleton/>
      </div>
    )
  }

  return (
    <div className="py-6 space-y-6">
      <Header title='Products' description='Manage your product catalog and track inventory levels across all branches.'/>
      <div className="flex w-full gap-5 flex-col md:flex-row">
        <div className="flex-1 border rounded-lg p-6">
          <div className="flex items-center gap-5 justify-between">
          <p className="text-muted-foreground text-lg">Inventory</p>
          <Button onClick={() => setIsModalOpen(true)}>Add Inventory</Button>
          </div>
          <p className="text-xl font-bold">
            {inventories?.length ?? null}
          </p>
        </div>
      </div>
      <Button onClick={() => router.push(`${pathname}/create`)}>Add Product</Button>
      <PaymentOptionForm/>
      <DynamicDialog
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Create Inventory"
        description="Fill in the details below to create a new inventory."
        fields={inventoryFields}
        onSubmit={handleDataSubmit}
        submitText="Create Inventory"
      />
      <DataTable
        data={products}
        columns={productsColumns}
        title="Product Inventory"
        searchPlaceholder="Search products..."
        onRowAction={handleRowAction}
        renderDetailView={renderProductDetails}
      />
    </div>
  );
}