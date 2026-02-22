import { buildResult, calculateFlexiblePlan, projectionFuture, projectionToday } from "./calculateFlexiblePlan";

export function calculatePaymentPlan({
  product,
  quantity,
  paymentOption,
  depositPercentage,
  durationMonths,
}) {
  const price = Number(product.price || 0);
  const subTotal = price * quantity;
  const type = paymentOption.payment_type;

  switch (type) {
    case "FIXED":
      return buildResult({
        product,
        quantity,
        subTotal,
        payableNow: subTotal,
        totalInterest: 0,
        depositAmount: 0,
        durationMonths: 0,
        monthlyAmount: 0,
        paymentOption,
        projections: [
          projectionToday(subTotal, "Full Payment"),
        ],
      });

    case "PAYMENT_ON_DELIVERY":
      return buildResult({
        product,
        quantity,
        subTotal,
        payableNow: 0,
        totalInterest: 0,
        depositAmount: 0,
        durationMonths: 0,
        monthlyAmount: 0,
        paymentOption,
        projections: [
          projectionFuture(1, subTotal, "Pay on delivery"),
        ],
      });

    case "SPLIT_50_50": {
      const deposit = subTotal * 0.5;
      const remaining = subTotal - deposit;

      return buildResult({
        product,
        quantity,
        subTotal,
        payableNow: deposit,
        totalInterest: 0,
        depositAmount: deposit,
        durationMonths: 1,
        monthlyAmount: remaining,
        paymentOption,
        projections: [
          projectionToday(deposit, "Initial 50%"),
          projectionFuture(1, remaining, "Final 50%"),
        ],
      });
    }

    case "FLEXIBLE":
      return calculateFlexiblePlan({
        product,
        quantity,
        subTotal,
        paymentOption,
        depositPercentage,
        durationMonths,
      });

    default:
      throw new Error("Unsupported payment type");
  }
}