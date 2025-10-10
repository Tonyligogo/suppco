import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="lg:max-w-[80vw] lg:mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Company Info */}
        <div>
          <h3 className="text-4xl font-semibold text-white mb-4">Suppco</h3>
          <p className="mb-4">
            Connecting suppliers and contractors to simplify construction material sourcing and project management.
          </p>
          {/*I'll put social links here */}
        </div>

        {/* Products/Services */}
        <div>
          <h4 className="text-xl font-semibold text-gray-300 mb-4">Products</h4>
          <ul className="space-y-2">
            <li><Link href="/suppliers" className="hover:text-white">For Suppliers</Link></li>
            <li><Link href="/contractors" className="hover:text-white">For Contractors</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xl font-semibold text-gray-300 mb-4">Resources</h4>
          <ul className="space-y-2">
            <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
          </ul>
        </div>

       
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-10 mt-6">
        <div className="lg:max-w-[80vw] lg:mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
          <p>© {new Date().getFullYear()} Suppco. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
