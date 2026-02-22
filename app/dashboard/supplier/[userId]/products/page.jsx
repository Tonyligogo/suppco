'use client';

import Header from "@/components/custom/Header";
import { DataTable } from "@/components/custom/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productsData } from "@/MockData";
import { productsColumns } from "@/TableColumns";
import { useCreateInventory, useInventory } from "@/hooks/(inventory)/useInventoryManagement";
import DynamicDialog from "@/components/custom/dynamic-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InventoryTypes } from "@/data";
import { useCompanyInfo } from "@/hooks/(company)/useCompanyManagement";
import { usePathname, useRouter } from "next/navigation";
import { PaymentOptionForm } from "@/components/custom/paymentOptionForm";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inventoryTypes = InventoryTypes;
  const pathname = usePathname();
  const router = useRouter()
  const {mutate:createInventory} = useCreateInventory();
  const { data: companyInfo } = useCompanyInfo();
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
  const handleDataSubmit = (info) => {
    const data = {
      ...info,
      company: companyInfo?.name,
    }
    createInventory({data})
  }; 

  return (
    <div className="py-6 space-y-6">
      <Header title='Products & Inventory' description='Manage your product catalog and track inventory levels across all branches.'/>
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