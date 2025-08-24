import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreatorCard from '../components/CreatorCard';
import { apiConfig, getCreatorsEndpoint, getCreatorEndpoint } from '../utils/api';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const response = await axios.get(getCreatorsEndpoint(), {
        headers: apiConfig.headers,
        params: {
          select: '*',
          order: 'name'
        }
      });

      setCreators(response.data || []);
    } catch (error) {
      console.error('Failed to fetch creators:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (name) => {
    if (!window.confirm('Are you sure you want to delete this creator?')) {
      return;
    }
    
    try {
      // Check if creator exists before deleting
      const checkResponse = await axios.get(`${getCreatorEndpoint(name)}&select=name`, {
        headers: apiConfig.headers
      });
      
      if (checkResponse.data.length === 0) {
        alert('Creator not found');
        return;
      }
      
      // Delete the creator
      const deleteResponse = await axios.delete(getCreatorEndpoint(name), {
        headers: apiConfig.headers
      });

      if (deleteResponse.status !== 204) {
        alert('Failed to delete creator');
        return;
      }

      // Update local state
      setCreators(creators.filter(creator => creator.name !== name));
      
    } catch (error) {
      console.error('Error deleting creator:', error);
      alert('An error occurred while deleting the creator');
    }
  };

  if (loading) {
    return <div className="loading">Loading creators...</div>;
  }

  return (
    <div className="show-creators">
      <header>
        <h1>💫 Creatorverse</h1>
        <p>Discover amazing content creators</p>
        <div className="header-actions">
          <Link to="/creator/add" className="btn btn-primary">
            Add New Creator
          </Link>
        </div>
      </header>

      {creators.length === 0 ? (
        <div className="no-creators">
          <p>No creators found. Be the first to add one!</p>
        </div>
      ) : (
        <div className="creators-grid">
          {creators.map((creator) => (
            <CreatorCard
              key={creator.name}
              creator={creator}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCreators;
