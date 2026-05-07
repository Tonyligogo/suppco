'use client';

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function PermissionsList({ permissions = [] }) {

  const grouped = useMemo(() => {
    const map = {};

    permissions.forEach((perm) => {
      const group = getPermissionGroup(perm.codename);

      if (!map[group]) map[group] = [];
      map[group].push(perm);
    });

    return map;
  }, [permissions]);

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([group, perms]) => (
        <Card key={group}>
          <CardHeader>
            <CardTitle>{group} Permissions</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {perms.map((perm) => (
              <div
                key={perm.reference}
                className="flex items-center justify-between border rounded-lg p-3"
              >
                <div>
                  <p className="font-medium">{perm.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {perm.codename}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function getPermissionGroup(codename) {
  if (codename.includes("branch")) return "Branch";
  if (codename.includes("employee") || codename.includes("role")) return "Employee";
  if (codename.includes("order")) return "Order";
  if (codename.includes("inventory")) return "Inventory";
  if (codename.includes("product")) return "Product";
  if (codename.includes("quotation")) return "Quotation";
  if (codename.includes("invoice")) return "Invoice";
  return "Other";
}