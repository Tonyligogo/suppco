'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useCreatePaymentOption } from '@/hooks/(payments)/usePaymentManagement';
import { validatePaymentOption } from '@/utils/validatePaymentOptions';
import { PAYMENT_TYPES } from '@/lib/paymentOptions';
import toast from 'react-hot-toast';

export function PaymentOptionForm() {
  const [formData, setFormData] = useState({
    name: '',
    payment_type: '',
    min_deposit_percentage: 0,
    description: '',
    is_active: true,
  });

  const [errors, setErrors] = useState({});
  const { mutate, isLoading } = useCreatePaymentOption();

  const handleSubmit = () => {
    const validation = validatePaymentOption(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    mutate(formData, {
      onSuccess: () => {
        toast.success('Payment option created')
      },
      onError: () => {
        toast.error('Failed to create Payment option. Try again later!')
      },
    });
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add Payment Option</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create payment option</DialogTitle>
            <DialogDescription>
              Create a payment option here, to be used when creating a product.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Payment option name</Label>
              {/* Name */}
      <div>
        <Input
          placeholder="Payment option name"
          id='name'
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="payment_type">Payment type</Label>
               {/* Payment type */}
      <div>
        <Select
          value={formData.payment_type}
          id='payment_type'
          onValueChange={value =>
            setFormData({
              ...formData,
              payment_type: value,
              min_deposit_percentage: 0,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select payment type" />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_TYPES.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.payment_type && (
          <p className="text-sm text-destructive">{errors.payment_type}</p>
        )}
      </div>
            </div>
      {formData.payment_type === 'FLEXIBLE' && (
            <div className='grid gap-3'>
                 <Label htmlFor="deposit">Minimum Deposit (%)</Label>
                {/* Flexible deposit */}
        <div>
          <Input
            type="number"
            id='deposit'
            min={0}
            max={100}
            placeholder="Minimum deposit (%)"
            value={formData.min_deposit_percentage}
            onChange={e =>
              setFormData({
                ...formData,
                min_deposit_percentage: Number(e.target.value),
              })
            }
          />
          {errors.min_deposit_percentage && (
            <p className="text-sm text-destructive">
              {errors.min_deposit_percentage}
            </p>
          )}
        </div>
            </div>
      )}
      <div className='grid gap-3'>
        <Label htmlFor="description">Description</Label>
        {/* Description */}
      <Textarea
        placeholder="Description (optional)"
        id='description'
        value={formData.description}
        onChange={e =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      </div>
      <div className='grid gap-3'>
        <Label htmlFor="active">Active</Label>
        {/* Active toggle */}
        <Switch
          checked={formData.is_active}
          id='active'
          onCheckedChange={checked =>
            setFormData({ ...formData, is_active: checked })
          }
        />
      </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit} type='submit' disabled={isLoading}>
        Create Payment Option
      </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

 
