import { Button } from '@/components/ui/button2'
import { PhoneHero } from '@/public/assets'
import Image from 'next/image'
import { CheckIcon } from '@/public/assets'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Wrapper from '@/components/wrapper'

const subtext = [
  {
    text: 'Lorem, ipsum dolor.',
    image: CheckIcon
  },
  {
    text: 'Lorem, ipsum dolor.',
    image: CheckIcon
  },
  {
    text: 'Lorem ipsum dolor sit.',
    image: CheckIcon
  },
  {
    text: 'Lorem ipsum dolor sit amet.',
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
              Lorem ipsum, dolor sit amet consectetur adipisicing.
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
                  <p>Chat Bot</p>
                </Button>
              </Link>
              <Button
                size="xl"
                variant="outline"
                className="rounded-full uppercase font-semibold w-10 text-xs md:w-auto"
              >
                Lorem, ipsum.
              </Button>
            </div>
            <p className="text-custom_accent">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod,
              nam?
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
              />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Hero
