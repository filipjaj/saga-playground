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
  released_after_days_ago?: number;
  released_before_days_ago?: number;
  reviewed_after?: string;
  reviewed_before?: string;
  reviewed_after_days_ago?: number;
  reviewed_before_days_ago?: number;
  vod_date_after?: string;
  vod_date_before?: string;
  vod_date_after_days_ago?: number;
  vod_date_before_days_ago?: number;
  page?: number;
}

export interface TVGuide {
  meta?: {
    current_page: number;
    last_page: number;
  };
  data: Array<{
    id: string;
    title: string;
    // Add other movie/show properties as needed
  }>;
}
