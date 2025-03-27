'use client'

import {
  applyNodeChanges,
  Background,
  BackgroundVariant,
  type Edge,
  MarkerType,
  type Node,
  type NodeTypes,
  type OnNodesChange,
  Panel,
  ReactFlow,
  type ReactFlowInstance
} from '@xyflow/react'
import { useCallback, useRef, useState } from 'react'
import { ProgressNode } from './ProgressNode'
import { Buttons } from './Buttons'
import { getLayoutedElements } from '../utils/getLayoutedElements'
import { useSettingsStore } from '../stores/useSettingsStore'
import { progressNodes } from '../constants/progressNodes'
import { progressEdges } from '../constants/progressEdges'
import { progressNodeSize } from '../constants/nodeSizes'

const nodeTypes: NodeTypes = {
  progressNode: ProgressNode
}

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  progressNodes,
  progressEdges,
  progressNodeSize
)

export function TreeMap() {
  const { theme, isDraggable, enableZooming, panOnDrag } = useSettingsStore()
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null)
  const [nodes, setNodes] = useState<Node[]>(layoutedNodes)
  const [edges] = useState<Edge[]>(layoutedEdges)

  const onNodesChange: OnNodesChange = useCallback(changes => {
    setNodes(nds => applyNodeChanges(changes, nds))
  }, [])

  const getStrokeColor = () => {
    if (typeof window === 'undefined') {
      return theme === 'dark' ? '#979797' : ''
    }

    return theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? '#979797'
      : ''
  }

  return (
    <div className="absolute inset-0 w-full h-full p-4">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        defaultEdgeOptions={{
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { strokeWidth: 2, stroke: getStrokeColor() },
          type: 'smoothstep'
        }}
        minZoom={0.2}
        className="bg-transparent rounded-lg"
        nodesDraggable={isDraggable}
        zoomOnScroll={enableZooming}
        zoomOnDoubleClick={enableZooming}
        zoomOnPinch={enableZooming}
        panOnDrag={panOnDrag}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        onInit={instance => (reactFlowInstance.current = instance)}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Panel position="bottom-left" className="m-4">
          <Buttons />
        </Panel>
      </ReactFlow>
    </div>
  )
}
