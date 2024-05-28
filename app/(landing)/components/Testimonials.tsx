import TestimonialCards from '@/components/testimonial-cards'
import Wrapper from '@/components/wrapper'
import { ReviewsIO } from '@/public/assets'
import Image from 'next/image'
import React from 'react'

export interface Testimonial {
  rating: 0 | 1 | 2 | 3 | 4 | 5
  title: string
  description: string
  author: string
  membership: string
}

const testimonials: Testimonial[] = [
  {
    rating: 5,
    title: 'Easy',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis voluptas perferendis minus blanditiis magnam unde asperiores atque totam quo doloremque.',
    author: 'Gary T.',
    membership: 'Member'
  },
  {
    rating: 3,
    title: 'Amazing',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis voluptas perferendis minus blanditiis magnam unde asperiores atque totam quo doloremque.',
    author: 'John C.',
    membership: 'Client'
  },
  {
    rating: 4,
    title: 'Dynamic',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis voluptas perferendis minus blanditiis magnam unde asperiores atque totam quo doloremque.',
    author: 'Harry P.',
    membership: 'Visitor'
  },
  {
    rating: 5,
    title: 'Effienct',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis voluptas perferendis minus blanditiis magnam unde asperiores atque totam quo doloremque.',
    author: 'John W.',
    membership: 'Member'
  }
]

const Testimonials = () => {
  return (
    <div className="bg-[#f7f7fb]">
      <Wrapper>
        <div className="py-20 flex flex-col items-center">
          <h1 className="font-avenirnextltproregular text-[34px] leading-[41px] w-[40rem] text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit!
          </h1>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur.</p>
          <div className="borde grid gap-4 grid-cols-4 w-full mt-10">
            {testimonials.map((data, index) => (
              <TestimonialCards key={`test-${index}`} testimonial={data} />
            ))}
          </div>
          <Image className="mt-10" src={ReviewsIO} alt="reviews" />
        </div>
      </Wrapper>
    </div>
  )
}

export default Testimonials
