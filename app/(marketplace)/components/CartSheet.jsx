import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMarketplace } from '../context/MarketplaceContext';

export function CartSheet({ open, onOpenChange }) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useMarketplace();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart
            {cartItems.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({cartItems.length} items)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/40 mb-4" />
            <h3 className="font-display font-semibold text-foreground mb-2">
              Your cart is empty
            </h3>
            <p className="text-sm text-muted-foreground">
              Add products to get started
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {cartItems.map((item) => {
                  const price = item.product.specifications.price || 0;
                  const minOrder = item.product.specifications.minimum_order_quantity || 1;
                  
                  return (
                    <div
                      key={item.product.reference}
                      className="flex gap-4 p-3 rounded-lg bg-muted/50"
                    >
                      {/* Placeholder image */}
                      <div className="w-16 h-16 rounded bg-muted flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="h-6 w-6 text-muted-foreground/40" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-foreground truncate">
                          {item.product.product_name}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.product.company}
                        </p>
                        <p className="text-sm font-semibold text-foreground mt-1">
                          ${price.toFixed(2)}
                        </p>
                        {minOrder > 1 && (
                          <p className="text-xs text-muted-foreground">
                            Min order: {minOrder}
                          </p>
                        )}

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.reference, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.reference, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.product.reference)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-display font-bold text-foreground">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
