import {Show} from "../entities/Shows.ts";
import { OmdbApiService } from '../../data/api/OmdbApiService';

interface MovieItem {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export const fetchMovies = async (query: string, type: 'movie' | 'series' | 'both'): Promise<Show[]> => {
    const results = await OmdbApiService.searchMovies(query, type);
    return results.map((item: MovieItem) => ({
        title: item.Title,
        year: item.Year,
        imdbID: item.imdbID,
        type: item.Type,
        poster: item.Poster
    }));
};