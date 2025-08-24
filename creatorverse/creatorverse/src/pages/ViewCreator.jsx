import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiConfig, getCreatorEndpoint } from '../utils/api';

const ViewCreator = () => {
  console.log('ViewCreator: Component rendered');
  const { name } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  
  console.log('ViewCreator: useParams name:', name);

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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this creator?')) {
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
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading creator...</div>;
  }

  if (!creator) {
    return <div className="error">Creator not found</div>;
  }

  return (
    <div className="view-creator">
      <header>
        <Link to="/" className="back-link">← Back to Creators</Link>
        <h1>{creator.name}</h1>
      </header>

      <div className="creator-details">
        {creator.imageURL && (
          <div className="creator-image-container">
            <img 
              src={creator.imageURL} 
              alt={creator.name}
              className="creator-image-large"
            />
          </div>
        )}

        <div className="creator-info">
          <h2>About</h2>
          <p>{creator.description}</p>
          
          <h2>Channel</h2>
          <a 
            href={creator.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="creator-link-large"
          >
            Visit Channel
          </a>
        </div>

        <div className="creator-actions">
          <Link to={`/creator/${encodeURIComponent(name)}/edit`} className="btn btn-primary">
            Edit Creator
          </Link>
          <button onClick={handleDelete} className="btn btn-outline btn-error">
            Delete Creator
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCreator;
