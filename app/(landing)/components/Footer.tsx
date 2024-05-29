import { Separator } from '@/components/ui/separator'
import Wrapper from '@/components/wrapper'
import { ChatBotIcon } from '@/public/assets'
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TwitterIcon
} from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <section className="py-8 bg-white ">
      <Wrapper>
        <div className="flex flex-col items-center lg:flex-row justify-center md:justify-between">
          <div className="flex flex-col md:flex-row items-center sm:gap-4">
            <Image
              src={ChatBotIcon}
              alt="chatboticon"
              className=""
              width={60}
              height={60}
            />
            <div className="flex flex-col">
              <h1 className="font-avenirnextltproregular text-center text-lg sm:text-3xl">
                Healthcare Chat Bot
              </h1>
              <p className="text-xs sm:text-sm">
                © 2024 Company Name. All rights reserved.{' '}
              </p>
            </div>
          </div>
          <div className="max-w-lg md:w-auto hidden sm:flex items-center mt-4 lg:mt-0 gap-6">
            <span className="bg-[#323232] text-white p-2 rounded-full">
              <FacebookIcon size={20} />
            </span>
            <span className="bg-[#323232] text-white p-2 rounded-full">
              <GithubIcon size={20} />
            </span>
            <span className="bg-[#323232] text-white p-2 rounded-full">
              <InstagramIcon size={20} />
            </span>
            <span className="bg-[#323232] text-white p-2 rounded-full">
              <TwitterIcon size={20} />
            </span>
          </div>
          <div className="max-w-lg md:w-auto flex items-center sm:hidden mt-4 lg:mt-0 gap-2">
            <span className="bg-[#323232] text-white p-2 rounded-full">
              <FacebookIcon size={15} />
            </span>
            <span className="bg-[#323232] text-white p-2 rounded-full">
              <GithubIcon size={15} />
            </span>
            <span className="bg-[#323232] text-white p-2 rounded-full">
              <InstagramIcon size={15} />
            </span>
            <span className="bg-[#323232] text-white p-2 rounded-full">
              <TwitterIcon size={15} />
            </span>
          </div>
        </div>
      </Wrapper>
    </section>
  )
}

export default Footer
