export default async function TeamId({
  params
}: {
  params: { teamId: string }
}) {
  const { teamId } = await params

  return (
    <div>
      <h2>Team Page {teamId}</h2>
    </div>
  )
}
