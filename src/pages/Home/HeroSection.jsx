import { MapPin } from 'lucide-react'

/**
 * HeroSection – image collage grid matching the design mockup.
 * Replace the placeholder divs with <img> tags once you have real photos.
 *
 * Grid layout (mirroring the mockup):
 *   [Large left image] | [Top-right top] [Top-right bottom-left] [Top-right bottom-right]
 *                                         [Bottom-right left]   [Bottom-right right]
 */
export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-gray-200">
        {/* ── Left: large hero image ── */}
        <div className="relative bg-gray-300 min-h-[320px] md:min-h-[420px]">
          {/* Replace below div with: <img src={heroImg} alt="..." className="w-full h-full object-cover" /> */}
          <div className="w-full h-full min-h-[320px] md:min-h-[420px] bg-gray-400 flex items-center justify-center text-gray-500 text-sm">
            Hero Image (Left)
          </div>

          {/* Caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4">
            <div className="flex items-center gap-1 text-white/80 text-xs mb-0.5">
              <MapPin size={12} />
              <span>Binh Thuan</span>
            </div>
            <p className="text-white font-semibold text-sm">HCMUT Giving Education Fund</p>
          </div>
        </div>

        {/* ── Right: 2×2 grid of images ── */}
        <div className="grid grid-cols-2 grid-rows-2 gap-0.5">
          {/* Top-left */}
          <div className="bg-gray-400 min-h-[160px] md:min-h-[210px] flex items-center justify-center text-gray-500 text-xs">
            Image 2
          </div>
          {/* Top-right */}
          <div className="bg-gray-500 min-h-[160px] md:min-h-[210px] flex items-center justify-center text-gray-400 text-xs">
            Image 3
          </div>
          {/* Bottom-left */}
          <div className="bg-gray-500 min-h-[160px] md:min-h-[210px] flex items-center justify-center text-gray-400 text-xs">
            Image 4
          </div>
          {/* Bottom-right */}
          <div className="bg-gray-400 min-h-[160px] md:min-h-[210px] flex items-center justify-center text-gray-500 text-xs">
            Image 5
          </div>
        </div>
      </div>
    </section>
  )
}
