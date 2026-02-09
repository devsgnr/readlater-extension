import type { CreateBookmarkInput } from "@/types";
import { Axios } from ".";
import type { CreateCollectionSchemaType } from "@/schema";

const CreateBookmark = (data: CreateBookmarkInput) => {
  return Axios.post("/createBookmark", data);
};

const CreateCollection = (data: CreateCollectionSchemaType) => {
  return Axios.post("/createCollection", data);
};

export { CreateBookmark, CreateCollection };
