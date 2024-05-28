'use client'

import { Testimonial } from '@/app/(landing)/components/Testimonials'
import { StarIcon } from '@/public/assets'
import Image from 'next/image'
import React from 'react'

const TestimonialCards = ({ testimonial }: { testimonial: Testimonial }) => {
  const { rating, title, description, author, membership } = testimonial
  const starRating = Array.from({ length: rating })
  return (
    <div className="py-6 px-4 rounded-lg bg-white shadow-xl">
      <div className="flex gap-1">
        {starRating.map((_, index) => (
          <div className="relative h-4 w-4" key={`star${index}`}>
            <Image
              fill
              sizes="((min-width: 50em) and (max-width: 60em)) 50em,
              ((min-width: 30em) and (max-width: 50em)) 30em,
              (max-width: 30em) 20em"
              src={StarIcon}
              alt={`star-${index}`}
            />
          </div>
        ))}
      </div>
      <h1 className="font-bold text-sm my-4">{title}</h1>
      <p className="font-thin">{description}</p>
      <div className="flex mt-8">
        <p className="text-custom_primary text-xs font-bold">{author}</p>
        <p className="text-xs">
          {', '}
          {membership}
        </p>
      </div>
    </div>
  )
}

export default TestimonialCards
