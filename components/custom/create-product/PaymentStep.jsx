import { CreditCard, ChevronLeft, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const PAYMENT_OPTIONS = [
  { value: "cash", label: "Cash", icon: "💵" },
  { value: "card", label: "Card", icon: "💳" },
  { value: "eft", label: "EFT", icon: "🏦" },
  { value: "credit", label: "Credit", icon: "📄" },
];

export function PaymentStep({
  selected,
  onChange,
  onBack,
  onSubmit,
  isSubmitting,
}) {
  const toggle = (value) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
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
        {PAYMENT_OPTIONS.map((option) => {
          const isSelected = selected.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => toggle(option.value)}
              whileTap={{ scale: 0.97 }}
              className={`relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-surface-elevated hover:border-primary/30"
              }`}
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="font-medium text-sm text-foreground">{option.label}</span>
              {isSelected && (
                <div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="px-6 h-11 gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting || selected.length === 0}
          className="px-8 h-11 font-semibold gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Product"
          )}
        </Button>
      </div>
    </div>
  );
}
