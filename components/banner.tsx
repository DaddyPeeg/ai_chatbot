import React, { ReactNode } from 'react'
import Wrapper from './wrapper'

const Banner = ({
  children,
  variant
}: {
  children: ReactNode
  variant: 'accent' | 'main'
}) => {
  if (variant === 'main')
    return (
      <div className="w-full bg-custom_secondary text-custom_secondary-foreground py-4">
        <Wrapper>{children}</Wrapper>
      </div>
    )
  if (variant === 'accent')
    return (
      <div className="w-full bg-custom_secondary text-custom_secondary-foreground py-8">
        <Wrapper>{children}</Wrapper>
      </div>
    )
}

export default Banner
