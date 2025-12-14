import { PermissionCheckbox } from "./permission-checkbox";

export const PermissionsGroup = ({
  groupedPermissions,
  selectedPermissions,
  onPermissionChange,
}) => {
  return (
    <div className="space-y-4">
      {Object.entries(groupedPermissions).map(([groupName, actions]) => 
        (
        <div key={groupName}>
          <div className="flex items-center gap-2 mb-3">
            <h4 className="text-sm font-semibold text-foreground">{groupName}</h4>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(actions).map(([action, permission]) => 
                (
                    <PermissionCheckbox
                      key={permission.codename}
                      action={action}
                      permissionCodeName={permission.codename}
                      checked={selectedPermissions.includes(permission.codename)}
                      onCheckedChange={(checked) =>
                        onPermissionChange(permission.codename, checked)
                      }
                    />
                )
            )}
          </div>
        </div>
      )
      )}
    </div>
  );
};
