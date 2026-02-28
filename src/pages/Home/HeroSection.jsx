import { MapPin } from 'lucide-react'
import heroImage from '../../assets/images/Hero Image.jpg'
import image2 from '../../assets/images/Image 2.jpg'
import image3 from '../../assets/images/Image 3.jpg'
import image4 from '../../assets/images/Image 4.jpg'
import image5 from '../../assets/images/Image 5.jpg'


export default function HeroSection() {
  return (
    <section className="w-full mt-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-gray-200">
        {/* ── Left: large hero image ── */}
        <div className="relative bg-gray-300 min-h-[320px] md:min-h-[420px]">
          <img 
            src={heroImage} 
            alt="HCMUT Giving Education Fund - Children in Binh Thuan" 
            className="w-full h-full min-h-[320px] md:min-h-[420px] object-cover"
          />

          {/* Caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4">
            <div className="flex items-center gap-1 text-white/80 text-xs mb-0.5">
              <MapPin size={12} />
              <span>Binh Thuan</span>
            </div>
            <p className="text-white font-semibold text-sm">HCMUT Giving Education Fund</p>
          </div>
        </div>

        {/* ── Right: 3-column grid with img5 spanning 2 rows ── */}
        <div className="grid grid-cols-3 grid-rows-2 gap-0.5">
          {/* Row 1, Col 1 - img1 */}
          <div className="bg-gray-300 min-h-[160px] md:min-h-[210px] overflow-hidden">
            <img 
              src={image2} 
              alt="Charity event - Food distribution" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Row 1, Col 2 - img2 */}
          <div className="bg-gray-300 min-h-[160px] md:min-h-[210px] overflow-hidden">
            <img 
              src={image3} 
              alt="Community gathering" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Row 1-2, Col 3 - img5 (spans 2 rows) */}
          <div className="bg-gray-300 row-span-2 overflow-hidden">
            <img 
              src={image5} 
              alt="Children running together" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Row 2, Col 1 - img3 */}
          <div className="bg-gray-300 min-h-[160px] md:min-h-[210px] overflow-hidden">
            <img 
              src={image4} 
              alt="Education support program" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Row 2, Col 2 - img4 */}
          <div className="bg-gray-300 min-h-[160px] md:min-h-[210px] overflow-hidden">
            <img 
              src={image4} 
              alt="Children in classroom" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
