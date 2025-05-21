import { useState } from 'react'
import ForceGraph, { type NodeObject } from 'react-force-graph-2d'
import { Flex } from '../Flex'
import {
  defaultColors,
  drawNodeLabel,
  drawNodePointerArea,
  drawNodeTooltip,
  generateGraphData,
} from './utils'

const graphData = generateGraphData()

function NodeWithLabelAndTooltip() {
  // Узел в состоянии hover
  const [hoverNode, setHoverNode] = useState<NodeObject | null>(null)

  const { nodeColor, activeNodeColor } = defaultColors

  return (
    <Flex flexDirection='column' gap={12}>
      <h3>Узел с подписью и тултипом</h3>
      <Flex width={768} height={480} border='1px dashed rgba(0,0,0,0.25)'>
        <ForceGraph
          width={768}
          height={480}
          graphData={graphData}
          onNodeHover={(node) => {
            setHoverNode(node)
          }}
          nodeCanvasObject={(node, ctx) => {
            // Рисуем подпись
            drawNodeLabel({
              node,
              ctx,
              hoverNodes: [hoverNode],
            })
            // Если узел находится в состоянии hover
            if (node === hoverNode) {
              // Рисуем тултип
              drawNodeTooltip({
                node,
                ctx,
                tooltip: `Подсказка к ${node.name}`,
              })
            }
          }}
          // Сначала рисуем дефолтный узел, затем подпись и тултип
          // (для узла, находящегося в состоянии hover)
          nodeCanvasObjectMode={() => 'after'}
          // Рисуем область выделения/клика
          nodePointerAreaPaint={(node, color, ctx) =>
            drawNodePointerArea({ node, color, ctx })
          }
          // Цвет узла зависит от его состояния
          nodeColor={(node) =>
            node === hoverNode ? activeNodeColor : nodeColor
          }
          // Отключаем встроенные тултипы
          nodeLabel='label'
          linkLabel='label'
        />
      </Flex>
    </Flex>
  )
}

export default NodeWithLabelAndTooltip
