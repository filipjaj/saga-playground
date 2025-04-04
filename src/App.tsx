import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { INITIAL_SEARCH_PARAMS } from "@/features/search/constants";
import { SearchParams } from "@/features/search/types";
import { useMovies } from "./hooks/useMovies";
import { useUrlFilters } from "./hooks/useUrlFilters";
import SearchForm from "./components/SearchForm";
import MovieList from "./components/MovieList";
import FilterActions from "./components/FilterActions";
import { APIEnvironmentProvider } from "@/context/api-environment";
import { APIEnvironmentToggle } from "@/components/api-environment-toggle";

function MovieSearch() {
  const { filters, updateFilters, clearFilters } = useUrlFilters(INITIAL_SEARCH_PARAMS);
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMovies(filters);



  const hasActiveFilters = Object.keys(filters).some(
    (key) => {
      const filterKey = key as keyof SearchParams;
      return filters[filterKey] !== INITIAL_SEARCH_PARAMS[filterKey];
    }
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">Movie Search</h1>
          <div className="flex items-center gap-4">
            <FilterActions
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
            <APIEnvironmentToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container py-8 space-y-8">
        <SearchForm filters={filters} onSubmit={updateFilters} />
        <MovieList
          data={data}
          isLoading={isLoading}
          error={error}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <APIEnvironmentProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ErrorBoundary>
          <MovieSearch />
          <Toaster />
        </ErrorBoundary>
      </ThemeProvider>
    </APIEnvironmentProvider>
  );
}
