import { Button } from "@/components/ui/button"
import { ChartArea, Handshake, ToolCase, UsersRound, Wallet, Warehouse } from "lucide-react"
import Link from "next/link";

export const suppliersBenefits = [
    {
      icon: <ToolCase/>,
      heading: "Showcase Your Products",
      description: "Create a digital storefront where contractors can easily browse and order your materials.",
    },
    {
      icon: <Warehouse/>,
      heading: "Manage Multiple Branches",
      description: "List products by branch, track inventory per location, and ensure contractors always see real-time availability.",
    },
    {
      icon: <UsersRound/>,
      heading: "Invite & Empower Your Team",
      description: "Add employees, assign roles, and give branch managers control over daily operations.",
    },
    {
      icon: <ChartArea/>,
      heading: "Gain Insights & Analytics",
      description: "See which products are in demand, track orders, and monitor branch performance with easy dashboards.",
    },
    {
      icon: <Wallet/>,
      heading: "Simplify Payments",
      description: "Get paid securely and on time, through Mpesa or your bank.",
    },
    {
      icon: <Handshake/>,
      heading: "Connect with Contractors",
      description: "Reach verified contractors actively looking for materials, boosting sales and building long-term partnerships.",
    },
  ];
  

const Suppliers = () => {
  return (
    <div className="bg-gray-50 py-10 lg:py-20">
      <section className="container my-0">
          <div className='max-w-3xl mx-auto text-center space-y-6'>
              <p className='font-semibold lg:text-lg'>For Suppliers</p>
              <p className='text-3xl lg:text-5xl font-bold leading-snug'>Expand your reach & <br /> streamline your operations.</p>
              <p className='md:text-lg'>Join our platform to showcase your construction materials, manage branches, and sell directly to verified contractors. Expand your reach and scale faster with tools built for suppliers like you.</p>
          </div>
          <div className="max-w-6xl mx-auto my-10 lg:my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliersBenefits.map((benefit, index)=>(
                  <div key={index} className="border rounded-xl p-6 lg:p-8">
                      <span className="size-12 bg-primary rounded-full grid place-content-center text-white text-lg">{benefit.icon}</span>
                      <p className="text-lg lg:text-xl font-semibold my-2 lg:my-4">{benefit.heading}</p>
                      <p>{benefit.description}</p>
                  </div>
              ))}
          </div>
          <Button
                asChild
                size="lg"
                className="flex w-fit mx-auto font-semibold text-lg px-8 py-3"
              >
                <Link
                  href="https://forms.gle/GR8fQ4ncWerTVzLZ9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join us today
                </Link>
              </Button>
      </section>
    </div>
  )
}

export default Suppliers