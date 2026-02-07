"use client";

import PayloadContext from "@/context/PayloadContext";
import type { CreateBookmarkInput } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const PayloadProvider = ({ children }: Props) => {
  const [payload, setPayload] = useState<CreateBookmarkInput>();

  useEffect(() => {
    const payload = (window as any).__READLATER_PAYLOAD__;
    setPayload({ bookmark: payload });
  }, []);

  return (
    <PayloadContext.Provider value={{ payload, setPayload }}>
      {children}
    </PayloadContext.Provider>
  );
};

export default PayloadProvider;
