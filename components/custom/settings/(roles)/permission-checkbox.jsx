import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const actionLabels = {
  view: 'View',
  create: 'Create',
  edit: 'Edit',
  delete: 'Delete',
};

const actionColors = {
  view: 'bg-slate-50 border-slate-500',
  create: 'bg-green-50 border-green-500',
  edit: 'bg-yellow-50 border-yellow-500',
  delete: 'bg-red-50 border-red-500',
};
const checkmarkColors = {
  view: 'data-[state=checked]:bg-slate-500 data-[state=checked]:border-slate-500',
  create: 'data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500',
  edit: 'data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500',
  delete: 'data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500',
};

export const PermissionCheckbox = ({
  action,
  permissionCodeName,
  checked,
  onCheckedChange,
}) => {
  const label = actionLabels[action] || action.charAt(0).toUpperCase() + action.slice(1);
  const colorClass = actionColors[action] || 'bg-muted text-muted-foreground border-border';
    const checkmark = checkmarkColors[action] || 'bg-muted text-muted-foreground border-border';
  return (
    <label
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition-all',
        checked ? colorClass : 'bg-card border-border hover:bg-muted/50'
      )}
    >
      <Checkbox
        id={permissionCodeName}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={checkmark}
      />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
};
