// Update SearchParams interface to include days ago fields
export interface SearchParams {
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
  sort?: 'strommedato' | 'votes' | 'anmelderdato';
}