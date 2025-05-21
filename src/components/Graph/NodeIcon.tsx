import { useEffect, useRef, useState } from 'react'
import ForceGraph from 'react-force-graph-2d'
import { Flex } from '../Flex'
import { drawNodeImage, generateGraphData } from './utils'

const graphData = generateGraphData()

function NodeIcon() {
  const spanRef = useRef<HTMLSpanElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])

  useEffect(() => {
    if (!spanRef.current) return
    const images = [...spanRef.current.querySelectorAll('img')]
    setImages(images)
  }, [])

  return (
    <Flex flexDirection='column' gap={12}>
      <h3>Узел с иконкой</h3>
      {/* Небольшой хак */}
      <span
        ref={spanRef}
        style={{
          display: 'none',
        }}
      >
        {/* Изображения лежат в директории `public/graph` */}
        <img src='/graph/briefcase.svg' alt='' />
        <img src='/graph/folder.svg' alt='' />
        <img src='/graph/font.svg' alt='' />
        <img src='/graph/paste.svg' alt='' />
        <img src='/graph/user.svg' alt='' />
      </span>
      <Flex width={768} height={480} border='1px dashed rgba(0,0,0,0.25'>
        <ForceGraph
          width={768}
          height={480}
          graphData={graphData}
          nodeRelSize={6}
          nodeCanvasObject={(node, ctx) => {
            // Выбираем изображение
            const image = images[Number(node.id) % 5]

            // Рисуем его
            drawNodeImage({ node, ctx, image })
          }}
          // Сначала рисуем дефолтный узел, затем - иконку
          nodeCanvasObjectMode={() => 'after'}
        />
      </Flex>
    </Flex>
  )
}

export default NodeIcon
