import { use } from 'react'

export default async function Page() {
  let data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(
    (res) => res.json()
  )

  return (
    <div>
      {data?.title}
      <h2>Hello Next</h2>
    </div>
  )
}
