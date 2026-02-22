// src/utils/validatePaymentOption.ts
export function validatePaymentOption(data) {
  const errors = {};

  if (!data.name) errors.name = 'Name is required';
  if (!data.payment_type) errors.payment_type = 'Payment type is required';

  if (data.payment_type === 'FLEXIBLE') {
    if (data.min_deposit_percentage === undefined) {
      errors.min_deposit_percentage = 'Minimum deposit is required';
    } else if (
      data.min_deposit_percentage < 0 ||
      data.min_deposit_percentage > 100
    ) {
      errors.min_deposit_percentage = 'Must be between 0 and 100';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
