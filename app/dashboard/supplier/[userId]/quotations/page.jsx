'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/custom/DataTable";
import { useRouter } from "next/navigation";
import { quotations } from "@/MockData";
import { quotationColumns } from "@/TableColumns";
import QuotationPreview from "./QuotationPreview";
import Header from "@/components/custom/Header";
const Quotations = () => {
    const router = useRouter();
    const [showRequests, setShowRequests] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
  
    const filteredData = showRequests 
      ? quotations.filter(item => item.type === "request")
      : quotations;
  
    const handleRowAction = (action, row) => {
      switch (action) {
        case "view":
          setShowPreview(true);
          break;
        case "edit":
          router.push(`/supplier/1/quotations/edit/${row.id}`);
          break;
        case "create_quote":
          router.push(`/supplier/1/quotations/create?requestId=${row.id}`);
          break;
        case "duplicate":
          console.log("Duplicate quotation:", row.id);
          break;
        case "delete":
          console.log("Delete quotation:", row.id);
          break;
      }
    };
  
    const getRowActions = (row) => {
      const baseActions = [
        { label: "View Details", value: "view" },
      ];
  
      if (row.type === "request") {
        return [
          ...baseActions,
          { label: "Create Quotation", value: "create_quote" },
        ];
      }
  
      return [
        ...baseActions,
        { label: "Edit", value: "edit" },
        { label: "Duplicate", value: "duplicate" },
        { label: "Delete", value: "delete", variant: "destructive" },
      ];
    };
  return (
    <>
    {!showPreview ? 
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Header 
          title={showRequests ? "Quote Requests" : "Quotations"} 
          description={showRequests 
            ? "Manage incoming quote requests from contractors"
            : "Manage your quotations and track their status"
          } 
        />
        
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="show-requests"
              checked={showRequests}
              onCheckedChange={setShowRequests}
            />
            <Label htmlFor="show-requests" className="text-sm">
              Show Requests
            </Label>
          </div>
          
          {!showRequests && (
            <Button onClick={() => router.push("/supplier/1/quotations/create")}>
              <Plus className="h-4 w-4 mr-2" />
              New Quotation
            </Button>
          )}
        </div>
      </div>

      <DataTable
        data={filteredData}
        columns={quotationColumns}
        title={showRequests ? "Quote Requests" : "Quotations"}
        onRowAction={handleRowAction}
        getRowActions={getRowActions}
        renderDetailView={renderDetailView}
      />
    </div>
    :
    <QuotationPreview onClose={()=>setShowPreview(false)}/>
    }
    </>
  )
}

export default Quotations

const renderDetailView = (row) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-foreground">Contractor Details</h4>
          <p className="text-sm text-muted-foreground">{row.contractorName}</p>
        </div>
        <div>
          <h4 className="font-medium text-foreground">Project</h4>
          <p className="text-sm text-muted-foreground">{row.projectName}</p>
        </div>
        <div className="md:col-span-2">
          <h4 className="font-medium text-foreground">Requested Items</h4>
          <p className="text-sm text-muted-foreground">{row.items}</p>
        </div>
        {row.totalAmount && (
          <div>
            <h4 className="font-medium text-foreground">Total Amount</h4>
            <p className="text-sm text-muted-foreground">${row.totalAmount.toLocaleString()}</p>
          </div>
        )}
        <div>
          <h4 className="font-medium text-foreground">Valid Until</h4>
          <p className="text-sm text-muted-foreground">{row.validUntil || "N/A"}</p>
        </div>
      </div>
    </div>
  );