import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiConfig, getCreatorsEndpoint } from '../utils/api';

const AddCreator = () => {
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreator(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await axios.post(getCreatorsEndpoint(), {
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL || null
      }, {
        headers: {
          ...apiConfig.headers,
          'Prefer': 'return=representation'
        }
      });

      if (response.status !== 201) {
        alert('Failed to add creator');
        return;
      }

      navigate(`/creator/${encodeURIComponent(creator.name)}`);
    } catch (error) {
      console.error('Failed to add creator:', error);
      alert('An error occurred while adding the creator');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-creator">
      <header>
        <Link to="/" className="back-link">← Back to Creators</Link>
        <h1>Add New Creator</h1>
      </header>

      <form onSubmit={handleSubmit} className="creator-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={creator.name}
            onChange={handleChange}
            required
            placeholder="Enter creator name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">Channel URL *</label>
          <input
            type="url"
            id="url"
            name="url"
            value={creator.url}
            onChange={handleChange}
            required
            placeholder="https://example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={creator.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Describe what this creator does..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageURL">Image URL (optional)</label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={creator.imageURL}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-actions">
          <Link to="/" className="btn btn-outline">
            Cancel
          </Link>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Adding...' : 'Add Creator'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCreator;
