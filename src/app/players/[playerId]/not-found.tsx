'use client'
import { usePathname } from 'next/navigation'

export default function PlayerNotFound() {
  const pathname = usePathname()
  return (
    <div
      onClick={() => {
        throw new Error()
      }}
    >
      <h2>Not Found Player Page {pathname} </h2>
    </div>
  )
}
