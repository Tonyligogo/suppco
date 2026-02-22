"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useMarketplace } from "../context/MarketplaceContext";
import { calculatePaymentPlan } from "@/utils/paymentCalculator";

export function PaymentConfigModal({ product, open, onOpenChange }) {
  const { addToCart } = useMarketplace();

  const [quantity, setQuantity] = useState(
    product.specifications.minimum_order_quantity || 1
  );

  const [selectedOptionRef, setSelectedOptionRef] = useState(null);
  const [depositPercent, setDepositPercent] = useState(0);
  const [durationMonths, setDurationMonths] = useState(3);

  const paymentOptions = product.payment_options_details || [];

  const selectedOption = paymentOptions.find(
    (o) => o.reference === selectedOptionRef
  );

  /* ----------------------------- */
  /* Calculate plan live           */
  /* ----------------------------- */
  const calculation = useMemo(() => {
    if (!selectedOption) return null;

    try {
      return calculatePaymentPlan({
        product,
        quantity,
        paymentOption: selectedOption,
        depositPercentage: depositPercent,
        durationMonths,
      });
    } catch(error) {
      console.error("Error calculating payment plan:", error);
      return null;
    }
  }, [product, quantity, selectedOption, depositPercent, durationMonths]);

  /* ----------------------------- */
  /* Save to cart                  */
  /* ----------------------------- */
  const handleAddToCart = () => {
    if (!calculation) return;
    addToCart(calculation);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-background w-full max-w-lg rounded-xl border p-6 space-y-5 max-h-[90vh] overflow-auto">

        <h2 className="text-lg font-semibold">
          Configure Purchase
        </h2>

        {/* Quantity */}
        <div>
          <label className="text-sm font-medium">Quantity</label>
          <input
            type="number"
            min={product.specifications.minimum_order_quantity || 1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="input"
          />
        </div>

        {/* Payment Option */}
        <div>
          <label className="text-sm font-medium">Payment Option</label>
          <select
            value={selectedOptionRef || ""}
            onChange={(e) => setSelectedOptionRef(e.target.value)}
            className="input"
          >
            <option value="">Select option</option>
            {paymentOptions.map((opt) => (
              <option key={opt.reference} value={opt.reference}>
                {opt.name} ({opt.payment_type})
              </option>
            ))}
          </select>
        </div>

        {/* Flexible controls */}
        {selectedOption?.payment_type === "FLEXIBLE" && (
          <>
            <div>
              <label className="text-sm font-medium">
                Deposit %
              </label>
              <input
                type="number"
                min={selectedOption.min_deposit_percentage}
                value={depositPercent}
                onChange={(e) =>
                  setDepositPercent(Number(e.target.value))
                }
                className="input"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Duration (months)
              </label>
              <input
                type="number"
                min={1}
                value={durationMonths}
                onChange={(e) =>
                  setDurationMonths(Number(e.target.value))
                }
                className="input"
              />
            </div>
          </>
        )}

        {/* Calculation Preview */}
        {calculation && (
          <div className="border rounded-lg p-4 text-sm space-y-2">
            <div>Subtotal: {calculation.sub_total}</div>
            <div>Pay Now: {calculation.payable_amount}</div>
            <div>Total Interest: {calculation.total_interest}</div>
            {calculation.monthly_amount > 0 && (
              <div>Monthly: {calculation.monthly_amount}</div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button
            disabled={!calculation}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>

      </div>
    </div>
  );
}