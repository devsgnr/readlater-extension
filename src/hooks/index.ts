import type { PayloadContextType } from "@/context/PayloadContext";
import PayloadContext from "@/context/PayloadContext";
import { useContext } from "react";

const usePayloadContext = (): PayloadContextType => {
  const context = useContext(PayloadContext);
  if (!context) {
    throw new Error(
      "PayloadContext must be used from within the PayloadContext provider",
    );
  }
  return { ...context };
};

export { usePayloadContext };
