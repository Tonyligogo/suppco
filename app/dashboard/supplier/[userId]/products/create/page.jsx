'use client';

import DynamicDialog from "@/components/custom/dynamic-dialog";
import LoadingComponent from "@/components/custom/loading-component";
import { PaymentOptionsSelector } from "@/components/custom/payment-option-selector";
import { PaymentOptionForm } from "@/components/custom/paymentOptionForm";
import { ProductSpecificFields } from "@/components/custom/productSpecificFields";
import { resolveProductFields } from "@/components/custom/resolveProductFields";
import { validateProductFields } from "@/components/custom/validateProductFields";
import { Button } from "@/components/ui/button";
import { useCreateLayer, useCreateProduct, useCreateSubLayer, useCreateSubLayerItem, useInventory, useLayers } from "@/hooks/(inventory)/useInventoryManagement";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { StepIndicator } from "./components/step-indicator";
import { ClassificationStep } from "./components/classification-selector";

  const STEPS = [
  { number: 1, label: "Classification" },
  { number: 2, label: "Details" },
  { number: 3, label: "Payment" },
];

export default function CreateProductPage() {
  const [classification, setClassification] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [dialogType, setDialogType] = useState(null);
  const [confirmed, setConfirmed] = useState(false)
  const {data:inventories} = useInventory();
  const {data:layers} = useLayers()
  
  const {mutate: createProduct, isPending:isCreatingProduct} = useCreateProduct();
  const inventoryOptions = inventories?.map((inv)=>{
    return {
      label:inv.name,
      value:inv.inventory_code
    }
  })
  const layerOptions = layers?.map((layer)=>{
    return {
      label:layer.name,
      value:layer.reference
    }
  }) || [];

  const selectedLayer = layers?.find((layer) => layer.name === classification.layer)
  const selectedSubLayer = selectedLayer?.sublayers?.find((sublayer) => sublayer.name === classification.sublayer)

const sublayerOptions = selectedLayer?.sublayers?.map((sublayer) => ({
  label: sublayer.name,
  value: sublayer.reference,
})) ?? []
const sublayerItemOptions = selectedSubLayer?.sublayeritems?.map((item) => ({
  label: item.name,
  value: item.reference,
})) ?? []

const {mutate:createLayer} = useCreateLayer();
const {mutate:createSublayer} = useCreateSubLayer();
const {mutate:createSublayerItem} = useCreateSubLayerItem();
  const resolvedFields = useMemo(() => {
    if (!confirmed) return [];
    if (!classification.layer) return [];
    return resolveProductFields(classification);
  }, [confirmed, classification]);

  const handleSubmit = async () => {
    const validation = validateProductFields({
      fields: resolvedFields,
      data: formData
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
const layer = layers?.find(
  l => l.name === classification.layer
);

const sublayer = layer?.sublayers?.find(
  s => s.name === classification.sublayer
);

const sublayerItem = sublayer?.sublayeritems?.find(
  i => i.name === classification.item
);

const sublayerItemReference = sublayerItem?.reference;    
const {
  product_name,
  payment_options,
  price,
  source_location,
  image,
  ...specifications
} = formData;

const data = new FormData();

data.append("sublayeritem", sublayerItemReference);
data.append("product_name", product_name);
data.append("payment_options", payment_options);
data.append("price", price);
data.append("source_location", source_location);

// objects must be stringified
data.append("specifications", JSON.stringify(specifications));
// ✅ append the file itself
if (image) {
  data.append("image", image);
}
createProduct({data});
  };

    const dialogConfig = {
    layer: {
      title: "Create Layer",
      fields: [
   { 
      name: "name", 
      label: "Layer", 
      type: "text", 
      required:true,
      placeholder: "e.g. Aggregate"
    },
    { 
      name: "inventory", 
      label: "Inventory", 
      type: "select", 
      required:true,
      placeholder: "Select an inventory",
      options:inventoryOptions
    }
      ],
      onSubmit: data => createLayer({ data })
    },
    sublayer: {
      title: "Create Sublayer",
      fields: [
  {
    name: "name",
    label: "Sublayer name",
    type: "text",
    required: true,
    placeholder: "e.g. Sand"
  },
  {
    name: "layer",
    label: "Parent layer",
    type: "select",
    required: true,
    placeholder:'Select layer',
    options: layerOptions
  }
      ],
      onSubmit: data =>createSublayer({data})
    },
    item: {
      title: "Create Item",
      fields: [
        {
    name: "name",
    label: "Item name",
    type: "text",
    required: true,
    placeholder: "e.g. River sand"
  },
  {
    name: "sublayer",
    label: "Parent sublayer",
    type: "select",
    required: true,
    placeholder:'Select a sublayer',
    options:sublayerOptions
  }
      ],
      onSubmit: data => createSublayerItem({data})
    }
  };

  return (
      <div className="h-svh overflow-y-auto">
      <div className="px-4 sm:px-6 py-6 space-y-6">
        {/* Classification Section */}
        <header className="border-b border-border bg-card">
        <div className="pb-4 flex items-center gap-3">
          <button
            onClick={() => currentStep > 1 && setCurrentStep((s) => s - 1)}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Create Product</h1>
            <p className="text-xs text-muted-foreground">
              Step {currentStep} of {STEPS.length}
            </p>
          </div>
        </div>
      </header>
        <div  className="max-w-3xl mx-auto px-4 py-8">
        <StepIndicator steps={STEPS} currentStep={currentStep} />
                <div className="bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-10">
          {currentStep === 1 && (
            <ClassificationStep
              classification={classification}
              onChange={update => {
                setClassification(update);
              }}
              onContinue={() => {
                setCurrentStep(2)
                setConfirmed(true);
              }}
              onOpenDialog={setDialogType}
              layerOptions={layerOptions}
              sublayerOptions={sublayerOptions}
              itemOptions={sublayerItemOptions}
            />
          )}
          {currentStep === 2 && (
            <>
              <ProductSpecificFields
                fields={resolvedFields}
                value={formData}
                errors={errors}
                onChange={setFormData}
              />
                <div className="flex justify-between gap-3 pt-8">
        <Button variant="outline" onClick={()=>setCurrentStep(1)} className="px-6 h-11 gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <Button onClick={()=>setCurrentStep(3)} className="px-8 h-11 font-semibold gap-2">
          Continue
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <PaymentOptionsSelector
                value={formData.payment_options}
                onChange={(options) =>
                  setFormData(prev => ({
                    ...prev,
                    payment_options: options,
                  }))
                }
              />
              <div className="flex justify-between items-center gap-3 pt-8 border-t mt-8">
                <PaymentOptionForm/>
              <Button onClick={handleSubmit} disabled={isCreatingProduct}>
                {isCreatingProduct ? <LoadingComponent/> : 'Create Product'}
              </Button>
            </div>
            </>
          )}
        </div>
        </div>

        {/* Dynamic Dialog */}
        {dialogType && (
          <DynamicDialog
            isOpen
            onOpenChange={() => setDialogType(null)}
            title={dialogConfig[dialogType].title}
            fields={dialogConfig[dialogType].fields}
            onSubmit={dialogConfig[dialogType].onSubmit}
            submitText="Create"
          />
        )}
      </div>
    </div>
  );
}
