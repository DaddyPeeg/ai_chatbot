'use client'

import Wrapper from '@/components/wrapper'
import useScrollPercentage from '@/lib/hooks/height-percentage'
import { HeroCollage } from '@/public/assets'
import Image from 'next/image'
import React, { useEffect } from 'react'

const AboutUs = () => {
  const imageRef = React.useRef<HTMLDivElement>(null)
  const scrollPercentage = useScrollPercentage()

  useEffect(() => {
    if (!imageRef || !imageRef.current) return
    imageRef.current.style.transform = `translateX(-${scrollPercentage * 30}rem)`
  }, [scrollPercentage])

  return (
    <section className="py-24">
      <Wrapper>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-[50%] flex flex-col justify-center">
            <h1 className="font-avenirnextltproregular text-6xl max-w-lg ">
              Here, we strive to protect what&lsquo;s important.
            </h1>
            <p className="mt-8 max-w-sm">
              We&lsquo;re a team dedicated to your well-being. Our mission? To
              simplify healthcare insurance with seamless automation, ensuring
              you get the coverage you need, when you need it.
            </p>
          </div>
          <div className="md:w-[50%] overflow-hidden">
            <div ref={imageRef} className="relative h-[40rem] w-[50rem]">
              <Image
                sizes="(max-width: 960px) 100vw, 960px"
                fill
                src={HeroCollage}
                alt="heroCollage"
                className="lg:object-contain"
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  )
}

export default AboutUs
