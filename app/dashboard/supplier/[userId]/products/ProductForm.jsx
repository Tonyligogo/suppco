"use client"

import React, { useState } from "react"
import { Pencil, Save, X, Package, MapPin, CreditCard, Settings2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PaymentOptionForm } from "@/components/custom/paymentOptionForm"

const ProductForm = ({ data, isEditingInitially = false }) => {
  const [isEditing, setIsEditing] = useState(isEditingInitially)

  const handleSave = () => {
    // Add your API update logic here
    setIsEditing(false)
  }

  const humanize = (str) => {
    return str
      .replace(/^[-_]+|[-_]+$/g, "")
      .replace(/[_-]+/g, " ")
      .replace(/[A-Z]/g, " $&")
      .replace(/^./, (s) => s.toUpperCase())
      .trim()
  }

  const handleSpecChange = (key, value) => {
    setData({
      ...data,
      specifications: {
        ...data.specifications,
        [key]: value,
      },
    })
  }

  const DetailItem = ({ label, value, name, type = "text" }) => (
    <div className="space-y-1">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      {isEditing ? (
        <Input 
          value={value || ""} 
          onChange={(e) => setData({...data, [name]: e.target.value})}
          className="max-w-md"
        />
      ) : (
        <p className="text-sm font-semibold">{value || "—"}</p>
      )}
    </div>
  )

  return (
    <div className="space-y-6 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{data.product_name}</h1>
            <Badge variant="outline" className="ml-2">{data.sku}</Badge>
          </div>
          <p className="text-muted-foreground">Reference: {data.reference}</p>
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Pencil className="w-4 h-4 mr-2" /> Edit Product
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="w-5 h-5" /> General Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Product Name" value={data.product_name} name="product_name" />
              <DetailItem label="SKU" value={data.sku} name="sku" />
              <DetailItem label="Price" value={`${data.price} KES`} name="price" />
              <DetailItem label="Quantity" value={data.quantity} name="quantity" />
              <DetailItem label="Source Location" value={data.source_location} name="source_location" />
            </CardContent>
          </Card>
          <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings2 className="w-5 h-5" /> Technical Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {Object.entries(data.specifications).map(([key, value]) => (
              <div key={key} className="space-y-1 border-b pb-2 md:border-none">
                <p className="text-sm font-medium text-muted-foreground">
                  {humanize(key)}
                </p>
                
                {isEditing ? (
                  <Input
                    value={value || ""}
                    onChange={(e) => handleSpecChange(key, e.target.value)}
                    className="h-8"
                  />
                ) : (
                  <p className="text-sm font-semibold">
                    {typeof value === "boolean" ? (value ? "Yes" : "No") : (value || "—")}
                  </p>
                )}
              </div>
            ))}
          </div>
          {Object.keys(data.specifications).length === 0 && (
            <p className="text-sm text-muted-foreground italic text-center py-4">
              No technical specifications provided for this product.
            </p>
          )}
        </CardContent>
      </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <CardContent>
              <div className="aspect-square relative rounded-lg overflow-hidden border bg-muted">
                <img 
                  src={data.image} 
                  alt={data.product_name} 
                  className="object-cover w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Payment Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.payment_options_details.map((opt, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/50 border rounded-md">
                    <div className="text-sm">
                        <p className="font-bold">{opt.name}</p>
                        <p className="text-xs text-muted-foreground">{opt.description}</p>
                        <div className="mt-2 bg-primary text-white rounded-full w-fit px-3 py-1 text-xs">
                            <span>Type: {opt.payment_type}</span>
                        </div>
                    </div>                    
                    <PaymentOptionForm initialData={opt} productRef={data.reference} />
                    </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProductForm