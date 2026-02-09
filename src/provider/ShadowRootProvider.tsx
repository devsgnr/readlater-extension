"use client";

import ShadowRootContext from "@/context/ShadowRootContext";

type Props = {
  children: React.ReactNode;
  shadowRoot: ShadowRoot;
};

const ShadowRootProvider = ({ children, shadowRoot }: Props) => {
  return (
    <ShadowRootContext.Provider value={{ shadowRoot }}>
      {children}
    </ShadowRootContext.Provider>
  );
};

export default ShadowRootProvider;
