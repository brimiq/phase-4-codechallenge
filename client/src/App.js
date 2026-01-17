import React, { useState } from 'react';
import HeroList from './components/HeroList';
import HeroDetail from './components/HeroDetail';
import PowerList from './components/PowerList';
import AddHeroPowerForm from './components/AddHeroPowerForm';
import UpdatePowerForm from './components/UpdatePowerForm';

function App() {
  const [selectedHeroId, setSelectedHeroId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPower, setEditingPower] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleHeroSelect = (id) => {
    setSelectedHeroId(id);
    setShowAddForm(false);
    setEditingPower(null);
  };

  const handleBack = () => {
    setSelectedHeroId(null);
  };

  const handleAddPower = () => {
    setShowAddForm(true);
    setSelectedHeroId(null);
    setEditingPower(null);
  };

  const handleUpdatePower = (power) => {
    setEditingPower(power);
    setShowAddForm(false);
    setSelectedHeroId(null);
  };

  const handleFormSuccess = () => {
    setShowAddForm(false);
    setEditingPower(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingPower(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Superheroes API</h1>
          <p className="mt-2 text-blue-100">Manage heroes, powers, and hero powers</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedHeroId(null);
                setShowAddForm(false);
                setEditingPower(null);
              }}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={handleAddPower}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Add Hero Power
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {showAddForm ? (
          <div className="max-w-md mx-auto">
            <AddHeroPowerForm onSuccess={handleFormSuccess} onCancel={handleCancel} />
          </div>
        ) : editingPower ? (
          <div className="max-w-md mx-auto">
            <UpdatePowerForm
              power={editingPower}
              onSuccess={handleFormSuccess}
              onCancel={handleCancel}
            />
          </div>
        ) : selectedHeroId ? (
          <div className="max-w-md mx-auto">
            <HeroDetail heroId={selectedHeroId} onBack={handleBack} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <HeroList onSelectHero={handleHeroSelect} key={refreshKey} />
            <PowerList onUpdatePower={handleUpdatePower} key={refreshKey + 1} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>Superheroes API - Flask Backend + React Frontend with Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

