import { useAllPermissions, useAllRoles, useCreateRole } from "@/hooks/(roles)/useRoleManagement"
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { RoleCard } from "./(roles)/role-card";
import { CreateRoleModal } from "./(roles)/create-role-modal";
import toast from "react-hot-toast";
import { useCompanyInfo } from "@/hooks/(company)/useCompanyManagement";
import LoadingComponent from "../loading-component";

export const mockUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: '3', name: 'Carol Williams', email: 'carol@example.com' },
  { id: '4', name: 'David Brown', email: 'david@example.com' },
  { id: '5', name: 'Eva Martinez', email: 'eva@example.com' },
  { id: '6', name: 'Frank Lee', email: 'frank@example.com' },
  { id: '7', name: 'Grace Kim', email: 'grace@example.com' },
  { id: '8', name: 'Henry Chen', email: 'henry@example.com' },
];

export function RolesSettings() {
    const {data:permissions} = useAllPermissions()
    const {data:allRoles} = useAllRoles()
    const { data: companyInfo } = useCompanyInfo();
  const [roles, setRoles] = useState(allRoles ? allRoles :[]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [availableUsers] = useState(mockUsers);
  const {mutate:createRole, isPending:isCreatingRole} = useCreateRole()
  useEffect(()=>{
    if(allRoles){
        setRoles(allRoles)
    }
  },[allRoles])

  const handleCreateRole = (roleData) => {
    if(!companyInfo.identity) return
    const data = {
        company:companyInfo.identity,
        ...roleData
    }
    createRole(data)
  };

  const handleDeleteRole = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    setRoles((prev) => prev.filter((r) => r.id !== roleId));
    toast.success(`Role "${role?.name}" deleted`);
  };

  const handleRemoveUser = (roleId, userId) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === roleId
          ? { ...role, users: role.users.filter((u) => u.id !== userId) }
          : role
      )
    );
    toast.success('User removed from role');
  };

//   const totalUsers = roles.reduce((acc, role) => acc + role.users.length, 0);
  const totalPermissions = permissions?.length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">
                  Roles & Permissions
                </h1>
                <p className="text-muted-foreground">
                  Manage access control for your application
                </p>
              </div>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Role
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {isCreatingRole ? 
        (
            <div className="flex bg-primary/10 py-4 rounded-lg border border-dashed border-primary text-primary items-center justify-center gap-2 mb-5">
                <LoadingComponent/>
                <p className="text-center">Creating a new role</p>
            </div>
        )
         :null}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-lg border border-border p-5">
            <p className="text-sm text-muted-foreground mb-1">Total Roles</p>
            <p className="text-3xl font-bold text-foreground">{roles?.length}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-5">
            <p className="text-sm text-muted-foreground mb-1">Permissions</p>
            <p className="text-3xl font-bold text-foreground">{totalPermissions}</p>
          </div>
        </div>

        <div className="space-y-4">
          {roles?.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-medium text-foreground mb-2">
                No roles created yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Create your first role to start managing permissions
              </p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Role
              </Button>
            </div>
          ) : (
            roles?.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                permissions={permissions}
                onDelete={handleDeleteRole}
                onRemoveUser={handleRemoveUser}
              />
            ))
          )}
        </div>
      </main>

      <CreateRoleModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        permissions={permissions}
        users={availableUsers}
        onCreateRole={handleCreateRole}
      />
    </div>
  );
};
