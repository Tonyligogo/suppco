"use client";

import CreateBranchDialog from "@/components/custom/create-branch";
import { DataTable } from "@/components/custom/DataTable";
import LoadingComponent from "@/components/custom/loading-component";
import { Can } from "@/components/custom/permission-checker";
import { BranchDetails } from "@/components/custom/settings/BranchDetails";
import { Button } from "@/components/ui/button";
import { useCompanyBranches } from "@/hooks/(branch)/useBranchManagement";
import { PERMISSIONS } from "@/lib/permissions";
import { branchesColumns } from "@/TableColumns";
import { Eye, SquarePen } from "lucide-react";
import { useState } from "react";

const Branches = () => {
  const { data: branches, isPending } = useCompanyBranches();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const handleRowAction = (action, row) => {
    if (action === "view") {
      setSelectedBranch(row);
    } else if (action === "invite") {
      setSelectedBranch(row);
    } else if (action === "edit") {
      setSelectedBranch(row);
      setIsCreateDialogOpen(true);
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex border-b pb-2 flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Branches Management</h1>
          <p className="text-muted-foreground">
            Manage your company branches and their managers.
          </p>
        </div>
        <Can
          permission={PERMISSIONS.BRANCH.CREATE}
          fallback={<Button disabled>Create Branch</Button>}
          tooltip="You do not have permission to create a branch"
        >
          <CreateBranchDialog
            isCreateDialogOpen={isCreateDialogOpen}
            setIsCreateDialogOpen={setIsCreateDialogOpen}
            branchToEdit={selectedBranch}
            setSelectedBranch={setSelectedBranch}
          />
        </Can>
      </div>

      {isPending ? (
        <LoadingComponent />
      ) : (
        <DataTable
          data={branches}
          columns={branchesColumns}
          title="Branch Locations"
          searchPlaceholder="Search branches..."
          onRowAction={handleRowAction}
          rowActions={[
            { action: "view", label: "View Details", icon: Eye, permission: PERMISSIONS.BRANCH.VIEW, renderDetailView: (row) => <BranchDetails branch={row} />, },
            { action: "edit", label: "Edit branch", icon: SquarePen, permission: PERMISSIONS.BRANCH.EDIT },
          ]}
        />
      )}
    </div>
  );
};

export default Branches;
