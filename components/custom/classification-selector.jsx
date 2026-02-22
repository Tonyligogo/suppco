"use client";

import { useLayers } from "@/hooks/(inventory)/useInventoryManagement";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { useMemo } from "react";

export function ClassificationSelector({ value = {}, onChange }) {
  const { data: layers = [] } = useLayers();

  const selectedLayer = useMemo(
    () => layers.find(l => l.name === value.layer),
    [layers, value.layer]
  );

  const sublayers = selectedLayer?.sublayers ?? [];

  const selectedSublayer = useMemo(
    () => sublayers.find(s => s.name === value.sublayer),
    [sublayers, value.sublayer]
  );

  const items = selectedSublayer?.sublayeritems ?? [];

  return (
    <div className="space-y-4">
      {/* Layer */}
      <Select
        value={value.layer}
        onValueChange={name =>
          onChange(prev => ({
            ...prev,
            layer: name,
            sublayer: undefined,
            item: undefined
          }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select layer" />
        </SelectTrigger>
        <SelectContent>
          {layers.map(layer => (
            <SelectItem key={layer.reference} value={layer.name}>
              {layer.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sublayer */}
      {sublayers.length > 0 && (
        <Select
          value={value.sublayer}
          onValueChange={name =>
            onChange(prev => ({
              ...prev,
              sublayer: name,
              item: undefined
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select sublayer" />
          </SelectTrigger>
          <SelectContent>
            {sublayers.map(sublayer => (
              <SelectItem
                key={sublayer.reference}
                value={sublayer.name}
              >
                {sublayer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Item */}
      {items.length > 0 && (
        <Select
          value={value.item}
          onValueChange={name =>
            onChange(prev => ({
              ...prev,
              item: name
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select item" />
          </SelectTrigger>
          <SelectContent>
            {items.map(item => (
              <SelectItem key={item.reference} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

    </div>
  );
}
