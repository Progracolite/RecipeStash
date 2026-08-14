import React, { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import AddRecipeModal from '../components/AddRecipeModal';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await api.get('/api/recipes/');
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this recipe?')) {
      await api.delete(`/api/recipes/${id}/`);
      setRecipes(recipes.filter((r) => r.id !== id));
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#111827' }}>🍳 Recipe Stash</h1>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Logged in as <strong>{user?.username}</strong></p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setIsModalOpen(true)} style={styles.addBtn}>+ Add Recipe</button>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </header>

      <main style={{ marginTop: '24px' }}>
        {recipes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
            <h3>No recipes saved yet!</h3>
            <p>Click <strong>+ Add Recipe</strong> to start saving your recipe URLs and ingredients[cite: 737, 739].</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {recipes.map((r) => (
              <div key={r.id} style={styles.card}>
                <h3 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>{r.title}</h3>
                <p style={{ fontSize: '14px', color: '#4b5563', whiteSpace: 'pre-wrap', flexGrow: 1 }}>
                  <strong>Ingredients:</strong><br />{r.ingredients_list}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                  {r.source_url ? (
                    <a href={r.source_url} target="_blank" rel="noreferrer" style={styles.linkBtn}>View Original 🔗</a>
                  ) : <span />}
                  <button onClick={() => handleDelete(r.id)} style={styles.delBtn}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <AddRecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRecipeAdded={(newRecipe) => setRecipes([newRecipe, ...recipes])}
      />
    </div>
  );
};

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' },
  addBtn: { padding: '8px 16px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  logoutBtn: { padding: '8px 16px', background: '#e5e7eb', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  linkBtn: { fontSize: '13px', color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' },
  delBtn: { fontSize: '12px', background: '#fee2e2', color: '#dc2626', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' },
};

export default Dashboard;