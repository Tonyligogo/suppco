'use client';
import { CreditCard, ChartNoAxesCombined, HardHat, Warehouse, FileText, FileBox, BadgeCheck, Globe } from "lucide-react"
import { usePathname } from 'next/navigation';
const featuresData = [
    {
        "feature": "Performance Analytics",
        "benefit": "Gain powerful, real-time data on your sales, product demand, and contractor purchasing trends. Make data-driven decisions to optimize stock and maximize profit.",
        "icon": ChartNoAxesCombined,
        "target": "supplier"
    },
    {
        "feature": "Vetted Contractors",
        "benefit": "Stop wasting time on unqualified leads. We connect you only with pre-screened, high-volume contractors who are ready to buy.",
        "icon": HardHat,
        "target": "supplier"
    },
    {
        "feature": "Branches Management",
        "benefit": "If you operate multiple warehouses or retail locations, easily manage pricing, stock, and fulfillment for each branch separately, giving you complete operational control.",
        "icon": Warehouse,
        "target": "supplier"
    },
    {
        "feature": "Inventory Management",
        "benefit": "Directly manage and update your entire product catalog from one central dashboard. Ensure accurate stock levels are always visible to buyers, preventing costly order conflicts.",
        "icon": FileBox,
        "target": "supplier"
    },
    {
        "feature": "Verified Profile & Reviews",
        "benefit": "Boost your credibility with verified supplier status and transparent ratings from contractors.",
        "icon": BadgeCheck,
        "target": "supplier"
    },
    {
        "feature": "Expanded Market",
        "benefit": "Instantly broaden your geographical reach and connect with contractors outside your local service area, enabling significant and scalable business growth.",
        "icon": Globe,
        "target": "supplier"
    },    
    {
        "feature": "Simple Invoicing",
        "benefit": "Eliminate paperwork and manual errors. Our system generates professional, purchase-ready invoices instantly, ensuring faster order processing and happier customers.",
        "icon": FileText,
        "target": "all"
    },
    {
        "feature": "Fast Payments",
        "benefit": "Our integrated payment solution ensures timely and secure transactions, helping you maintain consistent cash flow without the usual B2B payment delays.",
        "icon": CreditCard,
        "target": "all"
    },
    {
        "feature": "Multi-Site Management",
        "benefit": "Set up and manage multiple project sites. Track material delivery status and manage budgets for each site separately from one dashboard.",
        "icon": Warehouse,
        "target": "contractor"
    },
    {
        "feature": "Supplier Comparison",
        "benefit": "Quickly compare real-time pricing, delivery options, and supplier ratings side-by-side to ensure you always get the best value for your project.",
        "icon": ChartNoAxesCombined,
        "target": "contractor"
    },
    {
        "feature": "Order Tracking & Alerts",
        "benefit": "Receive real-time updates and alerts on the status of your material orders, from dispatch to estimated time of arrival at the job site.",
        "icon": Globe,
        "target": "contractor"
    },
    {
        "feature": "Secure Escrow Payments",
        "benefit": "All payments are held securely in escrow and released to the supplier only after you confirm acceptance of the materials, protecting your capital.",
        "icon": CreditCard,
        "target": "contractor"
    },
    {
        "feature": "Integrated Dispute Resolution",
        "benefit": "Access a clear process for handling damaged or substandard materials, ensuring guaranteed refunds or replacements according to platform policy.",
        "icon": BadgeCheck,
        "target": "contractor"
    },
];

export default function Features() {
  const pathname = usePathname();

    const isSupplier = pathname.includes('/suppliers');
    const isContractor = pathname.includes('/contractors');

    const context = isSupplier ? 'supplier' : isContractor ? 'contractor' : 'supplier';

    const filteredFeatures = featuresData.filter(item => 
        item.target === context || item.target === 'all'
    );
    
    const title = isContractor 
        ? "Get materials the simple way!"
        : "Software every supplier needs.";

    const subtitle = isContractor
        ? "Access real-time pricing, verify supplier credentials, and manage multi-site orders effortlessly, streamlining your procurement process."
        : "An innovative digital marketplace designed to connect top-tier suppliers like you directly with high-volume contractors, maximizing your profitability.";
  return (
    <section className="container bg-white">
    <div>
        <h2 className="text-3xl md:text-5xl text-gray-800 font-bold mb-6 text-center">
            {title}
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            {subtitle}
        </p>
    </div>
    {/* The grid is responsive: 3 columns on desktop, adapts on mobile */}
    <div className="pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
        {filteredFeatures.map((item, index) => (
            <div
                key={index}
                className="snap-start flex-shrink-0 h-full min-h-[280px] bg-gray-50 border rounded-xl p-6 space-y-6"
            >
                {/* Icon Component */}
                <item.icon className="size-10 text-gray-800"/> 
                
                <div className="space-y-3">
                    <p className="text-xl lg:text-2xl font-semibold text-gray-800">{item.feature}</p>
                    <p className="lg:text-lg text-gray-600">{item.benefit}</p>
                </div>
            </div>
        ))}
    </div>
</section>
  )
}
