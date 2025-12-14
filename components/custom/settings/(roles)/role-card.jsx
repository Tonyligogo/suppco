import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Shield, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { groupPermissions } from './permissions';
import { PermissionsGroup } from './permissions-group';

export const RoleCard = ({ role, permissions, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  const groupedPermissions = groupPermissions(permissions);

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-foreground">{role.name}</h3>
              <Badge variant="outline" className="font-normal">
                <Shield className="h-3 w-3 mr-1" />
                {role.permissions.length} permissions
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(role.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-1"
            >
              {isExpanded ? (
                <>
                  Collapse <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Expand <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 animate-fade-in">
          <div className="flex gap-2 mb-4 border-b border-border">
            
            <button
              onClick={() => setActiveTab('permissions')}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
                activeTab === 'permissions'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              Permissions ({role.permissions.length})
            </button>
          </div>

          
            <PermissionsGroup
              groupedPermissions={groupedPermissions}
              selectedPermissions={role.permissions}
              onPermissionChange={() => {}}
            />
        </CardContent>
      )}
    </Card>
  );
};
