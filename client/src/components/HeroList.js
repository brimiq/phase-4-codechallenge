import React, { useState, useEffect } from 'react';
import api from '../api';

function HeroList({ onSelectHero }) {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getHeroes()
      .then(res => {
        setHeroes(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load heroes');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-4">Loading heroes...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Heroes</h2>
      <div className="space-y-3">
        {heroes.map(hero => (
          <div
            key={hero.id}
            onClick={() => onSelectHero(hero.id)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
          >
            <h3 className="font-semibold text-lg text-gray-900">{hero.super_name}</h3>
            <p className="text-gray-600 text-sm">Real name: {hero.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroList;

