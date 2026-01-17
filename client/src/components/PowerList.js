import React, { useState, useEffect } from 'react';
import api from '../api';

function PowerList({ onUpdatePower }) {
  const [powers, setPowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getPowers()
      .then(res => {
        setPowers(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load powers');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-4">Loading powers...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Powers</h2>
      <div className="space-y-3">
        {powers.map(power => (
          <div key={power.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 capitalize">{power.name}</h3>
                <p className="text-gray-600 mt-1">{power.description}</p>
              </div>
              <button
                onClick={() => onUpdatePower(power)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PowerList;

