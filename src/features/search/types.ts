export interface SearchParams {
  type?: "filmer" | "serier";
  providers?: string;
  genres?: string;
  person?: string;
  sort?:
    | "aktuelt"
    | "populaert"
    | "populaert_nytt"
    | "kommende"
    | "utgivelsesdato"
    | "rating"
    | "strommedato"
    | "votes"
    | "anmelderdato";
  rating?: number;
  per_page?: number;
  pagination?: "simple" | "full";
  original_language?: string;

  review_score?: number;
  review_count?: number;
  relevant?: boolean;

  // Date filters
  released_after?: string;
  released_after_days_ago?: number;
  released_before?: string;
  released_before_days_ago?: number;
  reviewed_after?: string;
  reviewed_after_days_ago?: number;
  reviewed_before?: string;
  reviewed_before_days_ago?: number;
  vod_date_after?: string;
  vod_date_after_days_ago?: number;
  vod_date_before?: string;
  vod_date_before_days_ago?: number;
}

export interface Movie {
  id: string;
  title: string;
  review_score: number;
  review_count: number;
  // Add other movie properties as needed
}

export type SortOption = SearchParams["sort"];

export interface DateInputMode {
  released: boolean;
  reviewed: boolean;
  vod: boolean;
}

export interface FilterOption {
  value: string;
  label: string;
}
