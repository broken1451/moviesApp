export interface MovieResponse {
  page?: number;
  results?: Result[];
  total_pages?: number;
  total_results?: number;
}

export interface Result {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[] | string[];
  id?: number | string;
  original_language?: OriginalLanguage;
  original_title?: string;
  overview?: string;
  popularity?: number | string;
  poster_path?: string;
  release_date?: Date;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  visible?: boolean;
  favorite?: boolean;
}

export enum OriginalLanguage {
  De = 'de',
  En = 'en',
  Es = 'es',
}
