import Banner from '@/components/banner'
import Hero from './components/Hero'
import InfiniteLogoScroll from '@/components/infinite-logo-scroll'
import Testimonials from './components/Testimonials'
import Page_3 from './components/Page_3'

export default function LandingPage() {
  return (
    <div className="mt-16">
      <Banner variant="main">
        <div className="flex justify-center">
          Start Your Journey to Finding the Ideal Health Insurance Plan Today!
        </div>
      </Banner>
      <Hero />
      <Banner variant="accent">
        <div className="flex justify-center text-center text-lg font-medium">
          Explore Our Trusted Network of Industry Partnerships for Comprehensive
          Health Insurance Coverage Options
        </div>
      </Banner>
      <InfiniteLogoScroll />
      <Testimonials />
      <Page_3 />
    </div>
  )
}
