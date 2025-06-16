import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/profile')
      .then(response => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile information.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!profile) return <p>No profile information available.</p>;

  const { name, title, bio, contact } = profile;

  return (
    <section id="profile" style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee' }}>
      <h1>{name || 'Your Name'}</h1>
      <h2>{title || 'Your Title'}</h2>
      <p>{bio || 'Your bio will appear here.'}</p>
      {contact && (
        <div>
          <h3>Contact Information</h3>
          <p>Email: {contact.email || 'N/A'}</p>
          <p>Phone: {contact.phone || 'N/A'}</p>
          {contact.linkedin && <p>LinkedIn: <a href={'//'+contact.linkedin.replace(/^https?:\/\//,'')} target="_blank" rel="noopener noreferrer">{contact.linkedin.replace(/^https?:\/\//,'')}</a></p>}
          {contact.github && <p>GitHub: <a href={'//'+contact.github.replace(/^https?:\/\//,'')} target="_blank" rel="noopener noreferrer">{contact.github.replace(/^https?:\/\//,'')}</a></p>}
          <p>Location: {contact.location || 'N/A'}</p>
        </div>
      )}
    </section>
  );
};

export default Profile;
