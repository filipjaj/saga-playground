export interface Movie {
  title: string;
  releaseYear: number;
  averageReviewScore: number;
  reviewCount: number;
  streamingPlatforms: string[];
  originalLanguage: string;
}

export interface SearchParams {
  language: string;
  releaseDateFrom: string;
  releaseDateTo: string;
  reviewDateFrom: string;
  reviewDateTo: string;
  streamingReleaseFrom: string;
  streamingReleaseTo: string;
  reviewLanguage: string;
  minReviewScore: number;
  minReviewCount: number;
  sortBy: 'streamingReleaseDate' | 'imdbVoteCount' | 'reviewDate';
}