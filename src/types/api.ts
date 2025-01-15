export interface SearchParams {
  sort: string;
  review_score: number;
  review_count: number;
  relevant: number;
  type?: "filmer" | "serier";
  genres?: string;
  original_language?: string;
  released_after?: string;
  released_before?: string;
  released_days_agos?: string;

  reviewed_after?: string;
  reviewed_before?: string;
  reviewed__days_ago?: string;

  vod_date_after?: string;
  vod_date_before?: string;
  vod_date_days_ago?: string;
}
