import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AccountTypeSelector } from "./AccountTypeSelect";

export const AccountTypeStep = ({ selectedType, onTypeChange, onNext }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-elegant border-border/50">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Choose your account type</CardTitle>
          <CardDescription className="text-muted-foreground">
            Select the type of account that best describes you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>
    </div>
  );
};