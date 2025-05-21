import { useCallback, useEffect, useRef, useState } from 'react'
import ForceGraph, {
  type LinkObject,
  type NodeObject,
} from 'react-force-graph-2d'
import { Flex } from '../Flex'
import { drawNodeImage } from './utils'

type NodeObjectWithChildren = NodeObject & {
  children?: NodeObject[]
}

const initialGraphData: {
  nodes: NodeObjectWithChildren[]
  links: LinkObject[]
} = {
  nodes: [
    {
      id: 0,
      name: 'node 0',
    },
    {
      id: 1,
      name: 'node 1',
      children: [
        {
          id: 5,
          name: 'node 5',
        },
        {
          id: 6,
          name: 'node 6',
        },
        {
          id: 7,
          name: 'node 7',
        },
      ],
    },
    {
      id: 2,
      name: 'node 2',
    },
    {
      id: 3,
      name: 'node 3',
      children: [
        {
          id: 8,
          name: 'node 8',
        },
        {
          id: 9,
          name: 'node 9',
        },
      ],
    },
    {
      id: 4,
      name: 'node 4',
    },
  ],
  links: [
    {
      source: 1,
      target: 0,
      name: 'link 1',
    },
    {
      source: 2,
      target: 0,
      name: 'link 2',
    },
    {
      source: 3,
      target: 1,
      name: 'link 3',
    },
    {
      source: 4,
      target: 3,
      name: 'link 4',
    },
  ],
}

function Children() {
  const spanRef = useRef<HTMLSpanElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])

  const [graphData, setGraphData] = useState(initialGraphData)
  // Раскрытые узлы
  const [expandedNodes, setExpandedNodes] = useState<NodeObject[]>([])

  useEffect(() => {
    if (!spanRef.current) return
    const images = [...spanRef.current.querySelectorAll('img')]
    setImages(images)
  }, [])

  const handleNodeClick = useCallback(
    (node: NodeObject) => {
      if (!node.children) return
      // Отслеживаем раскрытые узлы
      let newExpandedNodes = [...expandedNodes]
      if (!expandedNodes.includes(node)) {
        newExpandedNodes.push(node)
      } else {
        newExpandedNodes = newExpandedNodes.filter((n) => n !== node)
      }
      setExpandedNodes(newExpandedNodes)
      // Добавляем/удаляем вложенные вершины и ребра
      let nodes = [...graphData.nodes]
      let links = [...graphData.links]
      const children: NodeObjectWithChildren[] = node.children
      const childIds = children.map((n) => n.id)
      if (!expandedNodes.includes(node)) {
        nodes.push(...children)
        const newLinks = children.map((n, i) => ({
          id: links.length + i + 1,
          source: n.id,
          target: node.id,
        }))
        links.push(...newLinks)
      } else {
        nodes = nodes.filter((n) => !childIds.includes(n.id))
        links = links.filter((l) => {
          const sourceId = typeof l.source === 'object' ? l.source.id : l.source
          return !childIds.includes(sourceId)
        })
      }
      setGraphData({ nodes, links })
    },
    [expandedNodes, graphData],
  )

  return (
    <Flex flexDirection='column' gap={12}>
      {/* Небольшой хак */}
      <span
        ref={spanRef}
        style={{
          display: 'none',
        }}
      >
        {/* Изображения лежат в директории `public/graph` */}
        <img src='/graph/plus.svg' alt='' />
        <img src='/graph/minus.svg' alt='' />
      </span>
      <Flex width={768} height={480} border='1px dashed rgba(0,0,0,0.25)'>
        <ForceGraph
          width={768}
          height={480}
          graphData={graphData}
          nodeRelSize={6}
          nodeCanvasObject={(node, ctx) => {
            // Нас интересуют только узлы с потомками
            if (node.children) {
              // images[1] - иконка минуса, images[0] - иконка плюса
              const image = expandedNodes.includes(node) ? images[1] : images[0]

              drawNodeImage({ node, ctx, image })
            }
          }}
          // Сначала рисуем дефолтный узел, затем - соответствующую иконку
          nodeCanvasObjectMode={() => 'after'}
          onNodeClick={handleNodeClick}
        />
      </Flex>
    </Flex>
  )
}

export default Children
