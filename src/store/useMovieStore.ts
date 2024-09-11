import { create } from 'zustand';
import { OmdbApiService } from '../data/api/OmdbApiService';

interface MovieState {
    query: string;
    page: number;
    totalResults: number;
    movies: any[];
    cache: { [key: string]: any };
    loading: boolean;
    error: string | null;
    setQuery: (query: string) => void;
    fetchMovies: (query: string, page: number, type: 'movie' | 'series' | 'both') => Promise<void>;
    setPage: (page: number) => void;
}

export const useMovieStore = create<MovieState>((set, get) => ({
    query: '',
    page: 1,
    totalResults: 0,
    movies: [],
    cache: {},
    loading: false,
    error: null,

    setQuery: (query: string) => set({ query }),

    setPage: (page: number) => set({ page }),

    fetchMovies: async (query: string, page: number, type: 'movie' | 'series' | 'both') => {
        const cacheKey = `${query}_${page}_${type}`;
        const { cache } = get();

        if (cache[cacheKey]) {
            // Return cached result if available
            const { Search, totalResults } = cache[cacheKey];
            set({
                movies: Search,
                totalResults: Number(totalResults),
                loading: false,
            });
        } else {
            set({ loading: true, error: null });

            try {
                const response = await OmdbApiService.searchMovies(query, type, page);
                set({
                    movies: response.Search,
                    totalResults: Number(response.totalResults),
                    cache: { ...cache, [cacheKey]: response },
                    loading: false,
                });
            } catch (err) {
                set({ error: 'No encontramos coincidencias para tu búsqueda. Intenta algo diferente', loading: false });
            }
        }
    },
}));