'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import QuotationPreview from "@/app/(dashboard)/supplier/[userId]/quotations/QuotationPreview";
import Header from "./Header";

const initialFormData = {
  contractorName: "",
  contractorEmail: "",
  contractorPhone: "",
  projectName: "",
  projectAddress: "",
  validUntil: "",
  items: [
    {
      id: 1,
      description: "",
      quantity: 1,
      unit: "",
      unitPrice: 0,
      total: 0
    }
  ],
  notes: "",
  terms: "Payment due within 30 days. 50% deposit required upon acceptance.",
  taxRate: 10
};

export default function QuotationForm() {
  const router = useRouter();
  const { quotationId: id } = useParams();
  const searchParams = useSearchParams();
  const [showPreview, setShowPreview] = useState(false);
 
  const requestId = searchParams.get('requestId')
  
  const [formData, setFormData] = useState(() => {
    // If editing existing quotation or creating from request, populate with dummy data
    if (id || requestId) {
      return {
        ...initialFormData,
        contractorName: "BuildCorp Ltd",
        contractorEmail: "procurement@buildcorp.com",
        contractorPhone: "+1 (555) 123-4567",
        projectName: "Downtown Office Complex",
        projectAddress: "123 Business District, Metro City",
        validUntil: "2024-02-16",
        items: [
          {
            id: 1,
            description: "High-grade concrete (40 MPa)",
            quantity: 500,
            unit: "cubic meters",
            unitPrice: 120,
            total: 60000
          },
          {
            id: 2,
            description: "Structural steel beams (Grade A)",
            quantity: 50,
            unit: "tons",
            unitPrice: 800,
            total: 40000
          }
        ]
      };
    }
    return initialFormData;
  });

  const isEditing = !!id;
  const isFromRequest = !!requestId;

  const updateItem = (itemId, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          // Recalculate total if quantity or unitPrice changed
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const addItem = () => {
    const newId = Math.max(...formData.items.map(item => item.id)) + 1;
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        id: newId,
        description: "",
        quantity: 1,
        unit: "",
        unitPrice: 0,
        total: 0
      }]
    }));
  };

  const removeItem = (itemId) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== itemId)
      }));
    }
  };

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (formData.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSaveAsDraft = () => {
    toast('Quotation saved as draft')
    router.push("/supplier/1/quotations");
  };

  const handlePreview = () => {
    // In a real app, you'd save the data first
    setShowPreview(true);
  };

  const getTitle = () => {
    if (isFromRequest) return "Create Quotation from Request";
    if (isEditing) return "Edit Quotation";
    return "Create New Quotation";
  };

  return (
    <>
        {!showPreview ? 
        <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/supplier/1/quotations")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quotations
            </Button>
            <Header title={getTitle()} description='Fill in the details to create your quotation'/>
            </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
            {/* Contractor Information */}
            <Card>
                <CardHeader>
                <CardTitle>Contractor Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <Label htmlFor="contractorName">Company Name</Label>
                    <Input
                        id="contractorName"
                        value={formData.contractorName}
                        onChange={(e) => setFormData(prev => ({ ...prev, contractorName: e.target.value }))}
                        placeholder="Enter contractor company name"
                    />
                    </div>
                    <div>
                    <Label htmlFor="contractorEmail">Email</Label>
                    <Input
                        id="contractorEmail"
                        type="email"
                        value={formData.contractorEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, contractorEmail: e.target.value }))}
                        placeholder="contractor@company.com"
                    />
                    </div>
                    <div>
                    <Label htmlFor="contractorPhone">Phone</Label>
                    <Input
                        id="contractorPhone"
                        value={formData.contractorPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, contractorPhone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                    />
                    </div>
                    <div>
                    <Label htmlFor="validUntil">Valid Until</Label>
                    <Input
                        id="validUntil"
                        type="date"
                        value={formData.validUntil}
                        onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                    />
                    </div>
                </div>
                </CardContent>
            </Card>

            {/* Project Information */}
            <Card>
                <CardHeader>
                <CardTitle>Project Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                    placeholder="Enter project name"
                    />
                </div>
                <div>
                    <Label htmlFor="projectAddress">Project Address</Label>
                    <Input
                    id="projectAddress"
                    value={formData.projectAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectAddress: e.target.value }))}
                    placeholder="Enter project address"
                    />
                </div>
                </CardContent>
            </Card>

            {/* Items */}
            <Card>
                <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Quotation Items</CardTitle>
                    <Button onClick={addItem} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                    </Button>
                </div>
                </CardHeader>
                <CardContent>
                <div className="space-y-4">
                    {formData.items.map((item, index) => (
                    <div key={item.id}>
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <div className="md:col-span-2">
                            <Label>Description</Label>
                            <Input
                            value={item.description}
                            onChange={(e) => updateItem(item.id, "description", e.target.value)}
                            placeholder="Item description"
                            />
                        </div>
                        <div>
                            <Label>Quantity</Label>
                            <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <Label>Unit</Label>
                            <Input
                            value={item.unit}
                            onChange={(e) => updateItem(item.id, "unit", e.target.value)}
                            placeholder="e.g., tons, m3"
                            />
                        </div>
                        <div>
                            <Label>Unit Price ($)</Label>
                            <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                            />
                        </div>
                        <div className="flex items-end gap-2">
                            <div className="flex-1">
                            <Label>Total ($)</Label>
                            <Input
                                value={item.total.toLocaleString()}
                                readOnly
                                className="bg-muted"
                            />
                            </div>
                            {formData.items.length > 1 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="mb-0"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            )}
                        </div>
                        </div>
                        {index < formData.items.length - 1 && <Separator className="my-4" />}
                    </div>
                    ))}
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
                    <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes for the contractor..."
                    className="min-h-[100px]"
                    />
                </CardContent>
                </Card>

                <Card>
                <CardHeader>
                    <CardTitle>Terms & Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                    value={formData.terms}
                    onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.value }))}
                    placeholder="Terms and conditions..."
                    className="min-h-[100px]"
                    />
                </CardContent>
                </Card>
            </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
            {/* Summary */}
            <Card>
                <CardHeader>
                <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>${calculateSubtotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tax:</span>
                    <div className="flex items-center gap-2">
                        <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={formData.taxRate}
                        onChange={(e) => setFormData(prev => ({ ...prev, taxRate: Number(e.target.value) }))}
                        className="w-16 h-6 text-xs"
                        />
                        <span className="text-xs">%</span>
                        <span>${calculateTax().toLocaleString()}</span>
                    </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${calculateTotal().toLocaleString()}</span>
                    </div>
                </div>
                </CardContent>
            </Card>

            {/* Actions */}
            <Card>
                <CardHeader>
                <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                <Button onClick={handlePreview} className="w-full">
                    Preview Quotation
                </Button>
                <Button onClick={handleSaveAsDraft} variant="outline" className="w-full">
                    Save as Draft
                </Button>
                </CardContent>
            </Card>
            </div>
        </div>
        </div>
        :
        <QuotationPreview onClose={()=>setShowPreview(false)}/>
        }
    </>
  );
}