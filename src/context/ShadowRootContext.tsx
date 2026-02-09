import { createContext } from "react";

type ShadowRootContextType = {
  shadowRoot: ShadowRoot | null;
};

const ShadowRootContext = createContext<ShadowRootContextType>(
  {} as ShadowRootContextType,
);

export type { ShadowRootContextType };
export default ShadowRootContext;
