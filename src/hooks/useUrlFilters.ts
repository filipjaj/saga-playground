import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchParams } from "@/features/search/types";
import { filtersToUrl, urlToFilters } from "../utils/url";

export function useUrlFilters(initialFilters: SearchParams) {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams);
  
  // Initialize filters from URL or default values
  const initializeFilters = useCallback(() => {
    const urlFilters = urlToFilters(searchParams);
    return Object.keys(urlFilters).length > 0 ? urlFilters : initialFilters;
  }, [searchParams, initialFilters]);

  // Update URL when filters change
  const updateFilters = useCallback(
    (newFilters: SearchParams) => {
      const urlString = filtersToUrl(newFilters);
      setSearchParams(urlString, { replace: true });
    },
    [setSearchParams]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchParams("");
  }, [setSearchParams]);

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlFilters = urlToFilters(searchParams);
      if (Object.keys(urlFilters).length === 0) {
        updateFilters(initialFilters);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [searchParams, initialFilters, updateFilters]);

  return {
    filters: initializeFilters(),
    updateFilters,
    clearFilters,
  };
}
