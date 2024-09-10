import create from 'zustand';
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
}));