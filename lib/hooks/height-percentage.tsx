import { useState, useEffect } from 'react'

const useScrollPercentage = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  const calculateScrollPercentage = () => {
    const windowHeight = window.innerHeight
    const fullHeight = document.body.clientHeight
    const scrollTop = window.scrollY
    const scrolled = scrollTop / (fullHeight - windowHeight)
    const percentage = scrolled
    setScrollPercentage(percentage)
  }

  useEffect(() => {
    window.addEventListener('scroll', calculateScrollPercentage)
    return () => {
      window.removeEventListener('scroll', calculateScrollPercentage)
    }
  }, [])

  return scrollPercentage
}

export default useScrollPercentage
