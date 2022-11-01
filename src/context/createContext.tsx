import React from "react"

// A helper to create a Context and Provider with no upfront default value, and
// without having to check for undefined all the time.
export function createCtx<ContextType>() {
    const ctx = React.createContext<ContextType | undefined>(undefined);
    const useCtx = () => {
      let c = React.useContext(ctx)
      if (!c) {
        throw new Error(
          "useDataContext must be inside a Provider with a value"
        )
      }
      return c
    }
    return [useCtx, ctx.Provider] as const;
  }