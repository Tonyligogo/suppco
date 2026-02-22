import { useState } from 'react';
import { Search, ShoppingCart, Scale, Package, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useMarketplace } from '../context/MarketplaceContext';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

export function Header({ searchValue, onSearchChange, onCartClick, onCompareClick }) {
  const { cartItemCount, compareCount } = useMarketplace();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
   const { data: session, status } = useSession();
    const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6">
        {/* Logo */}
        <span className="font-bold text-3xl">Suppco</span>

        {/* Search - Desktop */}
        <div className="relative flex-1 max-w-xl hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products, suppliers, categories..."
            className="pl-10"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Search - Mobile Expandable */}
        <div className={cn(
          "flex-1 sm:hidden",
          mobileSearchOpen ? "block" : "hidden"
        )}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-10 bg-surface-elevated border-border h-10"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setMobileSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className={cn(
          "flex items-center gap-1 sm:gap-2",
          mobileSearchOpen && "hidden sm:flex"
        )}>
          {/* Mobile search trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden h-9 w-9"
            onClick={() => setMobileSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="relative h-9 w-9 sm:h-9 sm:w-auto sm:px-3 sm:gap-2"
            onClick={onCompareClick}
          >
            <Scale className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Compare</span>
            {compareCount > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-white text-xs"
              >
                {compareCount}
              </Badge>
            )}
          </Button>
          
          <Button
            variant="default"
            size="icon"
            className="relative h-9 w-9 sm:h-9 sm:w-auto sm:px-3 sm:gap-2"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Cart</span>
            {cartItemCount > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-white text-xs"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
