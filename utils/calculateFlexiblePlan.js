import { round, todayISO } from "@/lib/utils";

export function calculateFlexiblePlan({
  product,
  quantity,
  subTotal,
  paymentOption,
  depositPercentage,
  durationMonths,
}) {
  const minDeposit = Number(paymentOption.min_deposit_percentage);
  const interestRate = Number(paymentOption.interest_rate);

  if (!durationMonths || durationMonths < 1) {
    throw new Error("Duration required for flexible payment");
  }

  const appliedDepositPercent = Math.max(
    depositPercentage || minDeposit,
    minDeposit
  );

  const depositAmount =
    subTotal * (appliedDepositPercent / 100);

  const principal = subTotal - depositAmount;

  // simple interest formula
  const totalInterest =
    principal * (interestRate / 100) * (durationMonths / 12);

  const totalPayable = principal + totalInterest;

  const monthlyAmount = totalPayable / durationMonths;

  const projections = [
    projectionToday(depositAmount, "Deposit"),
    ...buildInstallments(monthlyAmount, durationMonths),
  ];

  return buildResult({
    product,
    quantity,
    subTotal,
    payableNow: depositAmount,
    totalInterest,
    depositAmount,
    durationMonths,
    monthlyAmount,
    paymentOption,
    projections,
  });
}

// installment generator
export function buildInstallments(amount, months) {
  const result = [];

  for (let i = 1; i <= months; i++) {
    result.push(
      projectionFuture(
        i,
        amount,
        `Installment ${i}/${months}`
      )
    );
  }

  return result;
}

// projection helpers
export function projectionToday(amount, label) {
  return {
    due_date: todayISO(),
    amount: round(amount),
    description: label,
    status: "PENDING",
  };
}

export function projectionFuture(monthOffset, amount, label) {
  const date = new Date();
  date.setMonth(date.getMonth() + monthOffset);

  return {
    due_date: date.toISOString().split("T")[0],
    amount: round(amount),
    description: label,
    status: "PENDING",
  };
}

// results builder
export function buildResult({
  product,
  quantity,
  subTotal,
  payableNow,
  totalInterest,
  depositAmount,
  durationMonths,
  monthlyAmount,
  paymentOption,
  projections,
}) {
  return {
    product: product.reference,
    quantity,

    sub_total: round(subTotal),
    payable_amount: round(payableNow),
    total_interest: round(totalInterest),

    payment_option: paymentOption.reference,
    payment_option_details: {
      payment_type: paymentOption.payment_type,
      min_deposit_percentage: Number(paymentOption.min_deposit_percentage),
      interest_rate: Number(paymentOption.interest_rate),
    },

    deposit_amount: round(depositAmount),
    duration_months: durationMonths,
    monthly_amount: round(monthlyAmount),

    projections,
  };
}