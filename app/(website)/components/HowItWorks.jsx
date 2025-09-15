import { ClipboardCheck, Search, ShoppingCart, Truck } from "lucide-react"

const steps = [
  {
    icon: ClipboardCheck,
    title: "Sign Up",
    description: "Create your free account as a supplier or contractor and set up your profile in minutes."
  },
  {
    icon: Search,
    title: "Explore",
    description: "Suppliers showcase products, contractors browse and compare options from verified sellers."
  },
  {
    icon: ShoppingCart,
    title: "Place Orders",
    description: "Contractors order the materials they need directly through the platform."
  },
  {
    icon: Truck,
    title: "Track & Manage",
    description: "Stay on top of deliveries, manage sites or branches, and keep projects running smoothly."
  }
]

export default function HowItWorks() {
  return (
    <div className="bg-gray-50 py-10 lg:py-20">
      <section className="container my-0">
        <div className="text-center">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="md:text-lg text-gray-600">
              Getting started is simple. Whether you&apos;re a supplier looking to sell or a contractor sourcing materials, our platform makes the process seamless.
            </p>
          </div>
          <div className="md:max-w-6xl md:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
