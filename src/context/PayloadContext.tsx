import type { CreateBookmarkInput } from "@/types";
import { createContext, type SetStateAction } from "react";

type PayloadContextType = {
  payload: CreateBookmarkInput;
  setPayload: React.Dispatch<SetStateAction<CreateBookmarkInput>>;
  handleCollectionToggle: (id: string) => void;
};

const PayloadContext = createContext<PayloadContextType>({} as PayloadContextType);

export type { PayloadContextType };
export default PayloadContext;
