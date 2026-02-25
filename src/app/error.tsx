'use client'

import { useRouter } from 'next/navigation'
import { startTransition } from 'react'

export default function Error({ reset }: { reset: () => void }) {
  const router = useRouter()
  const reload = () => {
    startTransition(() => {
      reset()
      router.refresh()
    })
  }
  return <div onClick={reload}>Error happened</div>
}
