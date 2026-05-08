"use client";
import { useState } from "react";
import { CreateEmployee } from "@/components/custom/create-employee";
import { DataTable } from "@/components/custom/DataTable";
import Header from "@/components/custom/Header";
import TableSkeleton from "@/components/custom/table-skeleton";
import {
  useAllEmployees,
  useAssignEmployeeToBranch,
  useUnassignEmployee,
} from "@/hooks/(employee)/useEmployeeManagement";
import { SquarePen, X } from "lucide-react";
import DynamicDialog from "@/components/custom/dynamic-dialog";
import { useCompanyBranches } from "@/hooks/(branch)/useBranchManagement";
import { employeeColumns } from "@/TableColumns";
import ConfirmDialog from "@/components/custom/confirm-dialog";

const Employees = () => {
  const { data: employees, isPending } = useAllEmployees();
  const { data: branches } = useCompanyBranches();
  const { mutate: assignEmployee, isPending: isAssigning } =
    useAssignEmployeeToBranch();
  const { mutate: unassignEmployee, isPending: isUnassigning } =
    useUnassignEmployee();
  const [unassignDialogOpen, setUnassignDialogOpen] = useState(false);
  const [employeeToUnassign, setEmployeeToUnassign] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleRowAction = (action, employee) => {
    if (action === "assignBranch") {
      setSelectedEmployee(employee);
      setDialogOpen(true);
    }
    if (action === "unassignBranch") {
      setEmployeeToUnassign(employee);
      setUnassignDialogOpen(true);
    }
  };

  const handleAssignSubmit = (formData) => {
    if (!selectedEmployee) return;
    assignEmployee(
      {
        employee_username: selectedEmployee.user,
        branch: formData.branch,
      },
      {
        onSuccess: () => {
          setDialogOpen(false);
          setSelectedEmployee(null);
        },
      },
    );
  };

  const branchOptions =
    branches?.map((b) => ({
      label: b.name,
      value: b.identity,
    })) ?? [];

  const assignFields = [
    {
      name: "branch",
      label: "Branch",
      type: "select",
      placeholder: "Select a branch...",
      options: branchOptions,
      required: true,
    },
  ];

  if (isPending) {
    return (
      <div className="pt-6">
        <Header
          title="All Employees"
          description="Manage your employees across all branches."
        />
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-4 relative">
      <Header
        title="All Employees"
        description="Manage your employees across all branches."
      />
      <div className="absolute right-2">
        <CreateEmployee />
      </div>

      <DataTable
        data={employees}
        columns={employeeColumns}
        title="Employee Management"
        searchPlaceholder="Search employees by name, email, role, or branch..."
        onRowAction={handleRowAction}
        rowActions={[
          { action: "assignBranch", label: "Assign branch", icon: SquarePen },
          { action: "unassignBranch", label: "Unassign", icon: X },
        ]}
      />

      <DynamicDialog
        isOpen={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setSelectedEmployee(null);
        }}
        title={`Assign branch — ${selectedEmployee?.user_detail ?? ""}`}
        description="Select a branch to assign this employee to. This will remove any existing branch assignment."
        fields={assignFields}
        onSubmit={handleAssignSubmit}
        submitText={isAssigning ? "Assigning..." : "Assign branch"}
      />
      <ConfirmDialog
        open={unassignDialogOpen}
        onOpenChange={setUnassignDialogOpen}
        title={`Unassign ${employeeToUnassign?.name ?? "this employee"}?`}
        description={
          <>
            This will remove{" "}
            <span className="font-medium text-foreground">
              {employeeToUnassign?.name}
            </span>{" "}
            from their current branch. You can reassign them at any time.
          </>
        }
        confirmText="Yes, unassign"
        isPending={isUnassigning}
        onConfirm={() =>
          unassignEmployee(
            { employee_username: employeeToUnassign?.user },
            {
              onSuccess: () => {
                setUnassignDialogOpen(false);
                setEmployeeToUnassign(null);
              },
            },
          )
        }
        onCancel={() => setEmployeeToUnassign(null)}
      />
    </div>
  );
};

export default Employees;

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
          <p>
            <span className="font-medium">Email:</span> {employee.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {employee.phone}
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Work Information</h4>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">Role:</span> {employee.role}
          </p>
          <p>
            <span className="font-medium">Department:</span>{" "}
            {employee.department}
          </p>
          <p>
            <span className="font-medium">Branch:</span> {employee.branch}
          </p>
          <p>
            <span className="font-medium">Status:</span>
            <Badge
              variant={employee.status === "Active" ? "default" : "secondary"}
              className="ml-1"
            >
              {employee.status}
            </Badge>
          </p>
          <p>
            <span className="font-medium">Start Date:</span>{" "}
            {new Date(employee.startDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  </div>
);
