import Sidebar from "@/components/custom/sidebar/Sidebar";
import { SessionProvider } from "next-auth/react";

const Layout = async ({children}) => {
  return (
    <SessionProvider>
        <div className='flex h-screen w-screen bg-white'>
            <Sidebar/>
            <div className='w-full max-w-7xl mx-auto p-4 overflow-y-scroll overflow-x-hidden'>
                <div>{children}</div>
            </div>
        </div>
    </SessionProvider>
  )
}

export default Layout;
