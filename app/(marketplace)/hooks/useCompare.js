import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const MAX_COMPARE_ITEMS = 2;

export function useCompare() {
  const [compareItems, setCompareItems] = useState([]);

  const addToCompare = useCallback((product) => {
     let action = 'added';

    setCompareItems((prev) => {
      if (prev.some((p) => p.reference === product.reference)) {
        action = 'exists';
        return prev;
      }

      if (prev.length >= MAX_COMPARE_ITEMS) {
        action = 'limit';
        return prev;
      }

      return [...prev, product];
    });

    // 🔥 side-effects AFTER state logic
    if (action === 'exists') {
      toast(`${product.product_name} is already in comparison`);
    } else if (action === 'limit') {
      toast.error(`Maximum ${MAX_COMPARE_ITEMS} products can be compared`);
    } else {
      toast.success(`Added ${product.product_name} to comparison`);
    }
  }, []);

  const removeFromCompare = useCallback((productRef) => {
    setCompareItems((prev) => prev.filter((p) => p.reference !== productRef));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareItems([]);
  }, []);

  const isInCompare = useCallback(
    (productRef) => compareItems.some((p) => p.reference === productRef),
    [compareItems]
  );

  return {
    compareItems,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    compareCount: compareItems.length,
    canAddMore: compareItems.length < MAX_COMPARE_ITEMS,
  };
}
