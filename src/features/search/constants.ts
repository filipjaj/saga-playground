import { SearchParams, FilterOption } from './types';

export const INITIAL_SEARCH_PARAMS: SearchParams = {
  sort: 'strommedato',
  review_score: 0,
  review_count: 0,

  relevant: true,
  type: 'all',
  genres: '',
  providers: '',
  rating: 0,
  original_language: '',

  vod_date_after_days_ago: 0,
  vod_date_before_days_ago: 0,
  released_after_days_ago: 0,
  released_before_days_ago: 0,
  reviewed_after_days_ago: 0,
  reviewed_before_days_ago: 0


};

export const SORT_OPTIONS: FilterOption[] = [
  { value: 'aktuelt', label: 'Aktuelt' },
  { value: 'populaert', label: 'Populært' },
  { value: 'populaert_nytt', label: 'Populært (nytt)' },
  { value: 'kommende', label: 'Kommende' },
  { value: 'utgivelsesdato', label: 'Utgivelsesdato' },
  { value: 'rating', label: 'Rating' },
  { value: 'strommedato', label: 'Strømmedato' },
  { value: 'votes', label: 'Stemmer' },
  { value: 'anmelderdato', label: 'Anmelderdato' }
];

export const TYPE_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Alle' },
  { value: 'filmer', label: 'Filmer' },
  { value: 'serier', label: 'Serier' }
];

export const PAGINATION_OPTIONS: FilterOption[] = [
  { value: 'simple', label: 'Simple' },
  { value: 'full', label: 'Full' }
];

export const MIN_RATING = 0;
export const MAX_RATING = 10;
export const MIN_PER_PAGE = 1;
export const MAX_PER_PAGE = 150;
export const MIN_DAYS_AGO = 0;
export const MAX_DAYS_AGO = 365 * 10; // 10 years

// Common language codes
export const COMMON_LANGUAGES: FilterOption[] = [
  { value: 'no', label: 'Norsk' },
  { value: 'en', label: 'English' },
  { value: 'sv', label: 'Svenska' },
  { value: 'da', label: 'Dansk' },
  { value: 'de', label: 'Deutsch' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'it', label: 'Italiano' }
];

// Common genres (this should be fetched from the API in a real implementation)
export const COMMON_GENRES: FilterOption[] = [
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'documentary', label: 'Documentary' },
  { value: 'horror', label: 'Horror' },
  { value: 'thriller', label: 'Thriller' }
];

// Common providers (this should be fetched from the API in a real implementation)
export const COMMON_PROVIDERS: FilterOption[] = [
  { value: 'netflix', label: 'Netflix' },
  { value: 'hbo', label: 'HBO Max' },
  { value: 'disney', label: 'Disney+' },
  { value: 'viaplay', label: 'Viaplay' },
  { value: 'prime', label: 'Prime Video' }
];
