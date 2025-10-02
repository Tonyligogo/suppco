'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Edit, Send, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { quotationData } from "@/MockData";
import toast from "react-hot-toast";

export default function QuotationPreview({onClose}) {
  const { quotationId:id } = useParams();
  const router = useRouter();
  const [quotation] = useState(quotationData);

  const handleSendQuotation = () => {
    toast.success('Quotation sent')
    // Update status to sent
    router.push("/supplier/1/quotations");
  };

  const handleEditQuotation = () => {
    router.push(`/supplier/1/quotations/edit/${id}`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { label: "Draft", variant: "secondary" },
      sent: { label: "Sent", variant: "default"},
      accepted: { label: "Accepted", variant: "default" },
      rejected: { label: "Rejected", variant: "destructive" }
    };
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
        <div className="flex items-center justify-between gap-5 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Quotation {quotation.id}</h1>
            <p className="text-muted-foreground">Preview and manage your quotation</p>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X/>
            Close Preview
          </Button>
        </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleEditQuotation} variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button onClick={handleSendQuotation} disabled={quotation.status === "sent"}>
          <Send className="h-4 w-4 mr-2" />
          {quotation.status === "sent" ? "Already Sent" : "Send Quotation"}
        </Button>
      </div>

      {/* Quotation Content */}
        <div className="space-y-4">
          {/* Project Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contractor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-foreground">Company</h4>
                <p className="text-sm text-muted-foreground">{quotation.contractorName}</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Email</h4>
                <p className="text-sm text-muted-foreground">{quotation.contractorEmail}</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Phone</h4>
                <p className="text-sm text-muted-foreground">{quotation.contractorPhone}</p>
              </div>
              </div>
            </CardContent>
          </Card>
          {/* Project Information */}
          <Card>
            <CardHeader>
              <CardTitle>Quotation Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-foreground">Created Date</h4>
                <p className="text-sm text-muted-foreground">{quotation.createdDate}</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Valid Until</h4>
                <p className="text-sm text-muted-foreground">{quotation.validUntil}</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Status</h4>
                <div className="mt-1">
                  {getStatusBadge(quotation.status)}
                </div>
              </div>
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle>Quoted Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quotation.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-4">
                      <div className="md:col-span-2">
                        <h4 className="font-medium text-foreground">{item.description}</h4>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-medium">{item.quantity} {item.unit}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Unit Price</p>
                        <p className="font-medium">${item.unitPrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-medium">${item.total.toLocaleString()}</p>
                      </div>
                    </div>
                    {index < quotation.items.length - 1 && <Separator />}
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>${quotation.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (10%):</span>
                  <span>${quotation.tax.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${quotation.total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes and Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{quotation.notes}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{quotation.terms}</p>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
}