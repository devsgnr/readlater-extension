import { GetCollections } from "@/api/queries";
import type { GetCollection } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useGetCollections = () => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: GetCollections,
  });
};

const useChromeRuntimeGetCollections = () => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: () => {
      return new Promise<GetCollection>((resolve, reject) => {
        chrome.runtime.sendMessage(
          { action: "GET_READLATER_COLLECTIONS" },
          (response: GetCollection) => {
            if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
            else resolve(response);
          },
        );
      });
    },
  });
};

export { useGetCollections, useChromeRuntimeGetCollections };
