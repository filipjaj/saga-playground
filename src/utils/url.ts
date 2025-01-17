import { SearchParams } from "@/features/search/types";
import { INITIAL_SEARCH_PARAMS } from "@/features/search/constants";

// Helper to check if a value is a comma-separated list
const isArrayValue = (key: keyof SearchParams) => {
  return ['providers', 'genres', 'original_language'].includes(key);
};

// Helper to check if a value is a days_ago field
const isDaysAgoField = (key: string): boolean => {
  return key.endsWith('_days_ago');
};
const isOldDaysAgoField = (key: string): boolean => {
  return key.endsWith('_days');
};

// Convert filter state to URL parameters
export function filtersToUrl(filters: SearchParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'boolean') {
        searchParams.append(key, value ? '1' : '0');
      } else if (isArrayValue(key as keyof SearchParams) && typeof value === 'string') {
        searchParams.append(key, value);
      } else if (isDaysAgoField(key) && typeof value === 'number') {
        searchParams.append(key, value.toString());
      } else if (isOldDaysAgoField(key) && typeof value === 'number') {
        searchParams.append(key.replace('_days', '_days_ago'), value.toString());
        searchParams.delete(key);
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });

  return searchParams.toString();
}

// Parse URL parameters to filter state
export function urlToFilters(searchParams: URLSearchParams): SearchParams {
  const filters: Partial<SearchParams> = {};

  // Helper to parse numeric values
  const parseNumeric = (value: string | null): number | undefined => {
    if (!value) return undefined;
    const num = parseFloat(value);
    return isNaN(num) ? undefined : num;
  };

  // Parse each parameter
  for (const [key, value] of searchParams.entries()) {
    
    if (!value) continue;

    if (isDaysAgoField(key)) {
      filters[key as keyof SearchParams] = parseNumeric(value);
      continue;
    }

    switch (key) {
      case "review_score":
      case "review_count":
        
      case "rating":
        filters[key] = parseNumeric(value);
        break;
      case "relevant":
        filters[key] = value === '1';
        break;
      case "sort":
        if (value === "aktuelt" || value === "populaert" || value === "populaert_nytt" || 
            value === "kommende" || value === "utgivelsesdato" || value === "rating" || 
            value === "strommedato" || value === "votes" || value === "anmelderdato") {
          filters[key] = value;
        }
        break;
      case "type":
        if (value === "filmer" || value === "serier" || value === "all") {
          filters[key] = value;
        }
        break;
      case "released_after":
      case "released_before":
      case "reviewed_after":
      case "reviewed_before":
      case "vod_date_after":
      case "vod_date_before":
        filters[key] = value;
        break;
      case "released_before_days":
      case "released_after_days":
      case "reviewed_before_days":
      case "reviewed_after_days":
      case "vod_date_before_days":
      case "vod_date_after_days":
        const newKey = key.replace('_days', '_days_ago');
        console.log(newKey);
        filters[newKey] = parseNumeric(value);
        filters[key] = undefined;
        break;
      default:
        if (key in INITIAL_SEARCH_PARAMS) {
          if (isArrayValue(key as keyof SearchParams)) {
            filters[key as keyof SearchParams] = value;
          } else {
            filters[key as keyof SearchParams] = value as any;
          }
        }
    }
  }

  return filters as SearchParams;
}

// Copy current URL to clipboard
export async function copyUrlToClipboard(): Promise<void> {
  try {
    await navigator.clipboard.writeText(window.location.href);
  } catch (error) {
    console.error('Failed to copy URL:', error);
  }
}
