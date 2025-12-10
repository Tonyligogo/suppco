import Sidebar from "@/components/custom/sidebar/Sidebar";

const Layout = ({children}) => {
  return (
    <div className='flex h-screen w-screen bg-white'>
            <Sidebar/>
            <div className='w-full max-w-7xl mx-auto overflow-y-scroll overflow-x-hidden'>
                <div>{children}</div>
            </div>
        </div>
  )
}

export default Layout;
