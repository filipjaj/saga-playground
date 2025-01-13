export interface SearchParams {
  type?: 'filmer' | 'serier';
  providers?: string[];
  genres?: string[];
  sort?: 'aktuelt' | 'populaert' | 'populaert_nytt' | 'kommende' | 'utgivelsesdato' | 'rating' | 'strommedato' | 'votes' | 'anmelderdato';
  rating?: number;
  original_language?: string;
  released_after?: string;
  released_before?: string;
  released_after_days?: string;
  released_before_days?: string;
  reviewed_after?: string;
  reviewed_before?: string;
  reviewed_after_days?: string;
  reviewed_before_days?: string;
  vod_date_after?: string;
  vod_date_before?: string;
  vod_date_after_days?: string;
  vod_date_before_days?: string;
  review_language?: string;
  review_score?: number;
  review_count?: number;
  relevant?: boolean;
}