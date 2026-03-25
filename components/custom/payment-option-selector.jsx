'use client';

import { Badge } from '@/components/ui/badge';
import { usePaymentOptions } from '@/hooks/(payments)/usePaymentManagement';
import LoadingComponent from './loading-component';
import { Check, CreditCard } from 'lucide-react';

export function PaymentOptionsSelector({ value = [], onChange }) {
  const { data: paymentOptions = [], isLoading } = usePaymentOptions();

  if (isLoading) {
    return <LoadingComponent/>;
  }

  const toggle = (ref) => {
    if (value.includes(ref)) {
      onChange(value.filter(v => v !== ref));
    } else {
      onChange([...value, ref]);
    }
  };

  return (
    <div className="space-y-2">
       <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-2">
          <CreditCard className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Payment Options
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Choose which payment methods customers can use for this product.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {paymentOptions.map(option => {
          const isSelected = value.includes(option.reference);
          return(
             <button
              key={option.reference}
              onClick={() => toggle(option.reference)}
              className={`relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left active:scale-[0.97] ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-surface-elevated hover:border-primary/30"
              }`}
            >
              <span className="font-medium text-sm text-foreground">{option.name}</span>
              <Badge variant="outline" className="text-xs">
                  {option.payment_type}
                </Badge>
                {option.payment_type === 'FLEXIBLE' && (
                <p className="text-xs mt-1">
                  Min deposit: {option.min_deposit_percentage}%
                </p>
              )}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center animate-in zoom-in duration-200">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </button>
          )
})}
      </div>
    </div>
  );
}
