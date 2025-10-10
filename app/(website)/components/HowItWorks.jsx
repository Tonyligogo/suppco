'use client';
import { ClipboardCheck, FileBox, MonitorCog, Search, ShoppingCart, Telescope, Truck, Wallet, BarChartBig, PackageCheck } from "lucide-react"
import { usePathname } from "next/navigation"

// --- STEP DATA ---

// General steps (for the root '/' page)
const overallSteps = [
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

// Supplier-specific steps
const supplierSteps = [
    {
        icon: FileBox,
        title: 'List Your Inventory',
        description: 'Upload your complete catalog, including specifications and pricing, easily within our intuitive supplier dashboard.'
    },
    {
        icon: Telescope,
        title: 'Contractors Discover You',
        description: 'Qualified contractors browse, find your specific products, and generate an invoice for their order.'
    },
    {
        icon: MonitorCog,
        title: 'Monitor & Manage',
        description: 'Use your central dashboard to track orders, manage stock levels, and view sales performance across all branches and materials.'
    },
    {
        icon: Wallet,
        title: 'Fulfill & Get Paid',
        description: 'Accept the order, fulfill the delivery, and our platform facilitates the seamless payment process.'
    },
]

// Contractor-specific steps (NEW)
const contractorSteps = [
    {
        icon: Search,
        title: 'Search & Compare',
        description: 'Browse the entire marketplace for materials, comparing real-time pricing and delivery options from vetted suppliers.'
    },
    {
        icon: BarChartBig,
        title: 'Generate Invoice & Pay',
        description: 'Generate an instant professional invoice. Payment is secured via escrow until delivery is confirmed.'
    },
    {
        icon: Truck,
        title: 'Track Orders & Sites',
        description: 'Monitor your order status in real-time and manage logistics for multiple project sites from one unified dashboard.'
    },
    {
        icon: PackageCheck,
        title: 'Confirm & Release Funds',
        description: 'Confirm acceptance of the materials upon delivery. Funds are then automatically released from escrow to the supplier.'
    },
]


export default function HowItWorks() {
    const pathname = usePathname();

    // Logic to determine the viewer context
    const viewer = pathname.includes('/suppliers') ? 'suppliers' : pathname.includes('/contractors') ? 'contractors' : 'general';

    // Logic to select the correct steps array
    let steps;
    if (viewer === 'suppliers') {
        steps = supplierSteps;
    } else if (viewer === 'contractors') {
        steps = contractorSteps;
    } else {
        steps = overallSteps;
    }

    // Logic for dynamic subtitle
    let subtitle;
    if (viewer === 'suppliers') {
        subtitle = 'Getting your materials in front of thousands of contractors has never been easier. Our platform simplifies the entire B2B sales cycle so you can focus on supply.';
    } else if (viewer === 'contractors') {
        subtitle = 'Secure the materials you need, when you need them. Our process is designed for fast, transparent, and hassle-free procurement.';
    } else {
        subtitle = 'Getting started is simple. Whether you\'re a supplier looking to sell or a contractor sourcing materials, our platform makes the process seamless.';
    }

    return (
        <div className="bg-gray-50 py-10 lg:py-20">
            <section className="container my-0">
                <div className="text-center">
                    <div className="max-w-3xl mx-auto text-center mb-10 md:mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                        <p className="md:text-lg text-gray-600">
                            {subtitle}
                        </p>
                    </div>
                    <div className="lg:container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                {/* Using Tailwind color utility for the primary color */}
                                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 mb-6"> 
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