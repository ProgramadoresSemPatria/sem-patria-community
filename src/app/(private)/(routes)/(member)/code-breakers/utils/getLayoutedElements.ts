import dagre from '@dagrejs/dagre'
import type { Edge, Node } from '@xyflow/react'

export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  size: { width: number; height: number }
) => {
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))
  dagreGraph.setGraph({ rankdir: 'TB' })

  nodes.forEach((node: Node) => {
    dagreGraph.setNode(node.id, { width: size.width, height: size.height })
  })

  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const newNodes = nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id)
    const newNode = {
      ...node,
      targetPosition: 'top',
      sourcePosition: 'bottom',
      position: {
        x: nodeWithPosition.x - size.width / 2,
        y: nodeWithPosition.y - size.height / 2
      }
    }

    return newNode as Node
  })

  return { nodes: newNodes, edges }
}
