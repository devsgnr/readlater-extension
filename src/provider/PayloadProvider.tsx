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
    setPayload(payload as CreateBookmarkInput);
  }, []);

  const handleCollectionToggle = (id: string) => {
    setPayload((pyld) => {
      if (!pyld?.bookmark) return pyld;

      const collections = pyld.collections || [];
      const inCollection = collections.includes(id);

      return {
        bookmark: pyld.bookmark,
        collections: inCollection ? collections.filter((v) => v !== id) : [...collections, id],
      };
    });
  };

  return (
    <PayloadContext.Provider value={{ payload, setPayload, handleCollectionToggle }}>
      {children}
    </PayloadContext.Provider>
  );
};

export default PayloadProvider;
