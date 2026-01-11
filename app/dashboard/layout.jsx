import Sidebar from "@/components/custom/sidebar/Sidebar";

const Layout = async ({children}) => {
  return (
        <div className='md:flex h-screen w-screen bg-white'>
            <Sidebar/>
            <div className='w-full px-4 max-w-7xl mx-auto h-screen overflow-hidden'>
                {children}
            </div>
        </div>
  )
}

export default Layout;
