import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string, type: 'movie' | 'series' | 'both') => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [type, setType] = useState<'movie' | 'series' | 'both'>('both');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            onSearch(searchQuery, type);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ingresa la serie o peli que quieres consultar"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={type}
                onChange={(e) => setType(e.target.value as 'movie' | 'series' | 'both')}
            >
                <option value="movie">Películas</option>
                <option value="series">Series</option>
                <option value="both">Películas y series</option>
            </select>
            <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Search
            </button>
        </div>
    );
};