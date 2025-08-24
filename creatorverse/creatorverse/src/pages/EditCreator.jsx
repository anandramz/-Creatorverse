import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiConfig, getCreatorEndpoint } from '../utils/api';

const EditCreator = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCreator();
  }, [name]);

  const fetchCreator = async () => {
    try {
      const response = await axios.get(`${getCreatorEndpoint(decodeURIComponent(name))}&select=*`, {
        headers: apiConfig.headers
      });

      if (response.data.length === 0) {
        navigate('/');
        return;
      }

      setCreator(response.data[0]);
    } catch (error) {
      console.error('Failed to fetch creator:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

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
      const response = await axios.patch(getCreatorEndpoint(decodeURIComponent(name)), {
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL || null
      }, {
        headers: {
          ...apiConfig.headers,
          'Prefer': 'return=minimal'
        }
      });

      if (response.status !== 204) {
        alert('Failed to update creator');
        return;
      }

      navigate(`/creator/${encodeURIComponent(creator.name)}`);
    } catch (error) {
      console.error('Failed to update creator:', error);
      alert('An error occurred while updating the creator');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this creator? This action cannot be undone.')) {
      setDeleting(true);
      
      try {
        const response = await axios.delete(getCreatorEndpoint(decodeURIComponent(name)), {
          headers: apiConfig.headers
        });

        if (response.status !== 204) {
          alert('Failed to delete creator');
          return;
        }

        navigate('/');
      } catch (error) {
        console.error('Failed to delete creator:', error);
        alert('An error occurred while deleting the creator');
      } finally {
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading creator...</div>;
  }

  return (
    <div className="edit-creator">
      <header>
        <Link to={`/creator/${encodeURIComponent(name)}`} className="back-link">← Back to Creator</Link>
        <h1>Edit Creator</h1>
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
            value={creator.imageURL || ''}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-actions">
          <Link to={`/creator/${encodeURIComponent(name)}`} className="btn btn-outline">
            Cancel
          </Link>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            type="button"
            onClick={handleDelete}
            className="btn btn-outline btn-error"
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete Creator'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;
