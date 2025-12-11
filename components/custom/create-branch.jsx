import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle,DialogDescription, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useCreateBranch, useUpdateBranch } from '@/hooks/(branch)/useBranchManagement'
import LoadingComponent from './loading-component'

const CreateBranchDialog = ({isCreateDialogOpen, setIsCreateDialogOpen, branchToEdit, setSelectedBranch}) => {
  const isEditMode = !!branchToEdit;
  console.log(branchToEdit,'ntr')
    const [newBranchData, setNewBranchData] = useState({
        name: "",
        address: "",
      });
      useEffect(()=>{
        if(isEditMode){
          setNewBranchData({ name: branchToEdit?.name, address: branchToEdit?.address });
        }
      },[branchToEdit])
    const {mutate:createBranch, isPending:isCreating} = useCreateBranch();
    const { mutate: updateBranch, isPending: isUpdating } = useUpdateBranch(); 
    const isPending = isCreating || isUpdating;
    const handleCreateBranch = () => {
        if (!newBranchData.name.trim() || !newBranchData.address.trim()) return;
        const formData = new FormData();
        formData.append('name',newBranchData.name.trim());
        formData.append('address',newBranchData.address.trim());
        const successCallback = () => {
        setNewBranchData({ name: "", address: "" });
        setIsCreateDialogOpen(false);
        if(isEditMode){
          setSelectedBranch(null)
        }
    };

    if (isEditMode) {
        updateBranch(
            { identity: branchToEdit.identity, formData },
            { onSuccess: successCallback }
        );
    } else {
        createBranch(
            { formData },
            { onSuccess: successCallback }
        );
    }
};
  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Branch
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Edit Branch' : 'Create New Branch'}</DialogTitle>
              <DialogDescription>
                {isEditMode 
          ? `Modify the details for ${newBranchData.name}.`
          : 'Add a new branch location to your company.'
      }
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="branchName">Branch Name</Label>
                <Input
                  id="branchName"
                  required
                  value={newBranchData.name}
                  onChange={(e) => setNewBranchData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter branch name..."
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchAddress">Address</Label>
                <Textarea
                  id="branchAddress"
                  required
                  value={newBranchData.address}
                  onChange={(e) => setNewBranchData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter full address..."
                  disabled={isPending}
                />
              </div>              
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button onClick={handleCreateBranch} disabled={isPending}>{isPending ? <LoadingComponent/> : (isEditMode ? 'Save Changes' : 'Create Branch')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
}

export default CreateBranchDialog