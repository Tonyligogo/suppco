import { useMemo } from 'react';
import { ArrowUpDown, Package, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products, filters, onSortChange, onOpenMobileFilters, activeFilterCount = 0 }) {
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.product_name.toLowerCase().includes(searchLower) ||
          p.company.toLowerCase().includes(searchLower) ||
          p.specifications.description?.toLowerCase().includes(searchLower) ||
          p.specifications.manufacturer?.toLowerCase().includes(searchLower)
      );
    }

    // Company filter
    if (filters?.companies.length > 0) {
      result = result.filter((p) => filters.companies.includes(p.company));
    }

    // Condition filter
    if (filters?.conditions.length > 0) {
      result = result.filter((p) =>
        p.specifications.condition
          ? filters.conditions.includes(p.specifications.condition)
          : false
      );
    }

    // Manufacturer filter
    if (filters.manufacturers.length > 0) {
      result = result.filter((p) =>
        p.specifications.manufacturer
          ? filters.manufacturers.includes(p.specifications.manufacturer)
          : false
      );
    }

    // Price range filter
    result = result.filter((p) => {
      const price = p.specifications?.price || 0;
      console.log('price range filter', price >= filters.priceRange[0] && price <= filters.priceRange[1])
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Dynamic specification filters
    Object.entries(filters.specifications).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter((p) => {
          const specValue = p.specifications[key];
          return typeof specValue === 'string' && values.includes(specValue);
        });
      }
    });

    // Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return (a.specifications.price || 0) - (b.specifications.price || 0);
        case 'price-desc':
          return (b.specifications.price || 0) - (a.specifications.price || 0);
        case 'company':
          return a.company.localeCompare(b.company);
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'name':
        default:
          return a.product_name.localeCompare(b.product_name);
      }
    });

    return result;
  }, [products, filters]);

  return (
    <div className="flex-1 min-w-0">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          {/* Mobile filter button */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden gap-2 h-9"
            onClick={onOpenMobileFilters}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden xs:inline">Filters</span>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
          
          <p className="text-xs sm:text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{filteredAndSortedProducts.length}</span>
            <span className="hidden xs:inline"> products</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
          <Select value={filters.sortBy} onValueChange={(v) => onSortChange(v)}>
            <SelectTrigger className="w-[140px] sm:w-[180px] h-9 text-xs sm:text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              <SelectItem value="company">Supplier</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.reference} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
          <Package className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground/40 mb-4" />
          <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-2">
            No products found
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
