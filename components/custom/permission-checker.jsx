import { usePermissions } from "@/providers/PermissionsProvider";

export function Can({ permission, children }) {
  const { hasPermission } = usePermissions();
  if (!hasPermission(permission)) return null;
  return children;
};
