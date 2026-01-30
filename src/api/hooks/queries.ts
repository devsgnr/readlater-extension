import { GetCollections } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";

const useGetCollections = () => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: GetCollections,
  });
};

export { useGetCollections };
