import { Button } from "@/components/ui/button"
import { ChevronRight, ClockPlus, Construction, Drill, Handshake, HardHat, Truck } from "lucide-react"

export const contractorsBenefits = [
    {
      icon: <Drill />,
      heading: "Buy Materials Easily",
      description: "Browse supplier catalogs, compare prices, and place orders all in one platform.",
    },
    {
      icon: <Construction />,
      heading: "Manage Multiple Sites",
      description: "Track material needs across different projects and ensure every site gets what it requires on time.",
    },
    {
      icon: <HardHat />,
      heading: "Invite Subcontractors & Workers",
      description: "Bring your team onto the platform, assign roles, and collaborate on project needs seamlessly.",
    },
    {
      icon: <ClockPlus />,
      heading: "Save Time & Cut Costs",
      description: "Reduce delays by sourcing materials faster and avoid overspending with better visibility into pricing.",
    },
    {
      icon: <Truck />,
      heading: "Track Deliveries",
      description: "Stay updated on order status and deliveries, ensuring materials reach your site when you need them.",
    },
    {
      icon:<Handshake />,
      heading: "Work With Trusted Suppliers",
      description: "Connect with verified suppliers and build long-term relationships for reliable project delivery.",
    },
  ];

const Contractors = () => {
  return (
    <section className="container">
        <div className='max-w-3xl mx-auto text-center space-y-6'>
            <p className='font-semibold lg:text-lg'>For Contractors</p>
            <p className='text-3xl lg:text-5xl font-bold leading-snug'>Get reliable access to <br /> the materials you need.</p>
            <p className='md:text-lg'>Discover trusted suppliers, compare prices, and manage orders for all your sites in one place. Save time, cut costs, and keep your construction projects on schedule with reliable deliveries.</p>
        </div>
        <div className="max-w-6xl mx-auto my-10 lg:my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contractorsBenefits.map((benefit, index)=>(
                <div key={index} className="border rounded-xl p-6 lg:p-8">
                    <span className="size-12 bg-primary rounded-full grid place-content-center text-white text-lg">{benefit.icon}</span>
                    <p className="text-lg lg:text-xl font-semibold my-2 lg:my-4">{benefit.heading}</p>
                    <p>{benefit.description}</p>
                </div>
            ))}
        </div>
        <Button size='lg' className='flex items-center bg-primary text-lg font-semibold gap-3 rounded mx-auto'>Find Materials Now <ChevronRight size={24} /> </Button>
    </section>
  )
}

export default Contractors