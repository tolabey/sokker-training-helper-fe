import { useState } from 'react'
import ReactEcharts from 'echarts-for-react'

interface JuniorTableProps {
  juniors: any
  currentWeek: number
}

export default function JuniorTable({
  juniors,
  currentWeek
}: JuniorTableProps) {
  const [player, setPlayer] = useState<any>(null)

  if (!juniors?.data) {
    return <div>no junior</div>
  }

  if (!juniors.data) {
    return null
  }

  console.log('juniors', juniors)
  return (
    <div>
      <h3>Hello Junior</h3>
      <table>
        <thead>
          <tr>
            <th>age</th>
            <th>name</th>
            <th>skill</th>
            <th>change</th>
            <th>weeks</th>
          </tr>
        </thead>
        <tbody>
          {juniors.data
            .find((each: any) => each._id === currentWeek)
            .data.juniors.map((junior: any) => (
              <tr key={junior.id} onClick={() => setPlayer(junior)}>
                <td>{junior.age}</td>
                <td>{junior.name}</td>
                <td>{junior.skill}</td>
                <td>{junior.change}</td>
                <td>{junior.weeks}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex flex-wrap justify-between">
        {player &&
          ['skill'].map((skill) => {
            const trainingData = juniors.data.map((training: any) => {
              const foundPlayer = training.data.juniors.find(
                (each: any) => each.id === player.id
              )
              if (!foundPlayer) {
                return null
              }

              const skill = foundPlayer.skill
              const weeks = foundPlayer.weeks

              return [weeks, skill]
            })

            const options = {
              grid: { top: 20, right: 40, bottom: 20, left: 40 },
              xAxis: {
                data: trainingData.map((perWeek: any) => perWeek && perWeek[0])
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  type: 'bar',
                  data: trainingData.map((perWeek: any) => {
                    return {
                      value: perWeek && perWeek[1],
                      itemStyle: {
                        color:
                          perWeek && perWeek[2] !== skill
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
              <div key={skill} className="w-[600px]">
                <div>{skill}</div>

                <div>
                  {trainingData.map((perWeek: any, index: number) => {
                    return <span key={index}>{perWeek && perWeek[1]},</span>
                  })}
                </div>

                <ReactEcharts
                  option={options}
                  style={{ width: '600px', height: '300px' }}
                ></ReactEcharts>
              </div>
            )
          })}
      </div>
    </div>
  )
}
