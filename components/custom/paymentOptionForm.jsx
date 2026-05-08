'use client';

import { useEffect, useState } from 'react';
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
import { useCreatePaymentOption, useUpdatePaymentOption } from '@/hooks/(payments)/usePaymentManagement';
import { validatePaymentOption } from '@/utils/validatePaymentOptions';
import { PAYMENT_TYPES } from '@/lib/paymentOptions';
import toast from 'react-hot-toast';
import { Pencil } from 'lucide-react';

export function PaymentOptionForm({initialData = null, productRef = null}) {
  const isEditMode = !!initialData;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    payment_type: '',
    min_deposit_percentage: 0,
    description: '',
    is_active: true,
  });

  const [errors, setErrors] = useState({});
  const { mutate: createMutate, isPending: isCreating } = useCreatePaymentOption();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdatePaymentOption();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        payment_type: initialData.payment_type || '',
        min_deposit_percentage: initialData.min_deposit_percentage || 0,
        description: initialData.description || '',
        is_active: initialData.is_active ?? true,
      });
    }
  }, [initialData, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validatePaymentOption(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const updatedPayload = {
    ...initialData,
    ...formData
  };

    const mutation = isEditMode ? updateMutate : createMutate;
    const payload = isEditMode ? {...updatedPayload, productRef: productRef} : formData;
    mutation(payload, {
      onSuccess: () => {
        toast.success(isEditMode ? 'Payment option updated' : 'Payment option created');
        setOpen(false);
      },
      onError: (error) => {
        const apiMessage = error?.response?.data?.message || error?.response?.data?.detail;
        toast.error('Something went wrong. Please try again.');
        console.error('Payment option:', apiMessage);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add Payment Option
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit' : 'Create'} payment option</DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Modify the details for this payment option.' : 'Define a new payment structure for your products.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            {/* Payment Type Selection */}
            <div className="grid gap-2">
              <Label htmlFor="payment_type">Type</Label>
              <Select
                value={formData.payment_type}
                onValueChange={value => setFormData({ ...formData, payment_type: value, min_deposit_percentage: 0 })}
              >
                <SelectTrigger id="payment_type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_TYPES.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Conditional Deposit Field */}
            {formData.payment_type === 'FLEXIBLE' && (
              <div className="grid gap-2">
                <Label htmlFor="deposit">Min Deposit (%)</Label>
                <Input
                  type="number"
                  id="deposit"
                  value={formData.min_deposit_percentage}
                  onChange={e => setFormData({ ...formData, min_deposit_percentage: Number(e.target.value) })}
                />
              </div>
            )}

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Status Toggle */}
            <div className="flex items-center justify-between space-x-2 border rounded-md p-3">
              <Label htmlFor="active" className="flex flex-col gap-1">
                <span>Active Status</span>
                <span className="font-normal text-muted-foreground text-xs">Allow this option to be used in new products.</span>
              </Label>
              <Switch
                id="active"
                checked={formData.is_active}
                onCheckedChange={checked => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isEditMode ? 'Update' : 'Create'} Option
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

 
