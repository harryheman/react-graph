import { useCallback, useState } from 'react'
import ForceGraph, { type NodeObject } from 'react-force-graph-2d'
import { Flex } from '../Flex'
import { defaultColors, drawNodeRing, generateGraphData } from './utils'

const graphData = generateGraphData()

function Click() {
  // Выделенные узлы
  const [clickNodes, setClickNodes] = useState<(NodeObject | null)[]>([])
  // Индикатор выделения нескольких узлов
  const [multiple, setMultiple] = useState(false)

  const handleNodeClick = useCallback(
    (node: NodeObject) => {
      if (!multiple) {
        setClickNodes([node])
        return
      }
      let newClickNodes = [...clickNodes]
      if (newClickNodes.includes(node)) {
        newClickNodes = newClickNodes.filter((n) => n !== node)
      } else {
        newClickNodes.push(node)
      }
      setClickNodes(newClickNodes)
    },
    [clickNodes, multiple],
  )

  const { nodeColor, activeNodeColor } = defaultColors

  return (
    <Flex flexDirection='column' gap={12}>
      <h3>Выделение узлов</h3>
      <fieldset>
        <legend>Настройки</legend>
        <label>
          <input
            type='checkbox'
            checked={multiple}
            onChange={(e) => setMultiple(e.target.checked)}
          />{' '}
          Выделение нескольких вершин
        </label>
      </fieldset>
      <Flex width={768} height={480} border='1px dashed rgba(0,0,0,0.25)'>
        <ForceGraph
          width={768}
          height={480}
          graphData={graphData}
          onNodeClick={handleNodeClick}
          nodeCanvasObject={(node, ctx) => drawNodeRing({ node, ctx })}
          // Рисуем кольцо вокруг выделенных узлов
          nodeCanvasObjectMode={(node) =>
            clickNodes.includes(node) ? 'before' : undefined
          }
          // При клике по фону очищаем выделенные узлы
          onBackgroundClick={() => {
            setClickNodes([])
          }}
          nodeColor={(node) =>
            clickNodes.includes(node) ? activeNodeColor : nodeColor
          }
          // Отключаем перетаскивание узлов
          enableNodeDrag={false}
        />
      </Flex>
    </Flex>
  )
}

export default Click
