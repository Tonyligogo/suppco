"use client";

import CreateBranchDialog from "@/components/custom/create-branch";
import CreateSiteDialog from "@/components/custom/create-site";
import { DataTable } from "@/components/custom/DataTable";
import LoadingComponent from "@/components/custom/loading-component";
import { Can } from "@/components/custom/permission-checker";
import { BranchDetails } from "@/components/custom/settings/BranchDetails";
import { Button } from "@/components/ui/button";
import { useCompanySites } from "@/hooks/useSiteManagement";
import { PERMISSIONS } from "@/lib/permissions";
import { sitesColumns } from "@/TableColumns";
import { Eye, SquarePen } from "lucide-react";
import { useState } from "react";

const Sites = () => {
  const { data: sites, isPending } = useCompanySites();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const handleRowAction = (action, row) => {
    if (action === "view") {
      setSelectedSite(row);
    } else if (action === "invite") {
      setSelectedSite(row);
    } else if (action === "edit") {
      setSelectedSite(row);
      setIsCreateDialogOpen(true);
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex border-b pb-2 flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Sites Management</h1>
          <p className="text-muted-foreground">
            Manage your company sites and people.
          </p>
        </div>
        <Can
          permission={PERMISSIONS.SITE.CREATE}
          fallback={<Button disabled>Create Site</Button>}
          tooltip="You do not have permission to create a site"
        >
          <CreateSiteDialog
            isCreateDialogOpen={isCreateDialogOpen}
            setIsCreateDialogOpen={setIsCreateDialogOpen}
            siteToEdit={selectedSite}
            setSelectedSite={setSelectedSite}
          />
        </Can>
      </div>

      {isPending ? (
        <LoadingComponent />
      ) : (
        <DataTable
          data={sites}
          columns={sitesColumns}
          title="Site Locations"
          searchPlaceholder="Search sites..."
          onRowAction={handleRowAction}
          rowActions={[
            { action: "view", label: "View Details", icon: Eye, permission: PERMISSIONS.SITE.VIEW, renderDetailView: (row) => <BranchDetails branch={row} />, },
            { action: "edit", label: "Edit Site", icon: SquarePen, permission: PERMISSIONS.SITE.EDIT },
          ]}
        />
      )}
    </div>
  );
};

export default Sites;
