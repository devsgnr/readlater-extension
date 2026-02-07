import type { GetCollectionResponse } from "@/types";
import { Axios } from ".";

const GetCollections = async () => {
  return Axios.get<GetCollectionResponse>("/getCollections");
};

export { GetCollections };
