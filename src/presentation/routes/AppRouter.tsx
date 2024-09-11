import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchPage } from '../pages/SearchPage';
import { MovieDetailPage } from "../pages/MovieDetailPage";

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/movie/:imdbID" element={<MovieDetailPage />} />
                <Route path="*" element={<SearchPage />} />
            </Routes>
        </Router>
    );
};