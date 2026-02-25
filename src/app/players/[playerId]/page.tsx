import { notFound } from 'next/navigation'

interface PlayerProps {
  params: { playerId: string }
}

export default async function NotFound({ params }: PlayerProps) {
  const { playerId } = await params

  if (playerId === '123') {
    if (Math.random() > 0.5) {
      throw new Error()
    }
    notFound()
  }

  return (
    <div>
      <h2>Player Page {playerId}</h2>
    </div>
  )
}
