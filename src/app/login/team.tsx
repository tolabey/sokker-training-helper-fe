export default function Team({ team }: any) {
  if (!team) {
    return <div>no team</div>
  }

  return (
    <div>
      <h3>Hello Team</h3>
      <div>
        <div> name: {team.team.name}</div>
        <div> id: {team.team.id}</div>
        <div> rank: {team.team.rank}</div>
        <div> week: {team.today.week}</div>
      </div>
    </div>
  )
}
