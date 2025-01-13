export interface SearchParams {
  type?: 'filmer' | 'serier';
  providers?: string[];
  genres?: string[];
  person?: string;
  sort?: 'aktuelt' | 'populaert' | 'populaert_nytt' | 'kommende' | 'utgivelsesdato' | 'rating' | 'strommedato' | 'votes' | 'anmelderdato';
  rating?: number;
  per_page?: number;
  pagination?: 'simple' | 'full';
  original_language?: string;
  released_after?: string;
  released_before?: string;
  released_days_ago?: string;
  reviewed_after?: string;
  reviewed_before?: string;
  reviewed_days_ago?: string;
  vod_date_after?: string;
  vod_date_before?: string;
  vod_date_days_ago?: string;
  review_language?: string;
  review_score?: number;
  review_count?: number;
  relevant?: boolean;
}