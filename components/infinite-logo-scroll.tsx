'use client'

import Image from 'next/image'
import React from 'react'
import { LogoIpsum } from '@/public/svgs'

const logos = [
  LogoIpsum,
  LogoIpsum,
  LogoIpsum,
  LogoIpsum,
  LogoIpsum,
  LogoIpsum,
  LogoIpsum,
  LogoIpsum,
  LogoIpsum
]

const InfiniteLogoScroll = () => {
  return (
    <div className="bg-custom_accent pt-4 pb-10 flex gap-8 overflow-hidden">
      <div className="whitespace-nowrap flex gap-8  animate-refine-slide">
        {logos.map((logo, index) => (
          <div className="relative w-52 h-10 " key={`logo1-${index}`}>
            <Image
              fill
              sizes="((min-width: 50em) and (max-width: 60em)) 50em,
              ((min-width: 30em) and (max-width: 50em)) 30em,
              (max-width: 30em) 20em"
              src={logo}
              alt={`logo${index}`}
            />
          </div>
        ))}
      </div>
      <div className="whitespace-nowrap flex gap-8 animate-refine-slide">
        {logos.map((logo, index) => (
          <div className="relative w-52 h-10" key={`logo2-${index}`}>
            <Image
              fill
              sizes="((min-width: 50em) and (max-width: 60em)) 50em,
              ((min-width: 30em) and (max-width: 50em)) 30em,
              (max-width: 30em) 20em"
              src={logo}
              alt={`logo${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfiniteLogoScroll
