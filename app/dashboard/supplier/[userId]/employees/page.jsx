'use client';

import { CreateEmployee } from "@/components/custom/create-employee";
import { DataTable } from "@/components/custom/DataTable";
import Header from "@/components/custom/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAllEmployees } from "@/hooks/(employee)/useEmployeeManagement";
import { getInitials } from "@/lib/utils";
import { employeeData } from "@/MockData";
import { employeeColumns } from "@/TableColumns";

const Employees = () => {
  const {data:employees} = useAllEmployees()
    const handleRowAction = (action, employee) => {
        console.log(`Action: ${action}`, employee);
        // Handle different actions here
      };
  return (
    <div className="space-y-6 relative">
        <Header title='All Employees' description='Manage your employees across all branches.'/>
        <div className="absolute right-2"> <CreateEmployee/> </div>
        <DataTable
          data={employeeData}
          columns={employeeColumns}
          title="Employee Management"
          searchPlaceholder="Search employees by name, email, role, or branch..."
          onRowAction={handleRowAction}
          renderDetailView={renderDetailView}
        />
    </div>
  )
}

export default Employees

const renderDetailView = (employee) => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={employee.avatarUrl} alt={employee.name} />
          <AvatarFallback 
            style={{ backgroundColor: getRandomColor() }}
            className="text-white font-semibold text-lg"
          >
            {getInitials(employee.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">{employee.name}</h3>
          <p className="text-muted-foreground">{employee.id}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Contact Information</h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Email:</span> {employee.email}</p>
            <p><span className="font-medium">Phone:</span> {employee.phone}</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Work Information</h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Role:</span> {employee.role}</p>
            <p><span className="font-medium">Department:</span> {employee.department}</p>
            <p><span className="font-medium">Branch:</span> {employee.branch}</p>
            <p><span className="font-medium">Status:</span> 
              <Badge variant={employee.status === "Active" ? "default" : "secondary"} className="ml-1">
                {employee.status}
              </Badge>
            </p>
            <p><span className="font-medium">Start Date:</span> {new Date(employee.startDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );