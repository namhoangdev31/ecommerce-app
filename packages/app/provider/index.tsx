import { SafeArea } from './safe-area'

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SafeArea>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </SafeArea>
  )
}
