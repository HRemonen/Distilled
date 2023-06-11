import React, { useEffect } from 'react'

const useClickOutside = (
  ref: React.MutableRefObject<any>,
  callback: (...args: any[]) => void
) => {
  const handleClickOutside = (event: any) => {
    if (!ref.current) return
    if (!ref.current.contains(event.target)) {
      callback()
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
  }, [])
}

export default useClickOutside
