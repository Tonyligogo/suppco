'use client'
import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';
import { CartSheet } from '../components/CartSheet';
import { CompareModal } from '../components/CompareModal';
import { MobileFilterDrawer } from '../components/MobileFilterDrawer';
import { MarketplaceProvider } from '../context/MarketplaceContext';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { FilterSidebar } from '../components/FilterSidebar';
import { useProducts } from '@/hooks/(inventory)/useInventoryManagement';
import { use } from 'react'
import { MarketplaceSkeleton } from '../components/MarketplaceSkeleton';

function MarketplaceContent() {
  const { filters, setFilters, clearFilters, hasActiveFilters } = useUrlFilters();
  const [cartOpen, setCartOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const {data:products, isPending, isError} = useProducts()

  // Calculate active filter count for mobile badge
  const activeFilterCount = useMemo(() => {
  if (!products || products.length === 0) {
    return;
  }

  const priceRange = products.reduce(
    (acc, p) => {
      const price = p.specifications?.price ?? 0;
      return [
        Math.min(acc[0], price),
        Math.max(acc[1], price),
      ];
    },
    [Infinity, 0]
  );

  return (
    filters.companies.length +
    filters.conditions.length +
    filters.manufacturers.length +
    Object.values(filters.specifications).flat().length +
    (filters.priceRange[0] > priceRange[0] ||
    filters.priceRange[1] < priceRange[1]
      ? 1
      : 0)
  );
}, [filters, products]);

// LOADING STATE
  if (isPending) {
    return <MarketplaceSkeleton />;
  }

  // ERROR STATE
  if (isError) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-muted-foreground">
        Failed to load marketplace products.
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <Header
        searchValue={filters.search}
        onSearchChange={(search) => setFilters({ search })}
        onCartClick={() => setCartOpen(true)}
        onCompareClick={() => setCompareOpen(true)}
      />

      <main className=" py-4 sm:py-6 px-3 sm:px-6">
        <div className="flex gap-6">
          <FilterSidebar
            products={products}
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
          
          <ProductGrid
            products={products}
            filters={filters}
            onSortChange={(sortBy) => setFilters({ sortBy })}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
          />
        </div>
      </main>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <CompareModal open={compareOpen} onOpenChange={setCompareOpen} />
      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onOpenChange={setMobileFiltersOpen}
        products={products}
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}

export default function Markeplace() {
  return (
    <MarketplaceProvider>
      <MarketplaceContent />
    </MarketplaceProvider>
  );
}
