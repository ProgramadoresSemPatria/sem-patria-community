'use client'

import { DefaultLayout } from '@/components/default-layout'
import { useEffect } from "react";
import "@xyflow/react/dist/style.css";
import { TreeMap } from './components/TreeMap'


const CodeBreakersPage = () => {

  return (
    <DefaultLayout className="max-w-none mx-0 px-0 pt-0">
      <TreeMap/>
    </DefaultLayout>
  )
}

export default CodeBreakersPage
