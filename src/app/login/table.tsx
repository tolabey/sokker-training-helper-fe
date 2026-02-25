import { useState } from 'react'

import ReactEcharts from 'echarts-for-react'

interface TableProps {
  trainings: any
  currentWeek: number
  selectedWeek: number | null
}

export default function Table(props: TableProps) {
  const { trainings, currentWeek, selectedWeek } = props
  const [player, setPlayer] = useState<any>(null)

  const columns = [
    'name',
    'form',
    'stamina',
    'pace',
    'technique',
    'passing',
    'keeper',
    'defending',
    'playmaking',
    'striker',
    'experience',
    'tacticalDiscipline',
    'teamwork'
  ]
  if (!currentWeek) {
    return null
  }

  const getSkillChange = (change: number) => {
    return change !== 0 ? `(${change})` : ''
  }

  const getSkills = (): React.ReactNode => {
    console.log('trainings', trainings, currentWeek)
    return trainings.data
      .find((each: any) => each._id === currentWeek)
      ?.data.players.map((each: any) => {
        if (selectedWeek === currentWeek) {
          return (
            <tr key={each.id} onClick={() => setPlayer(each)}>
              <td className="w-[200px]">{each.player.name.full}</td>
              <td>
                {each.report.skills.form}{' '}
                {getSkillChange(each.report.skillsChange.form)}
              </td>
              <td>
                {each.report.skills.stamina}{' '}
                {getSkillChange(each.report.skillsChange.stamina)}
              </td>
              <td>
                {each.report.skills.pace}{' '}
                {getSkillChange(each.report.skillsChange.pace)}
              </td>
              <td>
                {each.report.skills.technique}{' '}
                {getSkillChange(each.report.skillsChange.technique)}
              </td>
              <td>
                {each.report.skills.passing}{' '}
                {getSkillChange(each.report.skillsChange.passing)}
              </td>
              <td>
                {each.report.skills.keeper}{' '}
                {getSkillChange(each.report.skillsChange.keeper)}
              </td>
              <td>
                {each.report.skills.defending}{' '}
                {getSkillChange(each.report.skillsChange.defending)}
              </td>
              <td>
                {each.report.skills.playmaking}{' '}
                {getSkillChange(each.report.skillsChange.playmaking)}
              </td>
              <td>
                {each.report.skills.striker}{' '}
                {getSkillChange(each.report.skillsChange.striker)}
              </td>
              <td>
                {each.report.skills.experience}{' '}
                {getSkillChange(each.report.skillsChange.experience)}
              </td>
              <td>
                {each.report.skills.tacticalDiscipline}{' '}
                {getSkillChange(each.report.skillsChange.tacticalDiscipline)}
              </td>
              <td>
                {each.report.skills.teamwork}{' '}
                {getSkillChange(each.report.skillsChange.teamwork)}
              </td>
            </tr>
          )
        } else {
          const playerSelectedTraninig =
            selectedWeek &&
            trainings[selectedWeek].players.find(
              (player: any) => player.id === each.id
            )
          return (
            <tr key={each.id} onClick={() => setPlayer(each)}>
              <td>{each.player.name.full}</td>
              <td>
                {each.report.skills.form}{' '}
                {getSkillChange(
                  each.report.skills.form -
                    playerSelectedTraninig.report.skills.form
                )}
              </td>
              <td>
                {each.report.skills.stamina}{' '}
                {getSkillChange(
                  each.report.skills.stamina -
                    playerSelectedTraninig.report.skills.stamina
                )}
              </td>
              <td>
                {each.report.skills.pace}{' '}
                {getSkillChange(
                  each.report.skills.pace -
                    playerSelectedTraninig.report.skills.pace
                )}
              </td>
              <td>
                {each.report.skills.technique}{' '}
                {getSkillChange(
                  each.report.skills.technique -
                    playerSelectedTraninig.report.skills.technique
                )}
              </td>
              <td>
                {each.report.skills.passing}{' '}
                {getSkillChange(
                  each.report.skills.passing -
                    playerSelectedTraninig.report.skills.passing
                )}
              </td>
              <td>
                {each.report.skills.keeper}
                {getSkillChange(
                  each.report.skills.keeper -
                    playerSelectedTraninig.report.skills.keeper
                )}
              </td>
              <td>
                {each.report.skills.defending}{' '}
                {getSkillChange(
                  each.report.skills.defending -
                    playerSelectedTraninig.report.skills.defending
                )}
              </td>
              <td>
                {each.report.skills.playmaking}{' '}
                {getSkillChange(
                  each.report.skills.playmaking -
                    playerSelectedTraninig.report.skills.playmaking
                )}
              </td>
              <td>
                {each.report.skills.striker}{' '}
                {getSkillChange(
                  each.report.skills.striker -
                    playerSelectedTraninig.report.skills.striker
                )}
              </td>
              <td>
                {each.report.skills.experience}{' '}
                {getSkillChange(
                  each.report.skills.experience -
                    playerSelectedTraninig.report.skills.experience
                )}
              </td>
              <td>
                {each.report.skills.tacticalDiscipline}{' '}
                {getSkillChange(
                  each.report.skills.tacticalDiscipline -
                    playerSelectedTraninig.report.skills.tacticalDiscipline
                )}
              </td>
              <td>
                {each.report.skills.teamwork}{' '}
                {getSkillChange(
                  each.report.skills.teamwork -
                    playerSelectedTraninig.report.skills.teamwork
                )}
              </td>
            </tr>
          )
        }
      })
  }

  return (
    <div>
      <table className="w-full table-fixed	border border-slate-500 border-spacing-2 border-separate">
        <caption>player table</caption>
        <thead>
          <tr className="space-x-2">
            {columns.map((col: string) => {
              return <th key={col}>{col}</th>
            })}
          </tr>
        </thead>
        <tbody>{getSkills()}</tbody>
      </table>

      <div id="player-skills-wrapper">
        {player && (
          <div>
            <h3>{player.player.name.full}</h3>
            <div>
              <div>id: {player.id}</div>

              <div>
                {trainings.data.map((training: any, index) => {
                  const id = training._id

                  const player1 = training.data.players.find(
                    (each: any) => each.id === player.id
                  )

                  const prevplayer1 =
                    trainings.data[index - 1]?.data?.players?.find(
                      (each: any) => each.id === player.id
                    ) || {}

                  if (!player1) {
                    return null
                  }
                  const playerSkills = player1.report.skills
                  const playerPrevSkills = prevplayer1?.report?.skills || {}

                  const trainingKind = player1.report.type.name
                  const injury = player1.report.injury.severe

                  const getStyle = (
                    player: any,
                    prevPlayer: any,
                    skill: string
                  ) => {
                    return {
                      backgroundColor:
                        prevPlayer && prevPlayer[skill] < player[skill]
                          ? 'green'
                          : prevPlayer[skill] > player[skill]
                            ? 'red'
                            : 'transparent'
                    }
                  }

                  return (
                    <div key={id} className="flex space-x-4">
                      <div>{id}</div>
                      <div
                        style={getStyle(playerSkills, playerPrevSkills, 'pace')}
                      >
                        {playerSkills.pace}
                      </div>
                      <div
                        style={getStyle(
                          playerSkills,
                          playerPrevSkills,
                          'technique'
                        )}
                      >
                        {playerSkills.technique}
                      </div>
                      <div
                        style={getStyle(
                          playerSkills,
                          playerPrevSkills,
                          'passing'
                        )}
                      >
                        {playerSkills.passing}
                      </div>
                      <div
                        style={getStyle(
                          playerSkills,
                          playerPrevSkills,
                          'keeper'
                        )}
                      >
                        {playerSkills.keeper}
                      </div>

                      <div
                        style={getStyle(
                          playerSkills,
                          playerPrevSkills,
                          'defending'
                        )}
                      >
                        {playerSkills.defending}
                      </div>
                      <div
                        style={getStyle(
                          playerSkills,
                          playerPrevSkills,
                          'playmaking'
                        )}
                      >
                        {playerSkills.playmaking}
                      </div>
                      <div>{playerSkills.striker}</div>
                      <div>{injury ? 'injured' : 'healthy'}</div>
                      <div>{trainingKind}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-between">
        {player &&
          [
            'form',
            'stamina',
            'pace',
            'technique',
            'passing',
            'keeper',
            'defending',
            'playmaking',
            'striker',
            'experience',
            'tacticalDiscipline',
            'teamwork'
          ].map((skill) => {
            const trainingData = trainings.data.map((training: any) => {
              const foundPlayer = training.data.players.find(
                (each: any) => each.id === player.id
              )
              if (!foundPlayer) {
                return null
              }
              const report = foundPlayer.report

              const week = report.week

              return {
                week,
                skill: report.skills[skill],
                kind: report.kind.name === 'individual' && report.type.name,
                injury: report.injury.severe
              }
            })

            const options = {
              grid: { top: 20, right: 40, bottom: 20, left: 40 },
              xAxis: {
                data: trainingData.map(
                  (perWeek: any) => perWeek && perWeek.week
                )
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  type: 'bar',
                  data: trainingData.map((perWeek: any) => {
                    return {
                      value: perWeek && perWeek.skill,
                      itemStyle: {
                        color: perWeek?.injury
                          ? '#ff4d4f'
                          : perWeek && perWeek.kind !== skill
                            ? '#475b6b'
                            : '#cc8b62'
                      }
                    }
                  })
                }
              ],
              tooltip: {
                trigger: 'axis'
              }
            }

            return (
              <div key={skill} className="w-full">
                <div>{skill}</div>

                <ReactEcharts option={options}></ReactEcharts>
              </div>
            )
          })}
      </div>
    </div>
  )
}
