import type { CreateBookmarkInput } from "@/types";
import { createContext, type SetStateAction } from "react";

type PayloadContextType = {
  payload: CreateBookmarkInput | undefined;
  setPayload: React.Dispatch<SetStateAction<CreateBookmarkInput | undefined>>;
};

const PayloadContext = createContext<PayloadContextType>(
  {} as PayloadContextType,
);

export type { PayloadContextType };
export default PayloadContext;
