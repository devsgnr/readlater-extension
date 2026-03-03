import type { CreateBookmarkInput } from "@/types";
import { Axios } from ".";
import type { CreateCollectionSchemaType } from "@/schema";

const CreateBookmark = (data: CreateBookmarkInput) => {
  return Axios.post("/extension.createBookmark", data);
};

const CreateCollection = (data: CreateCollectionSchemaType) => {
  return Axios.post("/extension.createCollection", data);
};

export { CreateBookmark, CreateCollection };
