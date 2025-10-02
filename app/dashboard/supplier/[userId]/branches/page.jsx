'use client';

import { DataTable } from "@/components/custom/DataTable";
import Header from "@/components/custom/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { branchesData } from "@/MockData";
import { branchesColumns } from "@/TableColumns";

const Brnaches = () => {
    const handleRowAction = (action, row) => {
        console.log(`Action: ${action}`, row);
        // Handle different actions here
      };
    
      return (
        <div className="space-y-6">
          <Header title='Branch Management' description='Manage all branch locations, staff, and performance metrics.'/>
    
          <DataTable
            data={branchesData}
            columns={branchesColumns}
            title="Branch Locations"
            searchPlaceholder="Search branches..."
            onRowAction={handleRowAction}
            renderDetailView={renderBranchDetails}
          />
        </div>
      )
}

export default Brnaches

const renderBranchDetails = (branch) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Branch Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Branch ID:</strong> {branch.id}</div>
            <div><strong>Name:</strong> {branch.name}</div>
            <div><strong>Manager:</strong> {branch.manager}</div>
            <div><strong>Employees:</strong> {branch.employees}</div>
            <div><strong>Established:</strong> {new Date(branch.established).toLocaleDateString()}</div>
            <div><strong>Warehouse Size:</strong> {branch.warehouseSize}</div>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Phone:</strong> {branch.phone}</div>
            <div><strong>Email:</strong> {branch.email}</div>
            <div><strong>Opening Hours:</strong> {branch.openingHours}</div>
            <div><strong>Address:</strong></div>
            <div className="text-sm text-muted-foreground ml-4">{branch.address}</div>
          </CardContent>
        </Card>
      </div>
  
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Performance & Specialties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Revenue:</strong>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="p-3 bg-muted/30 rounded">
                <div className="text-sm text-muted-foreground">Monthly</div>
                <div className="text-lg font-semibold">${branch.monthlyRevenue.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-muted/30 rounded">
                <div className="text-sm text-muted-foreground">Yearly</div>
                <div className="text-lg font-semibold">${branch.yearlyRevenue.toLocaleString()}</div>
              </div>
            </div>
          </div>
          
          <div>
            <strong>Specialties:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {branch.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline">{specialty}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );