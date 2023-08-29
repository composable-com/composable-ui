import { useState, useEffect, useRef } from 'react'

type Options = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

export const useOnScreen = <T extends HTMLElement>(
  options?: Options
): [React.RefObject<T>, boolean] => {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentRef = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [options])

  return [ref, isVisible]
}
