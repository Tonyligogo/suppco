import { useMemo } from 'react';
import { X, ShoppingCart, Package } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useMarketplace } from '../context/MarketplaceContext';
import { cn } from '@/lib/utils';

const getComparableFields = (product) => {
  return {
    price: Number(product.price),
    quantity: product.quantity,
    unit: product.unit,
    source_location: product.source_location,
    company: product.company,
    ...product.specifications,
  };
};

export function CompareModal({ open, onOpenChange }) {
  const { compareItems, removeFromCompare, clearCompare, addToCart } = useMarketplace();

  console.log(compareItems)
  // Get all unique specification keys from compared products
  const allSpecKeys = useMemo(() => {
  const keys = new Set();

  compareItems.forEach((product) => {
    const comparable = getComparableFields(product);
    Object.keys(comparable).forEach((key) => keys.add(key));
  });

  return Array.from(keys).sort();
}, [compareItems]);

  const formatSpecLabel = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatSpecValue = (value) => {
  if (value === null || value === undefined || value === "") return "—";

  if (typeof value === "number") return value.toString();

  if (typeof value === "string") return value;

  if (Array.isArray(value)) return `${value.length} items`;

  if (typeof value === "object") return JSON.stringify(value);

  return String(value);
};

  const isPriceField = (key) => key === "price";

  // Find the best value for price comparison
  const getPriceRank = (values) => {
  const prices = values
    .filter((v) => typeof v === "number" && !isNaN(v))
    .sort((a, b) => a - b);

  return (price) => prices.indexOf(price);
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl overflow-auto max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            Compare Products
            {compareItems.length > 0 && (
              <Badge variant="primary">{compareItems.length} products</Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {compareItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="h-16 w-16 text-muted-foreground/40 mb-4" />
            <h3 className="font-display font-semibold text-foreground mb-2">
              No products to compare
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Add products to comparison by clicking the scale icon on product cards.
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="">
                {/* Product headers */}
                <div className="grid gap-4 pb-4 border-b sticky top-0 z-10"
                  style={{ gridTemplateColumns: `repeat(${compareItems.length}, minmax(200px, 1fr))` }}
                >
                  {compareItems.map((product) => (
                    <div key={product.reference} className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-1 -right-1 h-6 w-6"
                        onClick={() => removeFromCompare(product.reference)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      
                      {/* Product image placeholder */}
                      <div className="w-full max-w-md aspect-square rounded-lg bg-muted flex items-center justify-center mb-3">
                        {
                          !product.image ? (
                            <Package className="h-12 w-12 text-muted-foreground/40" />
                          ) : (
                            <img src={product.image} alt={product.product_name} className="h-full w-full object-cover" />
                          )
                        }
                      </div>
                      <h4 className="font-display font-semibold text-foreground text-sm line-clamp-2 mb-1">
                        {product.product_name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        {product.company}
                      </p>

                      <Button
                        size="sm"
                        className="w-full gap-1.5"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Comparison rows */}
                <div className="divide-y divide-border">
  {allSpecKeys.map((key) => {
    const values = compareItems.map((product) => {
      const comparable = getComparableFields(product);
      return comparable[key];
    });

    const isPrice = isPriceField(key);
    const rankPrice = getPriceRank(values);

    return (
      <div
        key={key}
        className="grid gap-4 py-3"
        style={{
          gridTemplateColumns: `200px repeat(${compareItems.length}, minmax(200px, 1fr))`,
        }}
      >
        <div className="font-medium text-sm text-muted-foreground">
          {formatSpecLabel(key)}
        </div>

        {compareItems.map((product) => {
          const comparable = getComparableFields(product);
          const value = comparable[key];

          const numericValue =
            typeof value === "string" && !isNaN(Number(value))
              ? Number(value)
              : value;

          const formattedValue = formatSpecValue(numericValue);
          const priceRank = isPrice ? rankPrice(numericValue) : -1;

          return (
            <div
              key={product.reference}
              className={cn(
                "text-sm",
                isPrice && priceRank === 0 && "text-success font-semibold",
                isPrice && typeof numericValue === "number" &&
                  "font-display text-lg font-bold"
              )}
            >
              {isPrice && typeof numericValue === "number" ? (
                <>
                  ${numericValue.toFixed(2)}
                  {priceRank === 0 && (
                    <Badge className="ml-2 bg-success text-success-foreground text-xs">
                      Best
                    </Badge>
                  )}
                </>
              ) : (
                formattedValue
              )}
            </div>
          );
        })}
      </div>
    );
  })}
</div>
              </div>
               <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="pt-4 border-t border-border flex justify-end">
              <Button variant="outline" onClick={clearCompare}>
                Clear Comparison
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
