import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, User } from "lucide-react";

export function BranchDetails({ branch }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
        <div className="border-t">
        <h1 className="text-2xl font-semibold pt-2">{branch.name}</h1>
        <p className="text-muted-foreground">Branch Details</p>
    </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Branch Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {branch.sattus && <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="mt-1">
                <Badge className={getStatusColor(branch.status)}>
                  {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
                </Badge>
              </div>
            </div>}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Parent Company</label>
              <p className="mt-1">{branch.company}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Address</label>
              <p className="mt-1">{branch.address}</p>
              <p className="text-sm text-muted-foreground">
                {branch?.city} {branch?.state} {branch?.zipCode}
              </p>
            </div>
            {branch.phone && <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p className="mt-1">{branch?.phone}</p>
            </div>}
            {branch?.employeeCount && <div>
              <label className="text-sm font-medium text-muted-foreground">Employee Count</label>
              <p className="mt-1">{branch?.employeeCount} employees</p>
            </div>}
          </CardContent>
        </Card>

        {/* Management */}
       {branch?.manager &&  <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Branch Manager</label>
              <p className="mt-1 font-medium">{branch?.manager}</p>
              <p className="text-sm text-muted-foreground">{branch?.managerEmail}</p>
            </div>
            <div className="pt-4">
              <Button variant="outline" className="w-full">
                Contact Manager
              </Button>
            </div>
          </CardContent>
        </Card>}
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-3">
        <Button>Edit Branch</Button>
        <Button variant="outline">Invite Manager</Button>
      </div>
    </div>
  );
}