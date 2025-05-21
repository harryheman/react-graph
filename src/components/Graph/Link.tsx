import { useEffect, useState } from 'react'
import ForceGraph from 'react-force-graph-2d'
import { Flex } from '../Flex'
import { generateGraphData } from './utils'

const initialGraphData = generateGraphData()

function Link() {
  const [graphData, setGraphData] = useState(initialGraphData)

  // Видимость ребер
  const [linkVisibility, setLinkVisibility] = useState(true)
  // Цвет ребер
  const [linkColor, setLinkColor] = useState('deepskyblue')
  // Ширина ребер
  const [linkWidth, setLinkWidth] = useState(1)
  // Прерывистость линии
  const [linkLineDash, setLinkLineDash] = useState(false)
  // Кривизна линии
  const [linkCurvature, setLinkCurvature] = useState(false)
  // Длина стрелки
  const [linkDirectionalArrowLength, setLinkDirectionalArrowLength] =
    useState(0)
  // Положение стрелки
  const [linkDirectionalArrowRelPos, setLinkDirectionalArrowRelPos] =
    useState(0.5)
  // Двойные стрелки
  const [doubleArrows, setDoubleArrows] = useState(false)

  useEffect(() => {
    if (doubleArrows) {
      // Удваиваем количество ребер
      const links = [...initialGraphData.links]
      const reversedLinks = links.map((link, i) => {
        return {
          id: links.length + i + 1,
          source: link.target,
          target: link.source,
        }
      })
      const allLinks = links.concat(reversedLinks)
      const newGraphData = {
        nodes: [...initialGraphData.nodes],
        links: allLinks,
      }
      setGraphData(newGraphData)
    } else {
      setGraphData(initialGraphData)
    }
  }, [doubleArrows])

  return (
    <Flex flexDirection='column' gap={12}>
      <h3>Кастомизация ребер</h3>
      <fieldset>
        <legend>Настройки</legend>
        <Flex flexDirection='column' gap={8}>
          <label>
            <input
              type='checkbox'
              checked={linkVisibility}
              onChange={(e) => setLinkVisibility(e.target.checked)}
            />{' '}
            Видимость вершин
          </label>
          <label>
            Ширина ребер{' '}
            <input
              type='number'
              value={linkWidth}
              onChange={(e) => setLinkWidth(Number(e.target.value))}
              min={1}
              max={4}
            />
          </label>
          <Flex gap={8} alignItems='center'>
            <label>Цвет ребер</label>
            <input
              type='color'
              value={linkColor}
              onChange={(e) => setLinkColor(e.target.value)}
            />

            <button onClick={() => setLinkColor('deepskyblue')}>Сброс</button>
          </Flex>
          <label>
            <input
              type='checkbox'
              checked={linkLineDash}
              onChange={(e) => setLinkLineDash(e.target.checked)}
            />{' '}
            Прерывистая линия
          </label>
          <label>
            <input
              type='checkbox'
              checked={linkCurvature}
              onChange={(e) => setLinkCurvature(e.target.checked)}
            />{' '}
            Кривая линия
          </label>
          <label>
            Длина стрелки{' '}
            <input
              type='number'
              value={linkDirectionalArrowLength}
              onChange={(e) =>
                setLinkDirectionalArrowLength(Number(e.target.value))
              }
              min={0}
              max={8}
            />
          </label>
          <label>
            Положение стрелки{' '}
            <input
              type='number'
              value={linkDirectionalArrowRelPos}
              onChange={(e) =>
                setLinkDirectionalArrowRelPos(Number(e.target.value))
              }
              min={0}
              max={1}
              step={0.1}
            />
          </label>
          <label>
            <input
              type='checkbox'
              checked={doubleArrows}
              onChange={(e) => setDoubleArrows(e.target.checked)}
            />{' '}
            Двойные стрелки
          </label>
        </Flex>
      </fieldset>
      <Flex width={768} height={480} border='1px dashed rgba(0,0,0,0.25)'>
        <ForceGraph
          width={768}
          height={480}
          graphData={graphData}
          linkVisibility={linkVisibility}
          linkColor={() => linkColor}
          linkWidth={linkWidth}
          // [ширина линии, ширина отступа]
          linkLineDash={linkLineDash ? [4, 2] : undefined}
          // от 0 до 1
          linkCurvature={linkCurvature ? 1 : undefined}
          linkDirectionalArrowColor={() => linkColor}
          linkDirectionalArrowLength={linkDirectionalArrowLength}
          linkDirectionalArrowRelPos={linkDirectionalArrowRelPos}
        />
      </Flex>
    </Flex>
  )
}

export default Link
