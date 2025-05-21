import { useEffect, useState } from 'react'
import ForceGraph from 'react-force-graph-2d'
import { Flex } from '../Flex'
import { drawNodeLabel, drawNodePointerArea, generateGraphData } from './utils'

const { nodes, links } = generateGraphData(25)

const Search = () => {
  // Отфильтрованные узлы
  const [filteredNodes, setFilteredNodes] = useState(nodes)
  // Отфильтрованные ребра
  const [filteredLinks, setFilteredLinks] = useState(links)
  // Строка поиска
  const [searchQuery, setSearchQuery] = useState('')
  // Значение инпута
  const [value, setValue] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const query = value.trim().toLowerCase()
    setSearchQuery(query)
  }

  useEffect(() => {
    if (value === '') {
      setSearchQuery('')
    }
  }, [value])

  useEffect(() => {
    if (!searchQuery) {
      setFilteredLinks(links)
      setFilteredNodes(nodes)
      return
    }

    // Фильтруем узлы
    const _nodes = nodes.filter((n) => {
      const label = n.name as string
      return label.toLowerCase().includes(searchQuery)
    })
    const nodeIds = _nodes.map((n) => String(n.id))
    // Фильтруем ребра
    const _links = links.filter((l) => {
      const sourceId = typeof l.source === 'object' ? l.source.id : l.source
      const targetId = typeof l.target === 'object' ? l.target.id : l.target

      return (
        nodeIds.includes(String(sourceId)) && nodeIds.includes(String(targetId))
      )
    })
    setFilteredLinks(_links)
    setFilteredNodes(_nodes)
  }, [searchQuery])

  return (
    <Flex flexDirection='column' gap={12}>
      <h3>Поиск</h3>

      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          alignSelf: 'center',
        }}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Поиск...'
        />{' '}
        <button>Поиск</button>
      </form>
      <Flex width={768} height={768} border='1px dashed rgba(0,0,0,0.25)'>
        <ForceGraph
          width={768}
          height={768}
          graphData={{
            nodes: filteredNodes,
            links: filteredLinks,
          }}
          nodeCanvasObject={(node, ctx) =>
            drawNodeLabel({
              node,
              ctx,
            })
          }
          nodeCanvasObjectMode={() => 'after'}
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

export default Search
