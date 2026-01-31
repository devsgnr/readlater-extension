import type { CreateBookmarkInput } from "@/types";
import { Axios } from ".";

const CreateBookmark = (data: CreateBookmarkInput) => {
  return Axios.post("/createBookmark", data);
};

export { CreateBookmark };
