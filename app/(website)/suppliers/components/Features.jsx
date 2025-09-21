import { Package, Boxes, MapPin, CreditCard, BarChart, Star } from "lucide-react"

const features = [
  {
    icon: Package,
    title: "Product Listings & Catalog",
    description:
      "Showcase your full range of materials with clear descriptions, prices, and images that attract contractors.",
  },
  {
    icon: Boxes,
    title: "Inventory Management",
    description:
      "Keep track of your stock in real-time to avoid overselling and maintain contractor confidence.",
  },
  {
    icon: MapPin,
    title: "Branch Management",
    description:
      "Easily manage multiple locations and keep your inventory synced across all branches.",
  },
  {
    icon: CreditCard,
    title: "Order & Payment Tracking",
    description:
      "Receive instant notifications for new orders, confirm payments, and reduce transaction delays.",
  },
  {
    icon: BarChart,
    title: "Analytics Dashboard",
    description:
      "Understand sales trends, top-selling products, and customer demand to grow strategically.",
  },
  {
    icon: Star,
    title: "Verified Profile & Reviews",
    description:
      "Boost your credibility with verified supplier status and transparent ratings from contractors.",
  },
]

export default function SupplierFeatures() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Everything You Need to Grow as a Supplier
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          From listing your products to managing payments, our platform gives you
          all the tools to expand your reach and streamline your business.
        </p>

        <div className="space-y-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 bg-yellow-100 p-6 rounded-2xl">
                <feature.icon className="w-14 h-14 text-yellow-600" />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
