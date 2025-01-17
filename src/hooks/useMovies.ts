import { useInfiniteQuery } from "@tanstack/react-query";
import { TVGuide } from "../types/api";
import { fetchMovies } from "../utils/api";
import { SearchParams } from "@/features/search/types";
import { toAPISearchParams } from "@/utils/search-params";

export function useMovies(params: SearchParams) {
  return useInfiniteQuery({
    queryKey: ["movies", params],
    queryFn: ({ pageParam = 1 }) => fetchMovies(toAPISearchParams({ ...params, page: pageParam })),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta) return undefined;
      return lastPage.meta.current_page < lastPage.meta.last_page
        ? lastPage.meta.current_page + 1
        : undefined;
    },
  });
}
