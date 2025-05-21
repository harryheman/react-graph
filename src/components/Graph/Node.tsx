import { useState } from 'react'
import ForceGraph from 'react-force-graph-2d'
import { Flex } from '../Flex'
import { generateGraphData } from './utils'

const graphData = generateGraphData()

function Node() {
  // Видимость вершин
  const [nodeVisibility, setNodeVisibility] = useState(true)
  // Размер вершин
  const [nodeRelSize, setNodeRelSize] = useState(4)
  // Цвет вершин
  const [nodeColor, setNodeColor] = useState('deepskyblue')

  return (
    <Flex flexDirection='column' gap={12}>
      <h3>Кастомизация вершин</h3>
      <fieldset>
        <legend>Настройки</legend>
        <Flex flexDirection='column' gap={8}>
          <label>
            <input
              type='checkbox'
              checked={nodeVisibility}
              onChange={(e) => setNodeVisibility(e.target.checked)}
            />{' '}
            Видимость вершин
          </label>
          <label>
            Размер вершин{' '}
            <input
              type='number'
              value={nodeRelSize}
              onChange={(e) => setNodeRelSize(Number(e.target.value))}
              min={4}
              max={12}
            />
          </label>
          <Flex gap={8} alignItems='center'>
            <label>Цвет вершин</label>
            <input
              type='color'
              value={nodeColor}
              onChange={(e) => setNodeColor(e.target.value)}
            />

            <button onClick={() => setNodeColor('deepskyblue')}>Сброс</button>
          </Flex>
        </Flex>
      </fieldset>
      <Flex
        width={768}
        height={480}
        border='1px dashed rgba(0,0,0,0.25)'
        justifyContent='center'
        alignItems='center'
      >
        <ForceGraph
          width={768}
          height={480}
          graphData={graphData}
          nodeVisibility={nodeVisibility}
          nodeRelSize={nodeRelSize}
          nodeColor={() => nodeColor}
        />
      </Flex>
    </Flex>
  )
}

export default Node
