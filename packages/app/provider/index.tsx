import { SafeArea } from './safe-area'

import * as React from "react";
export function Provider({ children }: { children: React.ReactNode }) {
  return (
      <SafeArea>
          {children}
      </SafeArea>
  )
}
