'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { usePaymentOptions } from '@/hooks/(payments)/usePaymentManagement';
import LoadingComponent from './loading-component';
import { Label } from '../ui/label';

export function PaymentOptionsSelector({ value = [], onChange }) {
  const { data: paymentOptions = [], isLoading } = usePaymentOptions();

  if (isLoading) {
    return <LoadingComponent/>;
  }

  const toggleOption = (ref) => {
    if (value.includes(ref)) {
      onChange(value.filter(v => v !== ref));
    } else {
      onChange([...value, ref]);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Payment Options</Label>

      <div className="space-y-2">
        {paymentOptions.map(option => (
          <div
            key={option.reference}
            className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50"
          >
            <Checkbox
              checked={value.includes(option.reference)}
              onCheckedChange={() => toggleOption(option.reference)}
            />

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{option.name}</span>
                <Badge variant="outline" className="text-xs">
                  {option.payment_type}
                </Badge>
              </div>

              {option.payment_type === 'FLEXIBLE' && (
                <p className="text-xs mt-1">
                  Min deposit: {option.min_deposit_percentage}%
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
