'use client'

import { useState } from 'react'
import Team from './team'
import Table from './table'
import JuniorTable from './JuniorTable'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [trainings, setTrainings] = useState<Record<number, any>>({})
  const [juniorTrainings, setJuniorTrainings] = useState<Record<number, any>>(
    {}
  )

  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)

  const [current, setCurrent] = useState<any>(null)

  const login = async () => {
    const data = await fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify({ login: username, password })
    })

    const resp = await data.json()
    const currentWeek = resp.current.today.week

    const currentDataResp = await fetch(
      'http://localhost:3001/training?' +
        new URLSearchParams({
          week: currentWeek
        }).toString()
    )

    const currentJuniorsResp = await fetch(
      'http://localhost:3001/save-juniors?' +
        new URLSearchParams({
          week: currentWeek
        }).toString()
    )
    const currentJuniorsData = await currentJuniorsResp.json()
    const currentData = await currentDataResp.json()

    setCurrent(resp.current)
    setJuniorTrainings(currentJuniorsData)
    setSelectedWeek(resp.current.today.week)
    setTrainings(currentData)
  }

  const logout = async () => {
    await fetch('http://localhost:3001/logout')
  }

  const getCurrent = async () => {
    await fetch('http://localhost:3001/current')
  }

  console.log('trainings', trainings)

  return (
    <div>
      <div className="space-x-2 flex">
        <input
          placeholder="username"
          onChange={(event) => setUsername(event?.target.value)}
          value={username}
        />
        <input
          placeholder="password"
          onChange={(event) => setPassword(event?.target.value)}
          value={password}
        />
      </div>
      <div className="flex space-x-2">
        <button onClick={() => login()}>Login</button>
        <button onClick={() => logout()}>Logout</button>
        <button onClick={() => getCurrent()}>get Current</button>
      </div>
      <Team team={current} />

      <Table
        trainings={trainings}
        currentWeek={current?.today.week as number}
        selectedWeek={selectedWeek}
      />
      <JuniorTable
        juniors={juniorTrainings}
        currentWeek={current?.today.week as number}
      />
    </div>
  )
}
