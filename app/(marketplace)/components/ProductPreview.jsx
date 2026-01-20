import { useState, useEffect } from 'react';
import { Package, ShoppingCart, Scale, Check, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import { useMarketplace } from '../context/MarketplaceContext';

// Format specification key for display
function formatSpecKey(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Format specification value for display
function formatSpecValue(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'number') return value.toString();
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    // Handle image arrays
    if (value[0]?.url) return null;
    return value.join(', ');
  }
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function ProductPreviewContent({ product }) {
  const { addToCart, addToCompare, isInCompare, canAddMore } = useMarketplace();
  const inCompare = isInCompare(product.id);

  const price = product.specifications.price;
  const minOrder = product.specifications.minimum_order_quantity;
  const units = product.specifications.units_of_measurement;
  const description = product.specifications.description;
  const features = product.specifications.features;
  const manufacturer = product.specifications.manufacturer;
  const certifications = product.specifications.standards_and_certifications;

  // Get all other specifications (excluding already displayed ones)
  const excludedKeys = [
    'price', 'minimum_order_quantity', 'condition', 'units_of_measurement',
    'description', 'features', 'manufacturer', 'standards_and_certifications',
    'image', 'source_location'
  ];
  
  const otherSpecs = Object.entries(product.specifications)
    .filter(([key]) => !excludedKeys.includes(key))
    .map(([key, value]) => ({ key, value: formatSpecValue(value) }))
    .filter((spec) => spec.value !== null);

  return (
    <div className="flex flex-col h-full">
      {/* Hero Section with Image */}
      <div className="relative bg-muted aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="h-16 w-16 sm:h-24 sm:w-24 text-muted-foreground/30" />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <ScrollArea className="h-1/2">
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          {/* Header Info */}
          <div className="space-y-3">
            {/* Company */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{product.company}</span>
            </div>

            {/* Title */}
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight">
              {product.product_name}
            </h2>

            {/* Location */}
            {product.source_location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{product.source_location}</span>
              </div>
            )}
          </div>

          {/* Price Section */}
          <div className="bg-surface-elevated rounded-lg p-4 sm:p-5 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                {price !== undefined ? (
                  <>
                    <p className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                      ${price.toFixed(2)}
                    </p>
                    {units && (
                      <p className="text-sm text-muted-foreground mt-1">per {units}</p>
                    )}
                  </>
                ) : (
                  <p className="text-lg text-muted-foreground">Contact for pricing</p>
                )}
              </div>

              {minOrder && (
                <Badge variant="outline" className="text-sm w-fit">
                  Min. Order: {minOrder} {units || 'units'}
                </Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              onClick={() => addToCart(product)}
              className="flex-1 gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant={inCompare ? "default" : "outline"}
              onClick={() => addToCompare(product)}
              disabled={!inCompare && !canAddMore}
              className="flex-1 gap-2"
            >
              {inCompare ? (
                <>
                  <Check className="h-5 w-5" />
                  In Compare
                </>
              ) : (
                <>
                  <Scale className="h-5 w-5" />
                  Compare
                </>
              )}
            </Button>
          </div>

          <Separator />

          {/* Description */}
          {description && (
            <div className="space-y-2">
              <h3 className="font-display font-semibold text-foreground">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>
          )}

          {/* Features */}
          {features && (
            <div className="space-y-2">
              <h3 className="font-display font-semibold text-foreground">Features</h3>
              <p className="text-muted-foreground leading-relaxed">{features}</p>
            </div>
          )}

          {/* Key Specifications Grid */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-foreground">Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {manufacturer && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Manufacturer</p>
                  <p className="text-sm font-medium text-foreground">{manufacturer}</p>
                </div>
              )}
              {units && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Unit of Measurement</p>
                  <p className="text-sm font-medium text-foreground">{units}</p>
                </div>
              )}
              {product.reference && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Reference</p>
                  <p className="text-sm font-medium text-foreground break-all">{product.reference}</p>
                </div>
              )}
              {certifications && (
                <div className="bg-muted/50 rounded-lg p-3 sm:col-span-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Standards & Certifications</p>
                  <p className="text-sm font-medium text-foreground">{certifications}</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Specifications */}
          {otherSpecs.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-display font-semibold text-foreground">Additional Details</h3>
              <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
                {otherSpecs.map(({ key, value }) => (
                  <div key={key} className="flex justify-between gap-4 p-3 bg-card hover:bg-surface-hover transition-colors">
                    <span className="text-sm text-muted-foreground">{formatSpecKey(key)}</span>
                    <span className="text-sm font-medium text-foreground text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export function ProductPreview({ product, open, onOpenChange }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!product) return null;

  // Mobile: Use Drawer (bottom sheet)
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[92vh] max-h-[92vh]">
          <DrawerHeader>
            <DrawerTitle className="sr-only">{product.product_name}</DrawerTitle>
            <DrawerClose asChild className='text-right'>
              <button>Close</button>
            </DrawerClose>
          </DrawerHeader>
          <ProductPreviewContent product={product} />
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Use Dialog (centered modal)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.product_name}</DialogTitle>
        </DialogHeader>
        <ProductPreviewContent product={product} />
      </DialogContent>
    </Dialog>
  );
}
