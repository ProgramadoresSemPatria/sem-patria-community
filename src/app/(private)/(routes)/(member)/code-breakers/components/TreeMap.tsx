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
    <div className="absolute w-[85dvw] h-[85dvh]">
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
        className="bg-transparent"
        nodesDraggable={isDraggable}
        zoomOnScroll={enableZooming}
        zoomOnDoubleClick={enableZooming}
        zoomOnPinch={enableZooming}
        panOnDrag={panOnDrag}
        fitView
        onInit={instance => (reactFlowInstance.current = instance)}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Panel position="bottom-left">
          <Buttons />
        </Panel>
      </ReactFlow>
    </div>
  )
}
