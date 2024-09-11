import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OmdbApiService } from '../../data/api/OmdbApiService';

export const MovieDetailPage: React.FC = () => {
    const { imdbID } = useParams<{ imdbID: string }>();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const goBack = () => {
        navigate(-1); // Navega a la página anterior en el historial
    };

    const fetchMovieDetails = async () => {
        setLoading(true);
        setError(null);

        try {
            const movieDetails = await OmdbApiService.getMovieDetails(imdbID!);
            setMovie(movieDetails);
        } catch (err) {
            setError('Ups, al parecer hubo un error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovieDetails();
    }, [imdbID]);

    if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <>
            <div className="flex justify-end space-x-4">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={goBack}
                >
                    Volver al inicio
                </button>
            </div>
                <div className="container mx-auto px-4 py-6">
                    {movie && (
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold">{movie.Title}</h2>
                            <img src={movie.Poster} alt={movie.Title} className="my-4 w-full max-w-xs mx-auto"/>
                            <p><strong>Plot:</strong> {movie.Plot}</p>
                            <p><strong>Genre:</strong> {movie.Genre}</p>
                            <p><strong>Director:</strong> {movie.Director}</p>
                            <p><strong>Actors:</strong> {movie.Actors}</p>
                        </div>
                    )}
                </div>
            </>
            );
            };