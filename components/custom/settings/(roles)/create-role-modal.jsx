import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { groupPermissions } from './permissions';
import { PermissionsGroup } from './permissions-group';

export const CreateRoleModal = ({
  open,
  onOpenChange,
  permissions,
  users,
  onCreateRole,
}) => {
  const [name, setName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [activeStep, setActiveStep] = useState('details');
  const [error, setError]=useState('')

  const groupedPermissions = groupPermissions(permissions);

  const handlePermissionChange = (permissionCodeName, checked) => {
    setSelectedPermissions((prev) =>
      checked ? [...prev, permissionCodeName] : prev.filter((codeName) => codeName !== permissionCodeName)
    );
    if(error){
      setError('')
    }
  };

  const handleUserChange = (userId, checked) => {
    setSelectedUsers((prev) =>
      checked ? [...prev, userId] : prev.filter((id) => id !== userId)
    );
  };

  const handleSubmit = () => {
    if(selectedPermissions.length === 0){
      setError('At least 1 permission must be selected')
      return
    }
    setError('')
    // const assignedUsers = users.filter((u) => selectedUsers.includes(u.id));
    onCreateRole({
      name,
      permissions: selectedPermissions,
    //   users: assignedUsers,
    });
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setSelectedPermissions([]);
    setSelectedUsers([]);
    setActiveStep('details');
    onOpenChange(false);
  };

  const canProceed = () => {
    if (activeStep === 'details') return name.trim().length > 0;
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Role</DialogTitle>
        </DialogHeader>

        <div className="flex gap-1 mb-4 p-1 bg-muted rounded-lg">
          {(['details', 'permissions', 'users']).map((step, index) => (
            <div
              key={step}
              className={cn(
                'flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all',
                activeStep === step
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span className="mr-2">{index + 1}.</span>
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </div>
          ))}
        </div>
          {error ? (
            <div className='bg-red-50 py-3 rounded-lg px-3 text-red-500'>
              <p>{error}</p> 
            </div>
          ) :null}
        <div className="flex-1 pr-4">
          {activeStep === 'details' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Role Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Project Manager"
                  className="focus-visible:ring-accent"
                />
              </div>
            </div>
          )}

          {activeStep === 'permissions' && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Select the permissions for this role. {selectedPermissions.length} selected.
              </p>
              <PermissionsGroup
                groupedPermissions={groupedPermissions}
                selectedPermissions={selectedPermissions}
                onPermissionChange={handlePermissionChange}
              />
            </div>
          )}

          {activeStep === 'users' && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Assign users to this role immediately. {selectedUsers.length} selected.
              </p>
              <ScrollArea className="h-72">
                {users.map((user) => (
                  <label
                    key={user.id}
                    className={cn(
                      'flex items-center mb-2 gap-3 p-3 rounded-lg border cursor-pointer transition-all',
                      selectedUsers.includes(user.id)
                        ? 'bg-primary/10'
                        : ''
                    )}
                  >
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) =>
                        handleUserChange(user.id, checked)
                      }
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </label>
                ))}
              </ScrollArea>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          {activeStep !== 'details' && (
            <Button
              variant="outline"
              onClick={() =>
                setActiveStep(activeStep === 'users' ? 'permissions' : 'details')
              }
            >
              Back
            </Button>
          )}
          {activeStep !== 'users' ? (
            <Button
              onClick={() =>
                setActiveStep(activeStep === 'details' ? 'permissions' : 'users')
              }
              disabled={!canProceed()}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Continue
            </Button>
          ) : null}
          {activeStep !== 'details' ? (
            <Button
              onClick={handleSubmit}
              disabled={!name.trim()}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Create Role
            </Button>
          ) :null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
