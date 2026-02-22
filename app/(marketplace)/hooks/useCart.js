import { useCreateCart, useGetCart } from '@/hooks/(payments)/usePaymentManagement';
import { useSession } from 'next-auth/react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

const CART_STORAGE_KEY = 'marketplace_cart_v1';

function normalizeServerCart(data) {
  if (!data) return { items: [] };

  return {
    id: data.id,
    reference: data.reference,
    items: data.items || [],
    total_amount: data.total_amount || 0,
    total_payable: data.total_payable || 0,
  };
}

function loadGuestCart() {
  if (typeof window === 'undefined') return { items: [] };
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : { items: [] };
}

function saveGuestCart(cart) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function useCart() {
  const {data:session} = useSession()
  const user = session?.user;
  const isAuthenticated = !!user;

   const { data: serverCart, isLoading } = useGetCart({
    enabled: isAuthenticated,
  });

  const { mutateAsync: createCartItem } = useCreateCart();

  const [guestCart, setGuestCart] = useState({ items: [] });

  /* ----------------------------- */
  /* Load guest cart               */
  /* ----------------------------- */
  useEffect(() => {
    if (!isAuthenticated) {
      setGuestCart(loadGuestCart());
    }
  }, [isAuthenticated]);

    const cart = useMemo(() => {
    if (isAuthenticated) {
      return normalizeServerCart(serverCart);
    }
    return guestCart;
  }, [isAuthenticated, serverCart, guestCart]);

  /**
   * 2. Persist cart to localStorage whenever it changes
   */
   useEffect(() => {
    if (!isAuthenticated) saveGuestCart(guestCart);
  }, [guestCart, isAuthenticated]);

  /* ----------------------------- */
  /* Add item                      */
  /* ----------------------------- */
  const addToCart = useCallback(
    async (item) => {
      if (isAuthenticated) {
        try {
          await createCartItem(item);
        } catch(error) {
          toast.error("Failed to add item to cart. Please try again.");
          console.error("Error adding to cart:", error);
        }
        return; // server refetch handles update
      }

      setGuestCart((prev) => {
        const existing = prev.items.find(
          (i) =>
            i.product_reference === item.product_reference &&
            i.payment_option === item.payment_option &&
            i.duration_months === item.duration_months &&
            i.deposit_amount === item.deposit_amount
        );

        if (existing) {
          return {
            ...prev,
            items: prev.items.map((i) =>
              i === existing
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          };
        }

        return {
          ...prev,
          items: [...prev.items, item],
        };
      });
    },
    [isAuthenticated, createCartItem]
  )

   /* ----------------------------- */
  /* Remove item                   */
  /* ----------------------------- */
   const removeFromCart = useCallback(
    async (itemRef) => {
      if (isAuthenticated) {
        return;
      }

      setGuestCart((prev) => ({
        ...prev,
        items: prev.items.filter((i) => i.reference !== itemRef),
      }));
    },
    [isAuthenticated]
  );

    /* ----------------------------- */
  /* Update quantity               */
  /* ----------------------------- */
    const updateQuantity = useCallback(
    async (itemRef, quantity) => {
      if (quantity < 1) return removeFromCart(itemRef);

      if (isAuthenticated) {
        return;
      }

      setGuestCart((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.reference === itemRef ? { ...item, quantity } : item
        ),
      }));
    },
    [isAuthenticated, removeFromCart]
  );

  /* ----------------------------- */
  /* Clear cart                    */
  /* ----------------------------- */
  const clearCart = useCallback(async () => {
    if (isAuthenticated) return
    setGuestCart({ items: [] });
    localStorage.removeItem(CART_STORAGE_KEY);
  }, [isAuthenticated]);
    /* ----------------------------- */
  /* Totals                        */
  /* ----------------------------- */
 
const totals = useMemo(() => {
    return cart?.items?.reduce(
      (acc, item) => {
        acc.sub_total += Number(item.sub_total || 0);
        acc.payable_now += Number(item.payable_amount || 0);
        acc.total_interest += Number(item.total_interest || 0);
        acc.item_count += Number(item.quantity || 0);
        return acc;
      },
      {
        sub_total: 0,
        payable_now: 0,
        total_interest: 0,
        item_count: 0,
      }
    );
  }, [cart.items]);

  return {
    cart,
    cartItems: cart.items,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totals,
    cartItemCount: cart.items.length,
  };
}
