import { Button } from '@/components/ui/button2'
import { PhoneHero } from '@/public/assets'
import Image from 'next/image'
import { CheckIcon } from '@/public/assets'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Wrapper from '@/components/wrapper'

const subtext = [
  {
    text: 'Personalized Plans.',
    image: CheckIcon
  },
  {
    text: 'Time-Saving',
    image: CheckIcon
  },
  {
    text: 'Simplified Process',
    image: CheckIcon
  },
  {
    text: 'Accessibility',
    image: CheckIcon
  }
]

const Hero = () => {
  return (
    <Wrapper>
      <div className="flex flex-col py-16 justify-center">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="md:w-[40rem]">
            <h1 className="text-[3rem] leading-[3.5rem] mb-8 font-avenirnextltproregular">
              Find Your Perfect Health Insurance Plan.
            </h1>
            {subtext.map((item, index) => (
              <div
                className={cn(
                  'flex gap-2 items-center',
                  index !== subtext.length - 1 && 'mb-2'
                )}
                key={`subtext${index}`}
              >
                <span className="relative w-5 h-5">
                  <Image
                    sizes="(max-width: 960px) 100vw, 960px"
                    src={item.image}
                    alt={`checkIcon${index}`}
                    fill
                  />
                </span>
                <p>{item.text}</p>
              </div>
            ))}
            <div className="flex mt-10 mb-4 gap-4">
              <Link href={'/chat'}>
                <Button
                  size="xl"
                  className="rounded-full uppercase font-semibold w-10 text-xs md:w-auto"
                >
                  <p>Get Started</p>
                </Button>
              </Link>
              <Button
                size="xl"
                variant="outline"
                className="rounded-full uppercase font-semibold w-10 text-xs md:w-auto"
              >
                Find My Plan
              </Button>
            </div>
            <p className="text-custom_accent">
              Save time and hassle with our AI-powered insurance agent.
            </p>
          </div>
          <div className="lg:w-[calc(100%_-_40rem)] mt-12 lg:mt-0 flex justify-center">
            <div className="relative h-[35rem] w-[18rem]">
              <Image
                src={PhoneHero}
                alt="phoneHero"
                sizes="(max-width: 960px) 100vw, 960px"
                loading="eager"
                fill
                priority
                className="z-20"
              />
              <div className="-z-1 absolute h-[32rem] left-6 top-6 w-[15rem] bg-black" />
              <video
                src="https://videos.pexels.com/video-files/5310966/5310966-uhd_2160_3840_25fps.mp4"
                // src="https://assets-global.website-files.com/658327ffca1812dacb451650/658ae91c80fccf87136bdefb_SignUp-transcode.mp4"
                loop
                autoPlay
                playsInline
                muted
                className="-z-1 absolute top-16 left-6 w-60"
              />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Hero
