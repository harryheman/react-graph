import { useState } from 'react'
import ForceGraph, {
  type LinkObject,
  type NodeObject,
} from 'react-force-graph-2d'
import { Flex } from '../Flex'
import { defaultColors, generateGraphData } from './utils'

const graphData = generateGraphData()
// Мы хотим иметь возможность выделять не только узел, но также его соседей и ребра
graphData.links.forEach((link) => {
  if (typeof link.source === 'undefined' || typeof link.target === 'undefined')
    return
  const a = graphData.nodes[link.source as number]
  const b = graphData.nodes[link.target as number]

  if (!a || !b) return
  // Соседи узла
  !a.neighbors && (a.neighbors = [])
  !b.neighbors && (b.neighbors = [])
  a.neighbors.push(b)
  b.neighbors.push(a)

  // Ребра узла
  !a.links && (a.links = [])
  !b.links && (b.links = [])
  a.links.push(link)
  b.links.push(link)
})

function Hover() {
  // Узлы в состоянии hover
  const [hoverNodes, setHoverNodes] = useState<(NodeObject | null)[]>([])
  // Ребра в состоянии hover
  const [hoverLinks, setHoverLinks] = useState<(LinkObject | null)[]>([])
  // Выделение ребер узла
  const [links, setLinks] = useState(false)
  // Выделение соседей узла
  const [neighbors, setNeighbors] = useState(false)
  // Выделение источника и цели ребра
  const [nodes, setNodes] = useState(false)

  const { nodeColor, activeNodeColor } = defaultColors

  return (
    <Flex flexDirection='column' gap={12}>
      <h3>Узел в состоянии hover</h3>
      <Flex gap='$4' flexDirection='column'>
        <fieldset>
          <legend>Вершина</legend>
          <Flex flexDirection='column' gap={8}>
            <label>
              <input
                type='checkbox'
                checked={links}
                onChange={(e) => setLinks(e.target.checked)}
              />{' '}
              Ребра
            </label>
            <label>
              <input
                type='checkbox'
                checked={neighbors}
                onChange={(e) => setNeighbors(e.target.checked)}
              />{' '}
              Соседи
            </label>
          </Flex>
        </fieldset>
        <fieldset>
          <legend>Ребро</legend>
          <label>
            <input
              type='checkbox'
              checked={nodes}
              onChange={(e) => setNodes(e.target.checked)}
            />{' '}
            Источник и цель
          </label>
        </fieldset>
      </Flex>

      <Flex width={768} height={480} border='1px dashed rgba(0,0,0,0.25)'>
        <ForceGraph
          width={768}
          height={480}
          graphData={graphData}
          onNodeHover={(node) => {
            const newHoverNodes = [node]
            const newHoverLinks: LinkObject[] = []
            if (node) {
              // Выделение ребер узла
              if (links) {
                newHoverLinks.push(...(node.links as LinkObject[]))
              }
              // Выделение соседей узла
              if (neighbors) {
                newHoverNodes.push(...(node.neighbors as NodeObject[]))
              }
            }
            setHoverLinks(newHoverLinks)
            setHoverNodes(newHoverNodes)
          }}
          onLinkHover={(link) => {
            const newHoverLinks = [link]
            const newHoverNodes: NodeObject[] = []
            if (link) {
              // Выделение узлов ребра
              if (nodes) {
                newHoverNodes.push(
                  link.source as NodeObject,
                  link.target as NodeObject,
                )
              }
            }
            setHoverLinks(newHoverLinks)
            setHoverNodes(newHoverNodes)
          }}
          nodeColor={(node) =>
            hoverNodes.includes(node) ? activeNodeColor : nodeColor
          }
          linkColor={(link) =>
            hoverLinks.includes(link) ? activeNodeColor : nodeColor
          }
          linkDirectionalArrowColor={(link) =>
            hoverLinks.includes(link) ? activeNodeColor : nodeColor
          }
        />
      </Flex>
    </Flex>
  )
}

export default Hover
