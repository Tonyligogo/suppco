import { Layers, ChevronRight, Plus, FolderTree, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ClassificationStep({
  classification,
  onChange,
  onContinue,
  onOpenDialog,
  layerOptions,
  sublayerOptions,
  itemOptions,
}) {
  const canContinue =
    classification.layer && classification.sublayer && classification.item;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-2">
          <FolderTree className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Classify Your Product
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Select the category hierarchy for your product. This determines what fields will be available.
        </p>
      </div>

      <div className="grid gap-5 max-w-lg mx-auto">
        {/* Layer */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Layers className="w-4 h-4 text-muted-foreground" />
            Layer
          </label>
          <div className="flex gap-2">
            <Select
              value={classification.layer || ""}
              onValueChange={(val) =>
                onChange({ ...classification, layer: val, sublayer: undefined, item: undefined })
              }
            >
              <SelectTrigger className="flex-1 bg-surface-elevated border-border h-11">
                <SelectValue placeholder="Select a layer..." />
              </SelectTrigger>
              <SelectContent>
                {layerOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 shrink-0"
              onClick={() => onOpenDialog("layer")}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Sublayer */}
        <div
          className={`space-y-2 transition-opacity duration-300 ${
            classification.layer ? "opacity-100" : "opacity-40"
          }`}
        >
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            Sublayer
          </label>
          <div className="flex gap-2">
            <Select
              value={classification.sublayer || ""}
              onValueChange={(val) =>
                onChange({ ...classification, sublayer: val, item: undefined })
              }
              disabled={!classification.layer}
            >
              <SelectTrigger className="flex-1 bg-surface-elevated border-border h-11">
                <SelectValue placeholder="Select a sublayer..." />
              </SelectTrigger>
              <SelectContent>
                {sublayerOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 shrink-0"
              onClick={() => onOpenDialog("sublayer")}
              disabled={!classification.layer}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Item */}
        <div
          className={`space-y-2 transition-opacity duration-300 ${
            classification.sublayer ? "opacity-100" : "opacity-40"
          }`}
        >
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Box className="w-4 h-4 text-muted-foreground" />
            Item
          </label>
          <div className="flex gap-2">
            <Select
              value={classification.item || ""}
              onValueChange={(val) =>
                onChange({ ...classification, item: val })
              }
              disabled={!classification.sublayer}
            >
              <SelectTrigger className="flex-1 bg-surface-elevated border-border h-11">
                <SelectValue placeholder="Select an item..." />
              </SelectTrigger>
              <SelectContent>
                {itemOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 shrink-0"
              onClick={() => onOpenDialog("item")}
              disabled={!classification.sublayer}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <Button
          onClick={onContinue}
          disabled={!canContinue}
          className="px-8 h-11 text-sm font-semibold gap-2"
        >
          Continue
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
