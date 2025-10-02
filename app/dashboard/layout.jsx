import { authCached } from "@/authCached";
import Sidebar from "@/components/custom/sidebar/Sidebar";

const Layout = async ({children}) => {
  const session = await authCached();
  console.log('user',session?.user);
  return (
    <div className='flex h-screen w-screen bg-white'>
            <Sidebar/>
            <div className='w-full max-w-7xl mx-auto p-4 overflow-y-scroll overflow-x-hidden'>
                <div>{children}</div>
            </div>
        </div>
  )
}

export default Layout;
