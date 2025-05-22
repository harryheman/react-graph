import type { LinkObject, NodeObject } from 'react-force-graph-2d'

export function generateGraphData(
  n = 10,
  reverse = false,
): {
  nodes: (NodeObject & {
    neighbors?: NodeObject[]
    links?: LinkObject[]
  })[]
  links: LinkObject[]
} {
  return {
    // Узел должен содержать хотя бы `id`
    nodes: [...Array(n).keys()].map((i) => ({
      id: i,
      name: `node ${i + 1}`,
      neighbors: [],
      links: [],
    })),
    // Ребро должно содержать хотя бы `id`, `source` и `target`
    links: [...Array(n).keys()]
      .filter((id) => id)
      .map((id) => ({
        [reverse ? 'target' : 'source']: id,
        [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1)),
        name: `link ${id}`,
      })),
  }
}

export type DrawNodeImageProps = {
  // Узел
  node: NodeObject
  // Контекст рисования
  ctx: CanvasRenderingContext2D
  // Изображение
  image: CanvasImageSource | OffscreenCanvas
}

// Дефолтный размер узла
const defaultNodeSize = 4

export const drawNodeImage = ({ node, ctx, image }: DrawNodeImageProps) => {
  if (!image) return

  // Начальные координаты и размер узла
  const nodeX = node.x || 0
  const nodeY = node.y || 0
  const nodeSize = Number(node.size) || defaultNodeSize

  // Рисуем изображение
  ctx.drawImage(
    image,
    nodeX - nodeSize,
    nodeY - nodeSize,
    nodeSize * 2,
    nodeSize * 2,
  )
}

export type DrawNodeLabelProps = {
  // Узел
  node: NodeObject
  // Контекст рисования
  ctx: CanvasRenderingContext2D
  // Глобальный масштаб
  globalScale?: number
  // Размер шрифта
  fontSize?: number
  // Отступ от узла
  offset?: number
  // Узлы в состоянии hover
  hoverNodes?: (NodeObject | null)[]
  // Выбранные узлы
  clickNodes?: (NodeObject | null)[]
  // Режим отладки
  debug?: boolean
}

// Дефолтные цвета
export const defaultColors = {
  nodeColor: '#827e7e',
  activeNodeColor: '#1d75db',
  labelColor: '#1a1818',
  tooltipColor: '#f7ebeb',
}

export const drawNodeLabel = ({
  node,
  ctx,
  globalScale = 1,
  fontSize = 6,
  offset = 4,
  hoverNodes = [],
  clickNodes = [],
  debug,
}: DrawNodeLabelProps) => {
  const { activeNodeColor, labelColor } = defaultColors

  const nodeX = node.x || 0
  const nodeY = node.y || 0
  const nodeSize = Number(node.size) || defaultNodeSize

  // Рисуем текст
  const label = String(node.name) || ''
  const _fontSize = fontSize / globalScale
  ctx.font = `${_fontSize}px sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const _labelColor = node.labelColor || labelColor
  const labelActiveColor = node.labelActiveColor || activeNodeColor
  // Цвет подписи зависит от состояния узла
  ctx.fillStyle =
    hoverNodes.includes(node) || clickNodes.includes(node)
      ? labelActiveColor
      : _labelColor
  ctx.fillText(label, nodeX, nodeY + nodeSize + offset)

  // Вычисляем значения для области выделения/клика
  const textWidth = ctx.measureText(label).width
  const pointerArea = {
    x: nodeX - textWidth / 2,
    y: nodeY - nodeSize / 2 - offset / 2,
    width: textWidth,
    height: nodeSize + fontSize + offset,
  }

  // Если включен режим отладки
  if (debug) {
    // Рисуем область выделения/клика
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
    ctx.fillRect(
      pointerArea.x,
      pointerArea.y,
      pointerArea.width,
      pointerArea.height,
    )
  }

  // Для повторного использования в `drawNodePointerArea`
  node.pointerArea = pointerArea
}

export type NodePointerArea = {
  x: number
  y: number
  width: number
  height: number
}

export type DrawNodePointerAreaProps = {
  // Узел
  node: NodeObject
  // Цвет
  color: string
  // Контекст рисования
  ctx: CanvasRenderingContext2D
}

export const drawNodePointerArea = ({
  node,
  color,
  ctx,
}: DrawNodePointerAreaProps) => {
  ctx.fillStyle = color
  const pointerArea: NodePointerArea = node.pointerArea
  pointerArea &&
    ctx.fillRect(
      pointerArea.x,
      pointerArea.y,
      pointerArea.width,
      pointerArea.height,
    )
}

export type DrawNodeTooltipProps = {
  // Узел
  node: NodeObject
  // Контекст рисования
  ctx: CanvasRenderingContext2D
  // Подсказка
  tooltip: string
  // Глобальный масштаб
  globalScale?: number
  // Размер шрифта
  fontSize?: number
  // Отступ от узла
  offset?: number
  // Горизонтальный отступ
  horizontalPadding?: number
  // Вертикальный отступ
  verticalPadding?: number
}

export const drawNodeTooltip = ({
  node,
  ctx,
  tooltip,
  globalScale = 1,
  fontSize = 5,
  offset = 7,
  horizontalPadding = 8,
  verticalPadding = 6,
}: DrawNodeTooltipProps) => {
  const { tooltipColor, labelColor } = defaultColors

  const nodeX = node.x || 0
  const nodeY = node.y || 0
  const nodeSize = Number(node.size) || defaultNodeSize

  // Настраиваем текст
  const _fontSize = fontSize / globalScale
  ctx.font = `${_fontSize}px sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Рисуем прямоугольник
  const textWidth = ctx.measureText(tooltip).width
  const tooltipContainerColor = node.labelColor || labelColor
  ctx.fillStyle = tooltipContainerColor
  ctx.fillRect(
    nodeX - textWidth / 2 - horizontalPadding / 2,
    nodeY - nodeSize - offset - verticalPadding / 2 - fontSize / 2,
    textWidth + horizontalPadding,
    fontSize + verticalPadding,
  )

  // Рисуем текст
  const _tooltipColor = node.tooltipColor || tooltipColor
  ctx.fillStyle = _tooltipColor
  ctx.fillText(tooltip, nodeX, nodeY - nodeSize - offset)
}

export type DrawNodeRingProps = {
  // Узел
  node: NodeObject
  // Контекст рисования
  ctx: CanvasRenderingContext2D
  // Отступ от узла
  offset?: number
  // Ширина линии
  lineWidth?: number
}

export const drawNodeRing = ({
  node,
  ctx,
  offset = 5,
  lineWidth = 1,
}: DrawNodeRingProps) => {
  const { activeNodeColor } = defaultColors
  const nodeX = node.x || 0
  const nodeY = node.y || 0
  const nodeSize = Number(node.size) || defaultNodeSize
  ctx.beginPath()
  ctx.arc(nodeX, nodeY, nodeSize + offset, 0, 2 * Math.PI)
  ctx.lineWidth = lineWidth
  const ringColor = node.activeColor || activeNodeColor
  ctx.strokeStyle = ringColor
  ctx.stroke()
}
