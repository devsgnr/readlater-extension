import { useMutation } from "@tanstack/react-query";
import type { CreateBookmarkInput } from "@/types";
import type { CreateCollectionSchemaType } from "@/schema";

const useChromeRuntimeCreateBookmark = () => {
  return useMutation({
    mutationKey: ["createBookmark"],
    mutationFn: (payload: CreateBookmarkInput) => {
      return new Promise<{ status: boolean }>((resolve, reject) => {
        chrome.runtime.sendMessage(
          { action: "CREATE_READLATER_BOOKMARK", payload },
          (response: { status: boolean }) => {
            if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
            else resolve(response);
          },
        );
      });
    },
  });
};

const useChromeRuntimeCreateCollection = () => {
  return useMutation({
    mutationKey: ["createCollection"],
    mutationFn: (payload: CreateCollectionSchemaType) => {
      return new Promise<{ status: boolean }>((resolve, reject) => {
        chrome.runtime.sendMessage(
          { action: "CREATE_READLATER_COLLECTION", payload },
          (response: { status: boolean }) => {
            if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
            else resolve(response);
          },
        );
      });
    },
  });
};

export { useChromeRuntimeCreateBookmark, useChromeRuntimeCreateCollection };
