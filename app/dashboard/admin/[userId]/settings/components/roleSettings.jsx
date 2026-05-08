'use client';

import { useAllPermissions, useCreatePermission } from "@/hooks/(roles)/useRoleManagement";
import { PermissionsSelector } from "./permissionsSelector";
import Header from "@/components/custom/Header";
import { PermissionsList } from "./permissionsList";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function RolesSettings() {
  const { data: permissions, isLoading } = useAllPermissions();
  const { mutate: createPermission, isPending } = useCreatePermission();

  return (
    <div className="space-y-6">
      <Header
        title="Permissions Settings"
        description="Manage available permissions in the app"
      />

      <Tabs defaultValue="list" className="w-full">
        
        {/* Tabs Header */}
        <TabsList>
          <TabsTrigger value="list">Available Permissions</TabsTrigger>
          <TabsTrigger value="create">Create Permission</TabsTrigger>
        </TabsList>

        {/* List Tab */}
        <TabsContent value="list" className="mt-4">
          {isLoading ? (
            <p className="text-muted-foreground">Loading permissions...</p>
          ) : (
            <PermissionsList permissions={permissions} />
          )}
        </TabsContent>

        {/* Create Tab */}
        <TabsContent value="create" className="mt-4">
          <PermissionsSelector
            onSubmit={(data) => {
              createPermission(data);
            }}
            isLoading={isPending}
          />
        </TabsContent>

      </Tabs>
    </div>
  );
}