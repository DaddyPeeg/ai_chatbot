import { Button } from '@/components/ui/button2'
import Wrapper from '@/components/wrapper'
import { CheckNew, Lock, OkFemale } from '@/public/assets'
import { LockClosedIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import React from 'react'

const Page_3 = () => {
  return (
    <Wrapper>
      <div className="pb-16 flex justify-center items-center flex-col gap-16">
        <div className="flex flex-col md:flex-row justify-center gap-24">
          <div className="relative w-[20rem] order-2 md:order-none h-[20rem]">
            <Image
              src={OkFemale}
              alt="OkFemaleImage"
              fill
              sizes="(max-width: 1830px) 100vw, 1830px"
            />
          </div>
          <div className="flex flex-col order-1 md:order-none">
            <h1 className="font-avenirnextltproregular leading-[3rem] text-4xl max-w-sm">
              Easily get insurance from start to finish
            </h1>
            <p className="font-light mt-4">
              It takes less than 8 minutes to apply.
            </p>
            <div className="mt-8 flex flex-col gap-2">
              <ul className="flex items-center gap-2">
                <span className="bg-custom_primary rounded-full w-4 h-4 relative text-white">
                  <p className="absolute text-[11px] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
                    1
                  </p>
                </span>
                Tell us about your self
              </ul>
              <ul className="flex items-center gap-2">
                <span className="bg-custom_primary rounded-full w-4 h-4 relative text-white">
                  <p className="absolute text-[11px] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
                    2
                  </p>
                </span>
                Check out recommended plan
              </ul>
              <ul className="flex items-center gap-2">
                <span className="bg-custom_primary rounded-full w-4 h-4 relative text-white">
                  <p className="absolute text-[11px] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
                    3
                  </p>
                </span>
                Pick a plan that fits your needs
              </ul>
              <ul className="flex items-center gap-2">
                <span className="bg-custom_primary rounded-full w-4 h-4 relative text-white">
                  <p className="absolute text-[11px] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
                    4
                  </p>
                </span>
                Submit your application
              </ul>
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                className="uppercase font-semibold rounded-full"
              >
                Start your Application
              </Button>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="relative h-4 w-3">
                <Image
                  src={Lock}
                  alt="LockIcon"
                  fill
                  sizes="(max-width: 40px) 100vw, 40px"
                />
              </div>
              <p className="text-xs">Your information is kept secure.</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-evenly max-w-3xl items-center md:w-full">
          <div className="flex gap-2 items-center">
            <div className="relative h-5 w-5">
              <Image
                src={CheckNew}
                alt="CheckIconNew"
                fill
                sizes="(max-width: 40px) 100vw, 40px"
              />
            </div>
            <p>No hidden fees</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative h-5 w-5">
              <Image
                src={CheckNew}
                alt="CheckIconNew"
                fill
                sizes="(max-width: 40px) 100vw, 40px"
              />
            </div>
            <p>No markups</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative h-5 w-5">
              <Image
                src={CheckNew}
                alt="CheckIconNew"
                fill
                sizes="(max-width: 40px) 100vw, 40px"
              />
            </div>
            <p>No paperwork</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative h-5 w-5">
              <Image
                src={CheckNew}
                alt="CheckIconNew"
                fill
                sizes="(max-width: 40px) 100vw, 40px"
              />
            </div>
            <p>No hassle</p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Page_3
