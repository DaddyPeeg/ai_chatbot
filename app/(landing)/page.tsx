import Banner from '@/components/banner'
import Hero from './components/Hero'
import InfiniteLogoScroll from '@/components/infinite-logo-scroll'
import Testimonials from './components/Testimonials'

export default function LandingPage() {
  return (
    <div className="mt-16">
      <Banner variant="main">
        <div className="flex justify-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, iste!
        </div>
      </Banner>
      <Hero />
      <Banner variant="accent">
        <div className="flex justify-center text-lg font-medium">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur,
          necessitatibus.
        </div>
      </Banner>
      <InfiniteLogoScroll />
      <Testimonials />
    </div>
  )
}
