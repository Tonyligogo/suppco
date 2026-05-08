import { usePermissions } from "@/providers/PermissionsProvider";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function Can({ permission, permissions, requireAll = false, fallback = null, tooltip, children }) {
  const { hasPermission } = usePermissions();

  let allowed = false;

  if (permission) {
    allowed = hasPermission(permission);
  }

  if (permissions) {
    if (requireAll) {
      allowed = permissions.every(p => hasPermission(p));
    } else {
      allowed = permissions.some(p => hasPermission(p));
    }
  }

 if (allowed) return children;

  if (!fallback) return null;

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{fallback}</span>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    );
  }

  return fallback;
}
