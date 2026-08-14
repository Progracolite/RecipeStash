import React, { useState } from 'react';
import api from '../api/axios';

const AddRecipeModal = ({ isOpen, onClose, onRecipeAdded }) => {
  const [title, setTitle] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [ingredientsList, setIngredientsList] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/api/recipes/', {
        title,
        source_url: sourceUrl,
        ingredients_list: ingredientsList,
      });
      onRecipeAdded(res.data);
      setTitle('');
      setSourceUrl('');
      setIngredientsList('');
      onClose();
    } catch (err) {
      alert('Failed to save recipe. Please verify your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Add to Recipe Stash 🍳</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Recipe Title (e.g., Creamy Tuscan Chicken)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="url"
            placeholder="Source URL (e.g., https://allrecipes.com/...)"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Ingredients (e.g., 2 chicken breasts, 1 cup cream, 2 cloves garlic)"
            value={ingredientsList}
            onChange={(e) => setIngredientsList(e.target.value)}
            rows={4}
            required
            style={styles.input}
          />
          <div style={styles.btnRow}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
            <button type="submit" disabled={loading} style={styles.saveBtn}>
              {loading ? 'Saving...' : 'Save Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: '#fff', padding: '24px', borderRadius: '12px', width: '90%', maxWidth: '480px', fontFamily: 'sans-serif' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' },
  btnRow: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' },
  saveBtn: { padding: '10px 16px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  cancelBtn: { padding: '10px 16px', background: '#e5e7eb', border: 'none', borderRadius: '6px', cursor: 'pointer' },
};

export default AddRecipeModal;