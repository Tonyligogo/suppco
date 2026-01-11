'use client';

import { ClassificationSelector } from "@/components/custom/classification-selector";
import DynamicDialog from "@/components/custom/dynamic-dialog";
import LoadingComponent from "@/components/custom/loading-component";
import { ProductSpecificFields } from "@/components/custom/productSpecificFields";
import { resolveProductFields } from "@/components/custom/resolveProductFields";
import { validateProductFields } from "@/components/custom/validateProductFields";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Layers, SandSublayerItems, Sublayers } from "@/data";
import { useCreateLayer, useCreateProduct, useCreateSubLayer, useCreateSubLayerItem, useInventory, useLayers } from "@/hooks/(inventory)/useInventoryManagement";
import { useMemo, useState } from "react";

const layersList = Layers.map((layer)=>{
    return {
      label:layer,
      value:layer
    }
  })

const sublayersList = Sublayers.map((sublayer)=>{
    return {
      label:sublayer,
      value:sublayer
    }
  })

  const itemsList = SandSublayerItems.map((item)=>{
    return {
      label:item,
      value:item
    }
  })

export default function CreateProductPage() {
  const [classification, setClassification] = useState({});
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
  })

  const sublayerOptions = layers && layers[0]?.sublayers?.map((sublayer)=>{
    return {
      label:sublayer.name,
      value:sublayer.reference
    }
  })

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
      console.log(validation.errors)
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
const { product_name, ...specifications } = formData;

const data = {
  sublayeritem: sublayerItemReference,
  product_name,
  specifications
};

    createProduct({data})
  };

    const dialogConfig = {
    layer: {
      title: "Create Layer",
      fields: [
   { 
      name: "name", 
      label: "Layer", 
      type: "select", 
      required:true,
      placeholder: "Select a layer",
      options:layersList
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
    type: "select",
    required: true,
    placeholder: "Select a sublayer",
    options:sublayersList
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
    type: "select",
    required: true,
    placeholder: "Select an item",
    options:itemsList
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Classification Section */}
        <div className="border border-muted rounded-lg p-4 sm:p-6 space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">
            Product Classification
          </h2>

          <ClassificationSelector
            value={classification}
            onChange={update => {
              setClassification(update);
              setConfirmed(false);
            }}
          />

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDialogType("layer")}
            >
              Create Layer
            </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setDialogType("sublayer")}
              >
                Create Sublayer
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDialogType("item")}
              >
                Create Item
              </Button>
          </div>

          <Button
            disabled={!classification.layer}
            onClick={() => setConfirmed(true)}
          >
            Continue to Product Details
          </Button>
        </div>

        {/* Product Details Section */}
        {confirmed && resolvedFields.length > 0 && (
          <div className="border border-muted rounded-lg p-4 sm:p-6 space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold">
              Product Details
            </h2>

            <ProductSpecificFields
              fields={resolvedFields}
              value={formData}
              errors={errors}
              onChange={setFormData}
            />

            <div className="flex justify-end">
              <Button onClick={handleSubmit} disabled={isCreatingProduct}>
                {isCreatingProduct ? <LoadingComponent/> : 'Create Product'}
              </Button>
            </div>
          </div>
        )}

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
