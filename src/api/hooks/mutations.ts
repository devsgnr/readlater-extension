import { useMutation } from "@tanstack/react-query";
import { CreateBookmark } from "../mutations";
import type { CreateBookmarkInput } from "@/types";

const useCreateBookmark = () => {
  return useMutation({
    mutationFn: (data: CreateBookmarkInput) => CreateBookmark(data),
    mutationKey: ["createBookmark"],
  });
};

export { useCreateBookmark };
