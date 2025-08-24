import React from 'react';
import { Link } from 'react-router-dom';

const CreatorCard = ({ creator, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    
    if (window.confirm('Are you sure you want to delete this creator?')) {
      onDelete(creator.name);
    }
  };

  return (
    <article className="creator-card">
      <header>
        {creator.imageURL && (
          <img 
            src={creator.imageURL} 
            alt={`${creator.name}`}
            className="creator-image"
          />
        )}
        <h3>{creator.name}</h3>
      </header>
      <p>{creator.description}</p>
      <footer>
        <div className="card-actions">
          <a 
            href={creator.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Visit Channel
          </a>
          <Link 
            to={`/creator/${encodeURIComponent(creator.name)}`} 
            className="btn btn-primary"
          >
            View Details
          </Link>
          <Link 
            to={`/creator/${encodeURIComponent(creator.name)}/edit`} 
            className="btn btn-secondary"
          >
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-outline btn-error">
            Delete
          </button>
        </div>
      </footer>
    </article>
  );
};

export default CreatorCard;
