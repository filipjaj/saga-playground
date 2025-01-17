import { SearchParams as FrontendSearchParams } from "@/features/search/types";
import { SearchParams as APISearchParams } from "@/types/api";

export function toAPISearchParams(params: FrontendSearchParams): APISearchParams {
  return {
    ...params,
    sort: params.sort || "aktuelt",
    review_score: params.review_score || 0,
    review_count: params.review_count || 0,
    relevant: params.relevant ? 1 : 0,
    type: params.type === 'all' ? undefined : params.type,
    genres: params.genres,
    original_language: params.original_language,
    vod_date_after_days_ago: params.vod_date_after_days_ago && params.vod_date_after_days_ago > 0 ? params.vod_date_after_days_ago : undefined,
    vod_date_before_days_ago: params.vod_date_before_days_ago && params.vod_date_before_days_ago > 0 ? params.vod_date_before_days_ago : undefined,
    released_after_days_ago: params.released_after_days_ago && params.released_after_days_ago > 0 ? params.released_after_days_ago : undefined,
    released_before_days_ago: params.released_before_days_ago && params.released_before_days_ago > 0 ? params.released_before_days_ago : undefined,
    reviewed_after_days_ago: params.reviewed_after_days_ago && params.reviewed_after_days_ago > 0 ? params.reviewed_after_days_ago : undefined,
    reviewed_before_days_ago: params.reviewed_before_days_ago && params.reviewed_before_days_ago > 0 ? params.reviewed_before_days_ago : undefined
    
    
  };
}
