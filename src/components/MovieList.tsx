import React from 'react';
import { Film } from 'lucide-react';
import { TVGuide } from '../types/api';
import MovieCard from './MovieCard';
import { Button } from './ui/button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface MovieListProps {
  data?: {
    pages: TVGuide[];
    pageParams: number[];
  };
  isLoading: boolean;
  error?: Error;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export default function MovieList({
  data,
  isLoading,
  error,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: MovieListProps) {
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isLoading && !isFetchingNextPage) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-destructive">
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data?.pages[0]?.data || data.pages[0].data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
        <Film className="w-12 h-12 mb-2" />
        <p>No movies found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.pages.map((page) =>
          page.data?.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>

      <div ref={loadMoreRef} className="flex justify-center">
        {isFetchingNextPage ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        ) : hasNextPage ? (
          <Button onClick={() => fetchNextPage()} variant="outline">
            Load More
          </Button>
        ) : null}
      </div>
    </div>
  );
}