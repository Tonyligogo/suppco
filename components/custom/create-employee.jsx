import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCompanyInfo } from "@/hooks/(company)/useCompanyManagement"
import { useAllRoles } from "@/hooks/(roles)/useRoleManagement"
import { Plus } from "lucide-react"
import { useState } from "react"
import { ScrollArea } from "../ui/scroll-area"
import { useCreateEmployee } from "@/hooks/(employee)/useEmployeeManagement"
import LoadingComponent from "./loading-component"

export function CreateEmployee() {
    const {data:allRoles} = useAllRoles()
        const { data: companyInfo } = useCompanyInfo();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [inputError, setInputError] = useState('')
      const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const{mutate:createEmployee, isPending} = useCreateEmployee()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!companyInfo || !allRoles) return;
        if(!email || !password){
            setInputError('Please provide a valid email and password')
            return;
        }
        const data = {
            email,
    password,
    company: companyInfo?.identity,
    role: value,
    
        }
        createEmployee({data},{
            onSuccess:()=>{
                setIsDialogOpen(false)
                setEmail('');
                setPassword('');
                setValue('')
            }
        })
        
    }

  return (
    // 1. Use onOpenChange to control the dialog state
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        
        <DialogTrigger asChild>
            {/* 2. Ensure the trigger button is type="button" to prevent submission */}
            <Button type="button"> 
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
        </DialogTrigger>

        {/* 3. Wrap the content inside the form */}
        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
                <DialogHeader>
                    <DialogTitle>Add an employee</DialogTitle>
                    <DialogDescription>
                        Invite your employees to join your company on Suppco for simpler management 
                    </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4"> {/* Added padding for better spacing */}
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={email} 
                            required 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            id="password" 
                            name="password" 
                            type="password" // Added type="password" for better security/UX
                            value={password} 
                            required 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div>
              <p className="text-sm mb-2">
                Assign a role
              </p>
              
              <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? allRoles?.find((role) => role.identity === value)?.name
            : "Select a role"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search roles..." className="h-9" />
          <CommandList>
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {allRoles?.map((role) => (
                <CommandItem
                  key={role.id}
                  value={role.identity}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {role.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === role.identity ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
            </div>
                
                <DialogFooter>
                    {/* 4. Use DialogClose on the Cancel button */}
                    <DialogClose asChild>
                        <Button variant="outline" type='button'>Cancel</Button>
                    </DialogClose>
                    
                    {/* 5. The Save button is now inside the form and will trigger onSubmit */}
                    <Button type="submit">{isPending ? <LoadingComponent/> : 'Send invite'}</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}