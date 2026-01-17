import React, { useState, useEffect } from 'react';
import api from '../api';

function AddHeroPowerForm({ onSuccess, onCancel }) {
  const [heroes, setHeroes] = useState([]);
  const [powers, setPowers] = useState([]);
  const [formData, setFormData] = useState({
    hero_id: '',
    power_id: '',
    strength: 'Average'
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.getHeroes(), api.getPowers()])
      .then(([heroesRes, powersRes]) => {
        setHeroes(heroesRes.data);
        setPowers(powersRes.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await api.createHeroPower(formData);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.errors?.[0] || 'Failed to create hero power');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading form...</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add Power to Hero</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hero</label>
          <select
            value={formData.hero_id}
            onChange={(e) => setFormData({ ...formData, hero_id: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a hero</option>
            {heroes.map(hero => (
              <option key={hero.id} value={hero.id}>
                {hero.super_name} ({hero.name})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Power</label>
          <select
            value={formData.power_id}
            onChange={(e) => setFormData({ ...formData, power_id: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a power</option>
            {powers.map(power => (
              <option key={power.id} value={power.id}>
                {power.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Strength</label>
          <select
            value={formData.strength}
            onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Strong">Strong</option>
            <option value="Average">Average</option>
            <option value="Weak">Weak</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {submitting ? 'Creating...' : 'Add Power'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddHeroPowerForm;

