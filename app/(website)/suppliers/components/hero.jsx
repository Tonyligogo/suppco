import Image from "next/image"
import { Button } from "@/components/ui/button"
import HeroBg from "@/public/supplier-warehouse.jpg" // replace with your chosen image

export default function SupplierHero() {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HeroBg}
          alt="Construction materials background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Reach More Contractors. <br className="hidden md:block" /> 
          Grow Your Business.
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Showcase your products, manage branches, and sell directly 
          to trusted contractors — all from one powerful platform.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary text-white font-semibold px-8 py-6 text-lg">
            Start Supplying Today
          </Button>
        </div>
      </div>
    </section>
  )
}
