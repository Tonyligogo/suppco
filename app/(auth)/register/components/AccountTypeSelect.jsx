import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Building, HardHat } from "lucide-react";

export const AccountTypeSelector = ({
  value,
  onValueChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card
        className={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
          value === "contractor"
            ? "border-secondary bg-secondary/10"
            : "border-border hover:border-secondary/50"
        )}
        onClick={() => onValueChange("contractor")}
      >
        <CardContent className="flex flex-col items-center gap-3 p-4">
          <div
            className={cn(
              "rounded-full p-3 transition-colors",
              value === "contractor"
                ? "bg-secondary text-white"
                : "bg-muted text-muted-foreground"
            )}
          >
            <HardHat className="h-6 w-6" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold">Contractor</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Looking for suppliers
            </p>
          </div>
        </CardContent>
      </Card>

      <Card
        className={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
          value === "supplier"
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary/50"
        )}
        onClick={() => onValueChange("supplier")}
      >
        <CardContent className="flex flex-col items-center gap-3 p-4">
          <div
            className={cn(
              "rounded-full p-3 transition-colors",
              value === "supplier"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            )}
          >
            <Building className="h-6 w-6" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold">Supplier</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Offering services
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};