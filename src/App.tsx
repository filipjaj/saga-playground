import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/toaster";
import { SearchParams } from "./types/api";
import { useMovies } from "./hooks/useMovies";
import { useUrlFilters } from "./hooks/useUrlFilters";
import SearchForm from "./components/SearchForm";
import MovieList from "./components/MovieList";
import FilterActions from "./components/FilterActions";

const initialParams: SearchParams = {
  sort: "strommedato",
  review_score: 0,
  review_count: 0,
  relevant: 1,
};

export default function App() {
  const { filters, updateFilters, clearFilters } = useUrlFilters(initialParams);
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMovies(filters);

  const hasActiveFilters = Object.keys(filters).some(
    (key) =>
      filters[key as keyof SearchParams] !==
      initialParams[key as keyof SearchParams]
  );

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold">Movie Search</h1>
            <div className="flex items-center gap-4">
              <FilterActions
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="container py-8 space-y-8">
          <SearchForm
            params={filters}
            onParamsChange={updateFilters}
            onReset={clearFilters}
          />
          <MovieList
            data={data}
            isLoading={isLoading}
            error={error as Error}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
