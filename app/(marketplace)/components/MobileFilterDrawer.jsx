import { useMemo } from 'react';
import { X, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';

export function MobileFilterDrawer({
  open,
  onOpenChange,
  products,
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
}) {
  // Extract unique values for filters
  const filterOptions = useMemo(() => {
    const companies = new Set();
    const conditions = new Set();
    const manufacturers = new Set();
    const dynamicSpecs = {};
    let minPrice = Infinity;
    let maxPrice = 0;

    products?.forEach((product) => {
      companies.add(product.company);
      
      if (product.specifications.condition) {
        conditions.add(product.specifications.condition);
      }
      
      if (product.specifications.manufacturer) {
        manufacturers.add(product.specifications.manufacturer);
      }
      
      const price = product.specifications.price || 0;
      minPrice = Math.min(minPrice, price);
      maxPrice = Math.max(maxPrice, price);

      // Extract dynamic specification fields
      Object.entries(product.specifications).forEach(([key, value]) => {
        if (
          ['features', 'description', 'image', 'price', 'minimum_order_quantity', 'environmental_specifications'].includes(key)
        ) {
          return;
        }
        
        if (typeof value === 'string' && value.length < 50) {
          if (!dynamicSpecs[key]) {
            dynamicSpecs[key] = new Set();
          }
          dynamicSpecs[key].add(value);
        }
      });
    });

    return {
      companies: Array.from(companies).sort(),
      conditions: Array.from(conditions).sort(),
      manufacturers: Array.from(manufacturers).sort(),
      priceRange: [minPrice === Infinity ? 0 : minPrice, maxPrice],
      dynamicSpecs: Object.fromEntries(
        Object.entries(dynamicSpecs)
          .filter(([_, values]) => values.size > 1 && values.size <= 20)
          .map(([key, values]) => [key, Array.from(values).sort()])
      ),
    };
  }, [products]);

  const toggleArrayFilter = (
    filterKey,
    value
  ) => {
    const current = filters[filterKey];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ [filterKey]: updated });
  };

  const toggleSpecFilter = (specKey, value) => {
    const current = filters.specifications[specKey] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    
    onFilterChange({
      specifications: {
        ...filters.specifications,
        [specKey]: updated,
      },
    });
  };

  const formatSpecLabel = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const activeFilterCount = 
    filters.companies.length + 
    filters.conditions.length + 
    filters.manufacturers.length +
    Object.values(filters.specifications).flat().length +
    (filters.priceRange[0] > filterOptions.priceRange[0] || 
     filters.priceRange[1] < filterOptions.priceRange[1] ? 1 : 0);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <DrawerTitle className="font-display">Filters</DrawerTitle>
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="text-xs text-muted-foreground"
                >
                  Clear all
                </Button>
              )}
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 pb-20">
            {/* Price Range */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground">
                Price Range
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 pb-4">
                <div className="space-y-4 px-1">
                  <Slider
                    min={filterOptions.priceRange[0]}
                    max={filterOptions.priceRange[1]}
                    step={1}
                    value={filters.priceRange}
                    onValueChange={(value) =>
                      onFilterChange({ priceRange: value })
                    }
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${filters.priceRange[0].toFixed(2)}</span>
                    <span>${filters.priceRange[1].toFixed(2)}</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Companies */}
            {filterOptions.companies.length > 1 && (
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground">
                  Supplier
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 pb-4 space-y-3">
                  {filterOptions.companies.map((company) => (
                    <label
                      key={company}
                      className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer py-1"
                    >
                      <Checkbox
                        checked={filters.companies.includes(company)}
                        onCheckedChange={() => toggleArrayFilter('companies', company)}
                      />
                      <span className="truncate">{company}</span>
                    </label>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Condition */}
            {filterOptions.conditions.length > 1 && (
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground">
                  Condition
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 pb-4 space-y-3">
                  {filterOptions.conditions.map((condition) => (
                    <label
                      key={condition}
                      className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer capitalize py-1"
                    >
                      <Checkbox
                        checked={filters.conditions.includes(condition)}
                        onCheckedChange={() => toggleArrayFilter('conditions', condition)}
                      />
                      {condition}
                    </label>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Manufacturer */}
            {filterOptions.manufacturers.length > 1 && (
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground">
                  Manufacturer
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 pb-4 space-y-3">
                  {filterOptions.manufacturers.map((manufacturer) => (
                    <label
                      key={manufacturer}
                      className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer py-1"
                    >
                      <Checkbox
                        checked={filters.manufacturers.includes(manufacturer)}
                        onCheckedChange={() => toggleArrayFilter('manufacturers', manufacturer)}
                      />
                      <span className="truncate">{manufacturer}</span>
                    </label>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Dynamic Specification Filters */}
            {Object.entries(filterOptions.dynamicSpecs).map(([specKey, values]) => (
              <Collapsible key={specKey}>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground">
                  {formatSpecLabel(specKey)}
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 pb-4 space-y-3">
                  {values.map((value) => (
                    <label
                      key={value}
                      className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer py-1"
                    >
                      <Checkbox
                        checked={(filters.specifications[specKey] || []).includes(value)}
                        onCheckedChange={() => toggleSpecFilter(specKey, value)}
                      />
                      <span className="truncate">{value}</span>
                    </label>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>

        {/* Apply button fixed at bottom */}
        <div className="border-t border-border p-4 bg-background">
          <Button 
            className="w-full" 
            onClick={() => onOpenChange(false)}
          >
            Show Results
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
