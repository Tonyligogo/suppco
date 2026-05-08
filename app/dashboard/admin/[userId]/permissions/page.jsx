'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreatePermission } from "@/hooks/(roles)/useRoleManagement";
import { useState } from "react"

export default function Permissions() {
    const [name, setName] = useState('');
    const {mutate:createPermission, isPending} = useCreatePermission()
    const onSubmit = async () => {
        if(!name.trim()) return;
        const snakeCaseName = name.toLowerCase().replace(/ /g, '_');
        const data = {
            name,
            codename:snakeCaseName
        }
        createPermission(data)
    }
  return (

    <Card className="w-full max-w-md mt-5">
      <CardHeader>
        <CardTitle>Create Permission (Admin job)</CardTitle>
        <CardDescription>
          Add available permissions in the app
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="can create branch"
                required
                onChange={(e)=>setName(e.target.value)}
                value={name}
                disabled={isPending}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={onSubmit} disabled={isPending}>
            {isPending ? 'Creating ... ' : 'Create'}
        </Button>
      </CardFooter>
    </Card>
  )
}
