import { useState } from 'react'
import ForceGraph from 'react-force-graph-2d'
import { Flex } from '../Flex'
import { generateGraphData } from './utils'

const graphData = generateGraphData()

function Basic() {
  // Масштабирование
  const [enableZoomInteraction, setEnableZoomInteraction] = useState(true)
  // Перетаскивание графа
  const [enablePanInteraction, setEnablePanInteraction] = useState(true)
  // Перетаскивание узлов
  const [enableNodeDrag, setEnableNodeDrag] = useState(true)
  // События указателя
  const [enablePointerInteraction, setEnablePointerInteraction] = useState(true)

  return (
    <Flex flexDirection='column' gap={12}>
      <h3>Базовый вариант</h3>
      <fieldset>
        <legend>Настройки</legend>
        <Flex flexDirection='column' gap={8}>
          <label>
            <input
              type='checkbox'
              checked={enableZoomInteraction}
              onChange={(e) => setEnableZoomInteraction(e.target.checked)}
            />{' '}
            Масштабирование графа
          </label>
          <label>
            <input
              type='checkbox'
              checked={enablePanInteraction}
              onChange={(e) => setEnablePanInteraction(e.target.checked)}
            />{' '}
            Перетаскивание графа
          </label>
          <label>
            <input
              type='checkbox'
              checked={enableNodeDrag}
              onChange={(e) => setEnableNodeDrag(e.target.checked)}
            />{' '}
            Перетаскивание вершин
          </label>
          <label>
            <input
              type='checkbox'
              checked={enablePointerInteraction}
              onChange={(e) => setEnablePointerInteraction(e.target.checked)}
            />{' '}
            События указателя
          </label>
        </Flex>
      </fieldset>
      <Flex width={768} height={480} border='1px dashed rgba(0,0,0,0.25)'>
        <ForceGraph
          width={768}
          height={480}
          graphData={graphData}
          enableZoomInteraction={enableZoomInteraction}
          enablePanInteraction={enablePanInteraction}
          enableNodeDrag={enableNodeDrag}
          enablePointerInteraction={enablePointerInteraction}
        />
      </Flex>
    </Flex>
  )
}

export default Basic
