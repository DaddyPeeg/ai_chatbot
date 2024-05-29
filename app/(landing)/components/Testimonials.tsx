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
    title: 'Awesome',
    description:
      "They guided me through every step of finding the right insurance plan for my family's needs. Highly recommend!",
    author: 'Gary T.',
    membership: 'Member'
  },
  {
    rating: 3,
    title: 'Amazing',
    description:
      'I was impressed with how personalized their recommendations were. They really took the time to understand my situation.',
    author: 'John C.',
    membership: 'Client'
  },
  {
    rating: 4,
    title: 'Dynamic',
    description:
      'Their expertise was invaluable in helping me navigate the complexities of health insurance. Thank you for your support!',
    author: 'Harry P.',
    membership: 'Visitor'
  },
  {
    rating: 5,
    title: 'Efficient',
    description:
      'Quick and efficient! Got my insurance sorted out in no time. Thank you for making it so easy.',
    author: 'John W.',
    membership: 'Member'
  }
]

const Testimonials = () => {
  return (
    <div className="bg-[#f7f7fb]">
      <Wrapper>
        <div className="py-20 flex flex-col items-center">
          <h1 className="font-avenirnextltproregular text-[34px] leading-[41px] md:w-[40rem] text-center">
            Insightful Reviews: Experience Our Health Insurance Services
          </h1>
          <p className="mt-2 text-center">
            See how our tailored health insurance has helped diverse individuals
            and families firsthand."
          </p>
          <div className="flex flex-col lg:grid gap-4 grid-cols-4 w-full mt-10">
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
