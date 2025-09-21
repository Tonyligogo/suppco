import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, User, Calendar, Clock } from "lucide-react";

export function BranchDetails({ branch, onBack }) {
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
        <h1 className="text-2xl font-semibold">{branch.name}</h1>
        <p className="text-muted-foreground">Branch Details</p>
    </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Branch Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Branch Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="mt-1">
                <Badge className={getStatusColor(branch.status)}>
                  {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Address</label>
              <p className="mt-1">{branch.address}</p>
              <p className="text-sm text-muted-foreground">
                {branch.city}, {branch.state} {branch.zipCode}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p className="mt-1">{branch.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Employee Count</label>
              <p className="mt-1">{branch.employeeCount} employees</p>
            </div>
          </CardContent>
        </Card>

        {/* Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Branch Manager</label>
              <p className="mt-1 font-medium">{branch.manager}</p>
              <p className="text-sm text-muted-foreground">{branch.managerEmail}</p>
            </div>
            <div className="pt-4">
              <Button variant="outline" className="w-full">
                Contact Manager
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Activity */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Activity & Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Created
                </label>
                <p className="mt-1">{new Date(branch.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Last Activity
                </label>
                <p className="mt-1">{new Date(branch.lastActivity).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-3">
        <Button>Edit Branch</Button>
        <Button variant="outline">Invite Manager</Button>
        <Button variant="destructive">Deactivate Branch</Button>
      </div>
    </div>
  );
}