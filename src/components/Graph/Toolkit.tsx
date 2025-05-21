import { useEffect, useRef, useState } from 'react'
import ForceGraph, {
  type ForceGraphMethods,
  type LinkObject,
  type NodeObject,
} from 'react-force-graph-2d'
import { Flex } from '../Flex'
import { generateGraphData } from './utils'

const graphData = generateGraphData()

type NodeType = (typeof graphData.nodes)[number]
type LinkType = (typeof graphData.links)[number]

function Toolkit() {
  // Текущий масштаб
  const [currentZoom, setCurrentZoom] = useState(1)

  const graphRef = useRef<
    | ForceGraphMethods<NodeObject<NodeType>, LinkObject<NodeType, LinkType>>
    | undefined
  >()

  // Эффект изменения масштаба
  useEffect(() => {
    if (!graphRef.current) return
    graphRef.current.zoom(currentZoom)
  }, [currentZoom])

  return (
    <Flex flexDirection='column' gap={12}>
      <h3>Панель управления</h3>

      <Flex
        width={768}
        height={480}
        border='1px dashed rgba(0,0,0,0.25)'
        position='relative'
      >
        <Flex
          position='absolute'
          top='50%'
          transform='translateY(-50%)'
          right={12}
          zIndex={1}
          flexDirection='column'
          gap={8}
          backgroundColor='gray'
          padding={8}
        >
          <button
            onClick={() => setCurrentZoom((currentZoom) => currentZoom + 0.5)}
          >
            Увеличить <br />
            масштаб
          </button>
          <button
            onClick={() => setCurrentZoom((currentZoom) => currentZoom - 0.5)}
          >
            Уменьшить <br />
            масштаб
          </button>
          <button onClick={() => graphRef.current?.zoomToFit()}>
            Увеличить <br />
            до контейнера
          </button>
          <button onClick={() => graphRef.current?.centerAt(0, 0)}>
            Выровнять <br />
            по центру
          </button>
        </Flex>
        <ForceGraph
          ref={graphRef}
          width={768}
          height={480}
          graphData={graphData}
          // После начального масштабирования (после первого рендеринга),
          // а также после масштабирования до контейнера,
          // необходимо обновить состояние текущего масштаба
          onZoomEnd={({ k }) => {
            if (k !== currentZoom) {
              setCurrentZoom(k)
            }
          }}
          // Отключаем масштабирование прокруткой
          enableZoomInteraction={false}
        />
      </Flex>
    </Flex>
  )
}

export default Toolkit
