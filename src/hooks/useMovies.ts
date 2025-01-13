import { useInfiniteQuery } from '@tanstack/react-query';
import { SearchParams, TVGuide } from '../types/api';
import { fetchMovies } from '../utils/api';

export function useMovies(params: SearchParams) {
  return useInfiniteQuery<TVGuide>({
    queryKey: ['movies', params],
    queryFn: ({ pageParam = 1 }) => fetchMovies({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta) return undefined;
      return lastPage.meta.current_page < lastPage.meta.last_page
        ? lastPage.meta.current_page + 1
        : undefined;
    },
  });
}