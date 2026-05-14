import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle,DialogDescription, DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import LoadingComponent from './loading-component'
import { useCreateSite, useUpdateSite } from '@/hooks/useSiteManagement'

const CreateSiteDialog = ({isCreateDialogOpen, setIsCreateDialogOpen, siteToEdit, setSelectedSite}) => {
  const isEditMode = !!siteToEdit;
    const [newBranchData, setNewBranchData] = useState({
        name: "",
        address: "",
      });
      useEffect(()=>{
        if(isEditMode){
          setNewBranchData({ name: siteToEdit?.name, address: siteToEdit?.address });
        }
      },[siteToEdit])
    const {mutate:createSite, isPending:isCreating} = useCreateSite();
    const { mutate: updateSite, isPending: isUpdating } = useUpdateSite(); 
    const isPending = isCreating || isUpdating;
    const handleCreateSite = () => {
        if (!newBranchData.name.trim() || !newBranchData.address.trim()) return;
        const formData = new FormData();
        formData.append('name',newBranchData.name.trim());
        formData.append('address',newBranchData.address.trim());
        const successCallback = () => {
        setNewBranchData({ name: "", address: "" });
        setIsCreateDialogOpen(false);
        if(isEditMode){
          setSelectedSite(null)
        }
    };

    if (isEditMode) {
        updateSite(
            { identity: siteToEdit.identity, formData },
            { onSuccess: successCallback }
        );
    } else {
        createSite(
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
              Create Site
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Edit Site' : 'Create New Site'}</DialogTitle>
              <DialogDescription>
                {isEditMode 
          ? `Modify the details for ${newBranchData.name}.`
          : 'Add a new site location to your company.'
      }
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="branchName">Site Name</Label>
                <Input
                  id="branchName"
                  required
                  value={newBranchData.name}
                  onChange={(e) => setNewBranchData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter site name..."
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
              <Button onClick={handleCreateSite} disabled={isPending}>{isPending ? <LoadingComponent/> : (isEditMode ? 'Save Changes' : 'Create Site')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
}

export default CreateSiteDialog