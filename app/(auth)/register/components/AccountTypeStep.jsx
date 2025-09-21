import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AccountTypeSelector } from "./AccountTypeSelect";

export const AccountTypeStep = ({ selectedType, onTypeChange, onNext }) => {
  return (
    <div className="w-full">
      <p className="text-2xl font-bold text-center">Choose your account type</p>
      <p className="text-muted-foreground text-center">Select the type of account that best describes you</p>
      <div className="space-y-6 mt-6">
      <AccountTypeSelector
            value={selectedType}
            onValueChange={onTypeChange}
          />
          
          <Button
            onClick={onNext}
            disabled={!selectedType}
            className="w-full"
            size="lg"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
      </div>
    </div>
  );
};