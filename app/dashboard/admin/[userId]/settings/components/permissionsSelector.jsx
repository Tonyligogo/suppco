'use client';

import { useState } from 'react';
import { PERMISSION_GROUPS } from '@/lib/permissions';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

function formatPermissionName(codename) {
  return codename
    .replace("can_", "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function PermissionsSelector({ onSubmit, isLoading }) {
  const [groupKey, setGroupKey] = useState(null);
  const [permission, setPermission] = useState(null);

  const group = PERMISSION_GROUPS.find(g => g.key === groupKey);

  const handleCreate = () => {
    if (!permission) return;

    const payload = {
      codename: permission,
      name: formatPermissionName(permission),
    };

    onSubmit?.(payload);
  };

  return (
    <div className="space-y-4">

      {/* Select Group */}
      <Select onValueChange={setGroupKey}>
        <SelectTrigger>
          <SelectValue placeholder="Select permission group" />
        </SelectTrigger>
        <SelectContent>
          {PERMISSION_GROUPS.map(group => (
            <SelectItem key={group.key} value={group.key}>
              {group.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Select Permission */}
      {group && (
        <Select onValueChange={setPermission}>
          <SelectTrigger>
            <SelectValue placeholder="Select permission" />
          </SelectTrigger>
          <SelectContent>
            {group.permissions.map(p => (
              <SelectItem key={p.value} value={p.value}>
                {formatPermissionName(p.value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Button onClick={handleCreate} disabled={!permission || isLoading}>
        {isLoading ? "Creating..." : "Create Permission"}
        </Button>
    </div>
  );
}