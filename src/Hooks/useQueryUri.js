import { useQuery } from "react-query";

export default function useQueryUri(queryKey, uri, staleTime = 0) {
  const { data, isLoading, refetch } = useQuery(
    queryKey,
    async () => {
      const response = await fetch(uri);
      return response.json();
    },
    {
      staleTime: staleTime,
      cacheTime: staleTime,
    }
  );

  return { data, isLoading, refetch };
}
