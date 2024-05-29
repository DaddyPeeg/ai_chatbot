import { Button } from '@/components/ui/button2'
import { Separator } from '@/components/ui/separator'
import Wrapper from '@/components/wrapper'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import React from 'react'

const WhyChooseUs = () => {
  // h-[calc(170dvh_-_4rem)]  md:h-[calc(150dvh_-_4rem)] lg:
  // h-[calc(100dvh_-_4rem)]
  return (
    <section className="w-full flex relative py-8">
      <div className="w-full z-[80]">
        <Wrapper>
          <div className="h-full justify-center flex flex-col lg:flex-row">
            <div className="lg:h-full lg:flex-1 flex flex-col gap-4 lg:gap-0">
              <h1 className="font-avenirnextltproregular max-w-md lg:flex-1 text-white text-[6vw] leading-[6vw] sm:text-4xl">
                We understand that everyone&lsquo;s insurance needs are unique.
              </h1>
              <div className="mb-4 lg:mb-8">
                <Button
                  size="xl"
                  className="gap-1 lg:gap-2 text-sm lg:text-md rounded-full px-4 lg:px-6"
                >
                  <p className="">About us</p>
                  <ArrowRightIcon height={20} width={20} />
                </Button>
              </div>
            </div>
            <div className="lg:h-full lg:flex-1">
              <div className="lg:h-full lg:flex gap-4 grid grid-cols-1 lg:flex-col lg:max-w-md lg:ml-auto">
                <div className="border rounded-md flex bg-white/15 backdrop-blur-xl items-center lg:py-4 lg:px-4 py-2 px-2">
                  <h1 className="font-avenirnextltproregular py-2 pl-2 pr-4 lg:py-4 lg:pl-4 lg:pr-8  sm:text-6xl text-[10vw] leading-10 text-white">
                    1
                  </h1>
                  <Separator orientation="vertical" />
                  <div className="flex flex-col px-4 lg:px-8">
                    <h1 className="text-[3.4vw] sm:text-xl font-semibold text-white">
                      Customized Coverage
                    </h1>
                    <p className="lg:mt-2 text-white/70 text-xs sm:text-sm">
                      Protect your biggest investment with our comprehensive
                      home insurance policies.
                    </p>
                  </div>
                </div>
                <div className="border rounded-md flex bg-white/15 backdrop-blur-xl items-center lg:py-4 lg:px-4 py-2 px-2">
                  <h1 className="font-avenirnextltproregular  py-2 pl-2 pr-4 lg:py-4 lg:pl-4 lg:pr-8 sm:text-6xl text-[10vw]  leading-10 text-white">
                    2
                  </h1>
                  <Separator orientation="vertical" />
                  <div className="flex flex-col px-4 lg:px-8">
                    <h1 className="text-[3.4vw] sm:text-xl font-semibold text-white">
                      Exceptional Customer Service
                    </h1>
                    <p className="lg:mt-2 text-white/70 text-xs sm:text-sm">
                      Our dedicated customer service team is always ready to
                      assist you with any questions or concerns you may have.
                    </p>
                  </div>
                </div>
                <div className="border rounded-md flex bg-white/15 backdrop-blur-xl items-center lg:py-4 lg:px-4 py-2 px-2">
                  <h1 className="font-avenirnextltproregular py-2 pl-2 pr-4 lg:py-4 lg:pl-4 lg:pr-8 sm:text-6xl text-[10vw]  leading-10 text-white">
                    3
                  </h1>
                  <Separator orientation="vertical" />
                  <div className="flex flex-col px-4 lg:px-8">
                    <h1 className="text-[3.4vw] sm:text-xl font-semibold text-white">
                      Trusted Expertise
                    </h1>
                    <p className="lg:mt-2 text-white/70 text-xs sm:text-sm">
                      With years of industry experience, our team of insurance
                      professionals has the knowledge.
                    </p>
                  </div>
                </div>
                <div className="border rounded-md flex bg-white/15 backdrop-blur-xl items-center lg:py-4 lg:px-4 py-2 px-2">
                  <h1 className="font-avenirnextltproregular py-2 pl-2 pr-4 lg:py-4 lg:pl-4 lg:pr-8 sm:text-6xl text-[10vw]  leading-10 text-white">
                    4
                  </h1>
                  <Separator orientation="vertical" />
                  <div className="flex flex-col px-4 lg:px-8">
                    <h1 className="text-[3.4vw] sm:text-xl font-semibold text-white">
                      Strong Partnerships
                    </h1>
                    <p className="lg:mt-2 text-white/70 text-xs sm:text-sm">
                      We believe in conducting our business with transparency
                      and integrity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <div className="absolute w-full h-full top-0 left-0 bg-transparent z-50">
        <div className="relative w-full h-full top-0 left-0">
          <Image
            src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="hello"
            fill
            sizes="(max-width: 960px) 100vw, 960px"
            className="-z-1 object-cover"
          />
          <Image
            src="https://assets-global.website-files.com/64da3acb2ea93c58bc5a53a0/64ddcf4f890729c95f4f9d5c_Line%20pattern%20white.svg"
            alt="image2"
            sizes="(max-width: 960px) 100vw, 960px"
            className="-z-1 object-cover absolute z-40 bottom-24 right-5"
            width={250}
            height={300}
          />
        </div>
        <div className="absolute w-full h-full top-0 left-0 flex">
          {' '}
          <div className="flex-1 h-full border-r-[1px] border-white/50 bg-gradient-to-b from-violet-800 to-violet-500 z-10 opacity-70" />
          <div className="flex-1 h-full  border-r-[1px] border-white/50  bg-gradient-to-b from-violet-800 to-violet-500 z-10 opacity-70" />
          <div className="flex-1 h-full bg-gradient-to-b from-violet-800 to-violet-500 z-10 opacity-70" />
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
