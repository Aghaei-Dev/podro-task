import { useRef } from 'react'

export const useThrottle = (func, limit) => {
  const lastRun = useRef(Date.now())
  const canInvoke = Date.now() - lastRun.current >= limit
  const throttledFunc = () => {
    if (canInvoke) {
      func()
      lastRun.current = Date.now()
    }
  }
  return [throttledFunc, canInvoke]
}
