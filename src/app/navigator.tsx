import Link from 'next/link'

export default function Navigator() {
  return (
    <div className="flex space-x-2 bg-red-500">
      <div className="border p-2">
        <Link href={'/'}>Root</Link>
      </div>
      <div className="border p-2">
        <Link href={'/login'}>Login</Link>
      </div>{' '}
    </div>
  )
}
