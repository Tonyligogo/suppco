'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export function useUrlFilters() {
   const params = useSearchParams()
   const router = useRouter();

  const filters = useMemo(() => {
    const search = params.get('q') || '';
    const companies = params.get('companies')?.split(',').filter(Boolean) || [];
    const conditions = params.get('conditions')?.split(',').filter(Boolean) || [];
    const manufacturers = params.get('manufacturers')?.split(',').filter(Boolean) || [];
    const priceMin = Number(params.get('priceMin')) || 0;
    const priceMax = Number(params.get('priceMax')) || 1000000;
    const sortBy = (params.get('sort')) || 'name';

    // Parse dynamic specification filters
    const specifications = {};
    params.forEach((value, key) => {
      if (key.startsWith('spec_')) {
        const specKey = key.replace('spec_', '');
        specifications[specKey] = value.split(',').filter(Boolean);
      }
    });

    return {
      search,
      companies,
      conditions,
      manufacturers,
      priceRange: [priceMin, priceMax],
      sortBy,
      specifications,
    };
  }, [params]);

  const setFilters = useCallback(
  (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    const params = new URLSearchParams();

    if (updatedFilters.search) {
      params.set('q', updatedFilters.search);
    }
    if (updatedFilters.companies.length > 0) {
      params.set('companies', updatedFilters.companies.join(','));
    }
    if (updatedFilters.conditions.length > 0) {
      params.set('conditions', updatedFilters.conditions.join(','));
    }
    if (updatedFilters.manufacturers.length > 0) {
      params.set('manufacturers', updatedFilters.manufacturers.join(','));
    }
    if (updatedFilters.priceRange[0] > 0) {
      params.set('priceMin', updatedFilters.priceRange[0].toString());
    }
    if (updatedFilters.priceRange[1] < 1000000) {
      params.set('priceMax', updatedFilters.priceRange[1].toString());
    }
    if (updatedFilters.sortBy !== 'name') {
      params.set('sort', updatedFilters.sortBy);
    }

    Object.entries(updatedFilters.specifications).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(`spec_${key}`, values.join(','));
      }
    });

    router.replace(`?${params.toString()}`, { scroll: false });
  },
  [filters, router]
);


  const clearFilters = useCallback(() => {
  router.replace('?', { scroll: false });
}, [router]);


  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.companies.length > 0 ||
      filters.conditions.length > 0 ||
      filters.manufacturers.length > 0 ||
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 1000000 ||
      Object.keys(filters.specifications).length > 0
    );
  }, [filters]);

  return {
    filters,
    setFilters,
    clearFilters,
    hasActiveFilters,
  };
}
