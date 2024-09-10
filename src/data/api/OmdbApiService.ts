import axios from 'axios';

const API_KEY = '720906cd'; // Replace with your actual API key
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export const OmdbApiService = {
    // Modify the function to accept `page` as the third argument
    searchMovies: async (query: string, type: 'movie' | 'series' | 'both', page: number = 1) => {
        const response = await axios.get(BASE_URL, {
            params: {
                s: query,
                type: type === 'both' ? undefined : type,
                page: page, // Add the page parameter for pagination
            },
        });

        if (response.data.Error) {
            throw new Error(response.data.Error);
        }

        return response.data;
    },

    getMovieDetails: async (imdbID: string) => {
        const response = await axios.get(BASE_URL, {
            params: { i: imdbID },
        });

        if (response.data.Error) {
            throw new Error(response.data.Error);
        }

        return response.data;
    },
};