import { Check } from "lucide-react";

export function StepIndicator({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-between w-full max-w-xl mx-auto mb-10">
      {steps.map((step, index) => {
        const isComplete = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div key={step.number} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isActive ? "scale-110" : "scale-100"
                } ${
                  isComplete
                    ? "bg-accent text-gray-400"
                    : isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {isComplete ? <Check className="w-5 h-5" /> : step.number}
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-primary"
                    : isComplete
                    ? "text-gray-400"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-3 mt-[-1.5rem]">
                <div className="h-0.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-400 ease-in-out"
                    style={{ width: isComplete ? "100%" : "0%" }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
