import React, { ReactNode } from 'react'

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-7xl mx-auto h-full px-8 md:px-16 lg:px-16 xl:px-8 2xl:px-0">
      {children}
    </div>
  )
}

export default Wrapper
