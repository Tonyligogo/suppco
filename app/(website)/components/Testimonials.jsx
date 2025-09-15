import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Patricia Omwenga",
    role: "Project Manager, BuildRight Ltd.",
    rating:5,
    quote:
      "This platform has transformed how we source materials. We cut sourcing time in half and always find reliable suppliers."
  },
  {
    name: "Michael Ochieng",
    role: "Supplier, SolidBuild Co.",
    rating:4,
    quote:
      "As a supplier, we've expanded our reach and increased sales significantly. Managing branches and employees is so easy now."
  },
  {
    name: "David Mwangi",
    role: "Contractor, Skyline Constructions",
    rating:5,
    quote:
      "Getting materials delivered on time has kept our projects on schedule. It's the best solution for contractors I’ve used."
  }
]

export default function Testimonials() {
  return (
        <section className="container">
        <div className='md:max-w-3xl md:mx-auto text-center mb-10 md:mb-20'>
            <p className='font-semibold text-lg'>Testimonials</p>
            <p className='text-3xl lg:text-5xl font-bold my-4 lg:my-6 leading-snug'>Trusted by Industry Leaders</p>
            <p className='md:text-lg'>Our platform connects suppliers and contractors across the construction industry. 
                From sourcing to delivery, professionals rely on us to streamline their workflow 
                and deliver quality on every project.</p>
        </div>  
            <div className="max-w-5xl mx-auto lg:grid lg:grid-cols-3 lg:gap-8 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
            {testimonials.map((t, index) => (
            <div
              key={index}
              className="w-[300px] flex-shrink-0 border rounded-2xl shadow-lg p-6 flex flex-col text-left"
            >
              {/* User Info */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.role}</p>
                <div className="flex mt-2">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  {Array.from({ length: 5 - t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gray-300" />
                  ))}
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200 mb-4" />

              {/* Testimonial */}
              <p className="text-gray-700 ">“{t.quote}”</p>
            </div>
          ))}
            </div>
        </section>
  )
}
