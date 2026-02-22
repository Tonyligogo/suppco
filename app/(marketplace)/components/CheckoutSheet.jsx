import { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Check,
  User,
  Mail,
  Phone,
  MapPin,
  Loader2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useMarketplace } from "../context/MarketplaceContext";
import { useSession } from "next-auth/react";
import { useCreateOrder } from "@/hooks/(payments)/usePaymentManagement";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

export function CheckoutSheet({ open, onOpenChange, onBack }) {
  const { cartItems, cartTotal, clearCart, totals } = useMarketplace();
  const { data: session } = useSession();
  const user = session?.user;
  const isLoggedIn = !!user;
  const [formData, setFormData] = useState(initialFormData);
  const [paymentPlans, setPaymentPlans] = useState({});
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form");
  const { mutate: createOrder } = useCreateOrder();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleClose = () => {
    setStep("form");
    setFormData(initialFormData);
    setErrors({});
    onOpenChange(false);
  };

  const handleBackToShopping = () => {
    handleClose();
  };

  const updatePaymentPlan = (productRef, field, value) => {
    setPaymentPlans((prev) => ({
      ...prev,
      [productRef]: {
        ...prev[productRef],
        [field]: value,
      },
    }));
  };

  const validatePaymentPlans = () => {
    for (const item of cartItems) {
      const plan = paymentPlans[item.product.reference];

      if (!plan?.paymentOptionRef || !plan?.amount) {
        return false;
      }
    }
    return true;
  };

  const handleCheckout = async () => {
    setStep("processing");

    try {
      createOrder(undefined, {
        onSuccess: (orders) => {
          clearCart();
          setStep("success");
          console.log("Orders created:", orders);
        },
        onError: () => {
          toast.error("Checkout failed");
          setStep("form");
        },
      });
    } catch (error) {
      toast.error("Checkout failed");
      setStep("form");
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0 overflow-auto">
        {step === "success" ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 animate-in zoom-in-50 duration-300">
              <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2 animate-in fade-in slide-in-from-bottom-4 duration-300 delay-100">
              Order Confirmed!
            </h2>
            <p className="text-muted-foreground mb-2 animate-in fade-in slide-in-from-bottom-4 duration-300 delay-150">
              Thank you for your order.
            </p>
            <p className="text-sm text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-300 delay-200">
              A confirmation email has been sent to{" "}
              <span className="font-medium text-foreground">
                {isLoggedIn ? user?.email : formData.email}
              </span>
            </p>
            <div className="w-full max-w-xs space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300 delay-300">
              <Button
                className="w-full"
                size="lg"
                onClick={handleBackToShopping}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : step === "processing" ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-6" />
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              Processing your order...
            </h2>
            <p className="text-sm text-muted-foreground">
              Please wait while we confirm your payment.
            </p>
          </div>
        ) : (
          <>
            <SheetHeader className="px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={onBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <SheetTitle className="font-display flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Checkout
                </SheetTitle>
              </div>
            </SheetHeader>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {/* Login Toggle */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                        isLoggedIn ? "bg-primary/10" : "bg-muted",
                      )}
                    >
                      <User
                        className={cn(
                          "h-5 w-5 transition-colors",
                          isLoggedIn ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {isLoggedIn ? user.email : "Guest checkout"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logged-in user info or Guest form */}
                {isLoggedIn ? null : (
                  <div className="space-y-4">
                    <h3 className="font-medium text-foreground">
                      Contact Information
                    </h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className={cn(errors.name && "border-destructive")}
                        />
                        {errors.name && (
                          <p className="text-xs text-destructive">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className={cn(errors.email && "border-destructive")}
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            className={cn(errors.phone && "border-destructive")}
                          />
                          {errors.phone && (
                            <p className="text-xs text-destructive">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <h3 className="font-medium text-foreground">
                      Shipping Address
                    </h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          placeholder="123 Main Street, Apt 4B"
                          value={formData.address}
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                          className={cn(errors.address && "border-destructive")}
                        />
                        {errors.address && (
                          <p className="text-xs text-destructive">
                            {errors.address}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            placeholder="New York"
                            value={formData.city}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
                            className={cn(errors.city && "border-destructive")}
                          />
                          {errors.city && (
                            <p className="text-xs text-destructive">
                              {errors.city}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Postal Code *</Label>
                          <Input
                            id="postalCode"
                            placeholder="10001"
                            value={formData.postalCode}
                            onChange={(e) =>
                              handleInputChange("postalCode", e.target.value)
                            }
                            className={cn(
                              errors.postalCode && "border-destructive",
                            )}
                          />
                          {errors.postalCode && (
                            <p className="text-xs text-destructive">
                              {errors.postalCode}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          placeholder="United States"
                          value={formData.country}
                          onChange={(e) =>
                            handleInputChange("country", e.target.value)
                          }
                          className={cn(errors.country && "border-destructive")}
                        />
                        {errors.country && (
                          <p className="text-xs text-destructive">
                            {errors.country}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Summary */}
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Order Summary</h3>
                  <div className="space-y-2 p-4 rounded-lg bg-muted/30 border border-border">
                    {cartItems.map((item) => {
                      const productRef = item.product_reference;

                      return (
                        <div
                          key={productRef}
                          className="space-y-3 p-4 rounded-lg border border-border bg-background"
                        >
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.product_name} × {item.quantity}
                            </span>
                          </div>

                          {/* Payment Option */}
                          <div className="space-y-1">
                            <Label>Payment Option</Label>
                            <Input
                              readOnly
                              value={item?.payment_option_details?.payment_type}
                            />
                          </div>
                          {/* Amount */}
                          <div className="space-y-1">
                            <Label>Amount to Pay</Label>
                            <Input
                              readOnly
                              value={`Ksh${item.payable_amount.toFixed(2)}`}
                            />
                          </div>
                        </div>
                      );
                    })}

                    <Separator className="my-3" />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Subtotal
                      </span>
                      <span className="text-foreground font-medium">
                        Ksh {totals.sub_total.toFixed(2)}
                      </span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">
                        Total
                      </span>
                      <span className="font-display text-lg font-bold text-foreground">
                        Ksh {totals.sub_total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            {/* Checkout Button */}
            <div className="p-6 border-t border-border">
              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {isLoggedIn ? "Complete Order" : "Place Order as Guest"}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-3">
                By placing your order, you agree to our Terms of Service
              </p>
            </div>

          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
