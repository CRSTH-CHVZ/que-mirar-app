import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchPage } from '../pages/SearchPage';

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SearchPage />} />
            </Routes>
        </Router>
    );
};