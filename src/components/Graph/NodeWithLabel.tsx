import ForceGraph from 'react-force-graph-2d'
import { Flex } from '../Flex'
import { drawNodeLabel, drawNodePointerArea, generateGraphData } from './utils'

const graphData = generateGraphData()

function NodeWithLabel() {
  return (
    <Flex flexDirection='column' gap={12}>
      <h3>Узел с подписью</h3>
      <Flex width={768} height={480} border='1px dashed rgba(0,0,0,0.25)'>
        <ForceGraph
          width={768}
          height={480}
          graphData={graphData}
          // Рисуем подпись
          nodeCanvasObject={(node, ctx) =>
            drawNodeLabel({
              node,
              ctx,
            })
          }
          // Сначала рисуем дефолтный узел, затем - подпись
          nodeCanvasObjectMode={() => 'after'}
          // Рисуем область выделения/клика
          nodePointerAreaPaint={(node, color, ctx) =>
            drawNodePointerArea({ node, color, ctx })
          }
          // Отключаем тултипы
          nodeLabel='label'
          linkLabel='label'
        />
      </Flex>
    </Flex>
  )
}

export default NodeWithLabel
