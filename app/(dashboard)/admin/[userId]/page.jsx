import Header from '@/components/custom/Header';
import { HandCoins, Users, Wallet } from 'lucide-react';

const Admin = () => {
  return (
    <div>
    <Header
        title="Overview"
        description="Have a quick look on how everything is going"
      />
      <div className='grid gird-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5'>
        <Widget icon={<Wallet/>} title='Total Revenue' value='Ksh 255,000' />
        <Widget icon={<HandCoins />} title='Total transactions' value='Ksh 1,255,000' />
        <Widget icon={<Users/>} title='Active Suppliers' value='25' />
        <Widget icon={<Users/>} title='Active Contractors' value='10' />
        <Widget icon={<Users/>} title='Active Employees' value='150' />
      </div>
    </div>
  )
}

export default Admin

const Widget = ({ icon, title, value }) => {
    return (
      <div className="border rounded-lg p-4">
        <span className="text-muted-foreground">{icon}</span>
        <p className="text-muted-foreground text-lg">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    );
  };