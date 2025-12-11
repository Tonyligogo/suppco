import { useState } from "react";
import { DataTable} from "@/components/custom/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, SquarePen } from "lucide-react";
import { BranchDetails } from "./BranchDetails";
import toast from "react-hot-toast";
import { branchesColumns } from "@/TableColumns";
import CreateBranchDialog from "../create-branch";
import { useCompanyBranches } from "@/hooks/(branch)/useBranchManagement";
import LoadingComponent from "../loading-component";

export function BranchesSettings() {
  const {data:branches, isPending} = useCompanyBranches();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showBranchDetails, setShowBranchDetails] = useState(false);

  const [inviteData, setInviteData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    message: "",
  });

  const handleRowAction = (action, row) => {
    if (action === "view") {
      setSelectedBranch({
        ...row,
        address: row.address,
        city: row.address.split(',')[1]?.trim() || "",
        state: row.address.split(',')[2]?.trim().split(' ')[0] || "",
        zipCode: row.address.split(',')[2]?.trim().split(' ')[1] || "",
        managerEmail: row.managerEmail,
        phone: row.phone,
        status: row.status,
        createdAt: row.establishedDate,
        lastActivity: row.establishedDate,
        employeeCount: row.employees,
        manager: row.manager,
      });
      setShowBranchDetails(true);
    } else if (action === "invite") {
      setSelectedBranch(row);
      setIsInviteDialogOpen(true);
    }else if(action === 'edit'){
      setSelectedBranch(row);
      setIsCreateDialogOpen(true);
    }
  };

  const handleBackToBranches = () => {
    setShowBranchDetails(false);
    setSelectedBranch(null);
  };

  const handleSendInvite = () => {
    toast.success('Invitation sent')
    setIsInviteDialogOpen(false);
    setInviteData({ email: "", firstName: "", lastName: "", message: "" });
  };

  // Show branch details if selected
  if (showBranchDetails && selectedBranch) {
    return <BranchDetails branch={selectedBranch} onBack={handleBackToBranches} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="pb-3 mb-5">
        <h1 className="text-2xl font-semibold">Branches Management</h1>
        <p className="text-muted-foreground">Manage your company branches and their managers.</p>
    </div>
        <CreateBranchDialog isCreateDialogOpen={isCreateDialogOpen} setIsCreateDialogOpen={setIsCreateDialogOpen} branchToEdit={selectedBranch} setSelectedBranch={setSelectedBranch}/>
      </div>

      {/* Invite Manager Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Branch Manager</DialogTitle>
            <DialogDescription>
              Invite someone to manage {selectedBranch?.name}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={inviteData.firstName}
                  onChange={(e) => setInviteData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={inviteData.lastName}
                  onChange={(e) => setInviteData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inviteEmail">Email Address</Label>
              <Input
                id="inviteEmail"
                type="email"
                value={inviteData.email}
                onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="manager@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inviteMessage">Personal Message (Optional)</Label>
              <Textarea
                id="inviteMessage"
                value={inviteData.message}
                onChange={(e) => setInviteData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Add a personal message to the invitation..."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendInvite}>
              <Mail className="mr-2 h-4 w-4" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isPending ? 
      <LoadingComponent/>
      :
      <DataTable
        data={branches}
        columns={branchesColumns}
        title="Company Branches"
        searchPlaceholder="Search branches..."
        onRowAction={handleRowAction}
        rowActions={[
          // { action: "view", label: "View Details", icon: Eye },
          { action: "edit", label: "Edit branch", icon: SquarePen },
        ]}
      />}
    </div>
  );
}