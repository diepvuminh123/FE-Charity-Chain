import heroImage from '../../assets/images/Hero Image.jpg'
import image2 from '../../assets/images/Image 2.jpg'
import image3 from '../../assets/images/Image 3.jpg'
import image4 from '../../assets/images/Image 4.jpg'
import image5 from '../../assets/images/Image 5.jpg'


export default function HeroSection() {
  return (
    <section className="w-full bg-gray-100 py-5 md:py-8">
      <div className="container-custom">
        <div className="rounded-sm bg-white p-3 md:p-5">
          <div className="mb-3 md:mb-4 leading-tight">
            <p className="text-lg font-extrabold text-sky-500">HCMUT Giving</p>
            <p className="text-sm font-semibold text-gray-700">Transparency For Every Heart</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-gray-200">
            <div className="relative bg-gray-300 min-h-[320px] md:min-h-[420px]">
              <img
                src={heroImage}
                alt="HCMUT Giving Education Fund - Children in Binh Thuan"
                className="w-full h-full min-h-[320px] md:min-h-[420px] object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/65 to-transparent px-4 py-4">
                <p className="text-[11px] text-white/80 mb-0.5">Binh Thuan</p>
                <p className="text-white font-semibold text-sm">HCMUT Giving Education Fund</p>
              </div>
            </div>

            <div className="grid grid-cols-3 grid-rows-2 gap-0.5">
              <div className="bg-gray-300 min-h-[160px] md:min-h-[210px] overflow-hidden">
                <img
                  src={image2}
                  alt="Charity event - Food distribution"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-300 min-h-[160px] md:min-h-[210px] overflow-hidden">
                <img
                  src={image3}
                  alt="Community gathering"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-300 row-span-2 overflow-hidden">
                <img
                  src={image5}
                  alt="Children running together"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-300 min-h-[160px] md:min-h-[210px] overflow-hidden">
                <img
                  src={image4}
                  alt="Education support program"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-300 min-h-[160px] md:min-h-[210px] overflow-hidden">
                <img
                  src={image4}
                  alt="Children in classroom"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
