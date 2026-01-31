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
    chrome.storage.local.get("READLATER_PAYLOAD", (res) => {
      setPayload({ bookmark: res["READLATER_PAYLOAD"] as any });
    });
  }, []);

  return (
    <PayloadContext.Provider value={{ payload, setPayload }}>
      {children}
    </PayloadContext.Provider>
  );
};

export default PayloadProvider;
