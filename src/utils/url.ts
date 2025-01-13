import { SearchParams } from '../types/api';

// Convert filter state to URL parameters
export function filtersToUrl(filters: SearchParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== null) {
      searchParams.append(key, value.toString());
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
    switch (key) {
      case 'review_score':
      case 'review_count':
        filters[key] = parseNumeric(value);
        break;
      case 'sort':
        if (['strommedato', 'votes', 'anmelderdato'].includes(value)) {
          filters[key] = value as SearchParams['sort'];
        }
        break;
      default:
        if (value) filters[key as keyof SearchParams] = value;
    }
  }

  return filters;
}

// Copy current URL to clipboard
export async function copyUrlToClipboard(): Promise<void> {
  try {
    await navigator.clipboard.writeText(window.location.href);
  } catch (err) {
    console.error('Failed to copy URL:', err);
    throw new Error('Failed to copy URL to clipboard');
  }
}