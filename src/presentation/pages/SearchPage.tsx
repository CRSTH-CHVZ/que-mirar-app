import React from 'react';
import { SearchBar } from '../components/SearchBar.tsx';
import { Link } from 'react-router-dom';
import { useMovieStore } from '../../store/useMovieStore';
import { ClipLoader } from 'react-spinners';  // Import the spinner

// src/presentation/pages/SearchPage.tsx
export const SearchPage: React.FC = () => {
    const {
        movies,
        loading,
        error,
        query,
        page,
        totalResults,
        fetchMovies,
        setQuery,
        setPage,
    } = useMovieStore();

    const handleSearch = async (searchQuery: string, type: 'movie' | 'series' | 'both') => {
        setQuery(searchQuery);
        setPage(1); // Reset page to 1 on new search
        await fetchMovies(searchQuery, 1, type);
    };

    const handlePageChange = async (newPage: number) => {
        setPage(newPage);
        await fetchMovies(query, newPage, 'both'); // Adjust the type as needed
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <SearchBar onSearch={handleSearch} />

            {loading ? (
                <div className="flex justify-center py-10">
                    <ClipLoader color="#3b82f6" size={50} />
                </div>
            ) : (
                <>
                    {error && <p className="text-center text-red-500">{error}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {movies.map((movie, index) => (
                            <div
                                key={movie.imdbID}
                                className="bg-white shadow-md rounded-lg p-4 transform transition-all duration-300 ease-in-out hover:scale-105"
                                style={{ animationDelay: `${index * 100}ms`, animationDuration: '400ms' }}
                            >
                                <h3 className="text-xl font-semibold">{movie.Title}</h3>
                                <p className="text-gray-600">{movie.Year}</p>
                                <p className="text-gray-600">{movie.Type}</p>
                                <Link to={`/movie/${movie.imdbID}`} className="text-blue-600 hover:underline">
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
                        >
                            Previous
                        </button>
                        <p>Page {page} of {Math.ceil(totalResults / 10)}</p>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page * 10 >= totalResults}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};