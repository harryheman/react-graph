import { Flex } from './components/Flex'
import Basic from './components/Graph/Basic'
import Children from './components/Graph/Children'
import Click from './components/Graph/Click'
import Hover from './components/Graph/Hover'
import Link from './components/Graph/Link'
import Node from './components/Graph/Node'
import NodeIcon from './components/Graph/NodeIcon'
import NodeWithLabel from './components/Graph/NodeWithLabel'
import NodeWithLabelAndTooltip from './components/Graph/NodeWithLabelAndTooltip'
import Search from './components/Graph/Search'
import Toolkit from './components/Graph/Toolkit'

function App() {
  return (
    <Flex padding={8} flexDirection='column' gap={24}>
      <Basic />
      <hr />
      <Node />
      <hr />
      <Link />
      <hr />
      <NodeIcon />
      <hr />
      <NodeWithLabel />
      <hr />
      <Hover />
      <hr />
      <NodeWithLabelAndTooltip />
      <hr />
      <Click />
      <hr />
      <Children />
      <hr />
      <Toolkit />
      <hr />
      <Search />
    </Flex>
  )
}

export default App
