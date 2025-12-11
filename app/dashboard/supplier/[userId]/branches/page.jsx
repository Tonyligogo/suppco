'use client';

import CreateBranchDialog from "@/components/custom/create-branch";
import { DataTable } from "@/components/custom/DataTable";
import Header from "@/components/custom/Header";
import LoadingComponent from "@/components/custom/loading-component";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCompanyBranches } from "@/hooks/(branch)/useBranchManagement";
import { branchesData } from "@/MockData";
import { branchesColumns } from "@/TableColumns";
import { SquarePen } from "lucide-react";
import { useState } from "react";

const Branches = () => {
  const {data:branches, isPending} = useCompanyBranches();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const handleRowAction = (action, row) => {
    if (action === "view") {
      setSelectedBranch(row);
    } else if (action === "invite") {
      setSelectedBranch(row);
    }else if(action === 'edit'){
      setSelectedBranch(row);
      setIsCreateDialogOpen(true);
    }
  };
    
      return (
        <div className="space-y-6 pt-4">
          <div className="flex border-b pb-2 flex-col md:flex-row md:justify-between md:items-center">
        <div>
        <h1 className="text-2xl font-semibold">Branches Management</h1>
        <p className="text-muted-foreground">Manage your company branches and their managers.</p>
    </div>
        <CreateBranchDialog isCreateDialogOpen={isCreateDialogOpen} setIsCreateDialogOpen={setIsCreateDialogOpen} branchToEdit={selectedBranch} setSelectedBranch={setSelectedBranch}/>
      </div>
    
          {isPending ?
          <LoadingComponent/> 
          :
            <DataTable
            data={branches}
            columns={branchesColumns}
            title="Branch Locations"
            searchPlaceholder="Search branches..."
            onRowAction={handleRowAction}
            rowActions={[
          // { action: "view", label: "View Details", icon: Eye },
          { action: "edit", label: "Edit branch", icon: SquarePen },
        ]}
          />}
        </div>
      )
}

export default Branches