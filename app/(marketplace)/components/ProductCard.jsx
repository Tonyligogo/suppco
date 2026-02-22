import { useState } from 'react';
import { Package, Scale, ShoppingCart, Check, MapPin, Building, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductPreview } from './ProductPreview';
import { cn } from '@/lib/utils';
import { PaymentConfigModal } from './PaymentConfigModal';

export function ProductCard({ product }) {
  const { addToCompare, isInCompare, canAddMore } = useMarketplace();
  const [previewOpen, setPreviewOpen] = useState(false);
  const inCompare = isInCompare(product.reference);
  const [configOpen, setConfigOpen] = useState(false);
  
  const price = Number(product.price);
  const minOrder = product.specifications.minimum_order_quantity;
  const condition = product.specifications.condition;
  const units = product.specifications.units_of_measurement;
  console.log(product)

  return (
    <>
      <article className="marketplace-card group flex flex-col animate-fade-in">
        {/* Image placeholder - clickable for preview */}
        <div 
          className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-muted cursor-pointer"
          onClick={() => setPreviewOpen(true)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {
              !product.image ? (
                <Package className="h-12 w-12 text-muted-foreground/40" />
              ) : (
                <img src={product.image} alt={product.product_name} className="h-full w-full object-cover" />
              )
            }
          </div>
          
          {/* Condition badge */}
          {condition && (
            <Badge 
              className={cn(
                "absolute top-2 left-2 text-xs capitalize",
                condition === 'new' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'
              )}
            >
              {condition}
            </Badge>
          )}

          {/* Quick view overlay on hover */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 text-sm font-medium text-foreground shadow-lg">
                <Eye className="h-4 w-4" />
                Quick View
              </div>
            </div>
          </div>

          {/* Compare button overlay */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant={inCompare ? "default" : "secondary"}
              size="icon"
              className="h-8 w-8 shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                addToCompare(product);
              }}
              disabled={!inCompare && !canAddMore}
            >
              {inCompare ? (
                <Check className="h-4 w-4" />
              ) : (
                <Scale className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          {/* Company */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <Building className="h-3 w-3" />
            <span className="truncate">{product.company}</span>
          </div>

          {/* Title - clickable for preview */}
          <h3 
            className="font-display font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors cursor-pointer"
            onClick={() => setPreviewOpen(true)}
          >
            {product.product_name}
          </h3>

          {/* Description */}
          {product.specifications.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {product.specifications.description}
            </p>
          )}

          {/* Location */}
          {product.source_location && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
              <MapPin className="h-3 w-3" />
              <span>{product.source_location}</span>
            </div>
          )}

          {/* Specs preview */}
          <div className="flex flex-wrap gap-1 mb-4">
            {units && (
              <Badge variant="outline" className="text-xs">
                {units}
              </Badge>
            )}
            {minOrder && (
              <Badge variant="outline" className="text-xs">
                Min: {minOrder}
              </Badge>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-end justify-between gap-2">
            <div>
              {price !== undefined ? (
                <>
                  <p className="text-xl font-display font-bold text-foreground">
                    Ksh {price.toFixed(2)}
                  </p>
                  {units && (
                    <p className="text-xs text-muted-foreground">per {units}</p>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Contact for price</p>
              )}
            </div>

            <Button
              size="sm"
              onClick={() => setConfigOpen(true)}
              className="gap-1.5"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </Button>
             <PaymentConfigModal
        product={product}
        open={configOpen}
        onOpenChange={setConfigOpen}
      />
          </div>
        </div>
      </article>

      <ProductPreview
        product={product}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </>
  );
}
