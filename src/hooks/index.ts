import type { PayloadContextType } from "@/context/PayloadContext";
import PayloadContext from "@/context/PayloadContext";
import type { ShadowRootContextType } from "@/context/ShadowRootContext";
import ShadowRootContext from "@/context/ShadowRootContext";
import { useContext } from "react";

const usePayloadContext = (): PayloadContextType => {
  const context = useContext(PayloadContext);
  if (!context) {
    throw new Error("PayloadContext must be used from within the PayloadContext provider");
  }
  return { ...context };
};

const useShadowRootContext = (): ShadowRootContextType => {
  const context = useContext(ShadowRootContext);
  if (!context) {
    throw new Error("ShadowRootContext must be used from within the ShadowRootContext provider");
  }
  return { ...context };
};

export { usePayloadContext, useShadowRootContext };
