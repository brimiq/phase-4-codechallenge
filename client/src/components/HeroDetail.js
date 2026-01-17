import React, { useState, useEffect } from 'react';
import api from '../api';

function HeroDetail({ heroId, onBack }) {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (heroId) {
      setLoading(true);
      api.getHero(heroId)
        .then(res => {
          setHero(res.data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to load hero');
          setLoading(false);
        });
    }
  }, [heroId]);

  if (!heroId) return null;
  if (loading) return <div className="text-center p-4">Loading hero...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <button
        onClick={onBack}
        className="mb-4 text-blue-500 hover:text-blue-600 text-sm font-medium"
      >
        ← Back to Heroes
      </button>
      <h2 className="text-2xl font-bold mb-2 text-gray-900">{hero.super_name}</h2>
      <p className="text-gray-600 mb-4">Real name: {hero.name}</p>
      
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Hero Powers</h3>
      {hero.hero_powers && hero.hero_powers.length > 0 ? (
        <div className="space-y-2">
          {hero.hero_powers.map(hp => (
            <div key={hp.id} className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">{hp.power.name}</p>
              <p className="text-sm text-gray-600">Strength: <span className="capitalize">{hp.strength}</span></p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No powers assigned yet.</p>
      )}
    </div>
  );
}

export default HeroDetail;

