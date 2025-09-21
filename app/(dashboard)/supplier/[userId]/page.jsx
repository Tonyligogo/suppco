import { ChartAreaDefault } from "@/components/custom/chart-area";
import { ChartBarLabel } from "@/components/custom/chart-bar-label";
import Header from "@/components/custom/Header";
import { HorizontalChartBar } from "@/components/custom/horizontal-chart-bar";
import { Eye, Mail, Package, Plus, Users, Warehouse } from "lucide-react";
import Link from "next/link";

const Supplier = ({params:{userId}}) => {
  return (
    <div>
      <Header
        title="Overview"
        description="Have a quick look on how everything is going"
      />
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-4 space-y-5">
          <div className="md:border rounded-xl md:p-6">
            <p className="text-lg text-muted-foreground">Quick Sales Analytics</p>
            <div className="mt-4 flex flex-col lg:flex-row gap-4">
              <div className="flex-1 space-y-5">
                <Widget title="Total Sales" value="Ksh 120,000" />
                <ChartBarLabel title='Branch Perfomance' description='Weekly sales per branch' />
              </div>
              <div className="flex-2">
                <ChartAreaDefault title='Total weekly sales' description='Showing total sales this week in all branches' />
              </div>
            </div>
          </div>
          <div className="md:border rounded-xl md:p-6">
            <p className="text-lg text-muted-foreground">Quick Orders Analytics</p>
            <div className="mt-4 flex flex-col lg:flex-row gap-4">
              <div className="flex-1 space-y-5">
                <Widget title="Total Orders" value="Ksh 25,000" />
                <HorizontalChartBar  title='Orders breakdown' description='Weekly orders breakdown'  />
              </div>
              <div className="flex-2">
                <ChartAreaDefault title='Total weekly orders' description='Showing total orders this week in all branches' />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-5">
          <Widget icon={<Warehouse size={20} />} title='Branches' value='4' />
          <Widget icon={<Users size={20} />} title='Employees' value='32' />
          <Widget icon={<Package size={20} />} title='Inventory' value='20' />
          <div className="border rounded-lg p-4">
            <p className="border-b pb-2 text-lg font-semibold">Quick actions</p>
            <div className="mt-5 space-y-5">
              <QuickAction icon={<Plus size={20}/>} action='Add Branch' href={`/supplier/${userId}/products`} />
              <QuickAction icon={<Mail size={20}/>} action='Invite Employee' href={`/supplier/${userId}/employees`} />
              <QuickAction icon={<Plus size={20}/>} action='Add Inventory' href={`/supplier/${userId}/products`} />
              <QuickAction icon={<Eye size={20}/>} action='View quotes' href={`/supplier/${userId}/quotations`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supplier;

const Widget = ({ icon, title, value }) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center">
        <span className="mr-2 text-muted-foreground">{icon}</span>
        <p className="text-muted-foreground text-lg">{title}</p>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

const Notification = ({contractor}) => {
  const date = new Date()
  return(
    <div className="flex items-start gap-3">
      <div className="bg-primary p-3 rounded-lg">
        <Mail color='white' size={20}/>
      </div>
      <div>
        <p>New quote received</p>
        <p className="text-sm">{contractor}</p>
        <p className="text-muted-foreground">{date.toLocaleString()}</p>
      </div>
    </div>
  )
}

const QuickAction = ({icon, action, href}) =>{
  return(
    <Link href={href} className="flex gap-2 items-center justify-center bg-primary text-white p-2 rounded-lg">
      {icon}{action}
    </Link>
  )
}
