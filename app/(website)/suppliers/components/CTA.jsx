import Link from "next/link"

const SupplierCTA = () => {
  return (
    <div className="container py-16 px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Ready to sell?
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Our entire suite of features comes standard and it&apos;s free to get started.
        </p>
        <Link  href="https://forms.gle/GR8fQ4ncWerTVzLZ9"
                  target="_blank"
                  rel="noopener noreferrer" className="bg-primary text-white block w-fit mx-auto font-semibold px-8 py-3 rounded-md text-lg">
            Join us now!
          </Link>
          <div className="mt-2 text-center flex justify-center items-center gap-1">
            <span>Not a supplier?</span>
            <Link href='/contractors' className="underline">Contractors</Link>
          </div>
        </div>
  )
}

export default SupplierCTA