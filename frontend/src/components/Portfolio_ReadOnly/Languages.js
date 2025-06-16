import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/languages')
      .then(response => {
        setLanguages(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching languages:', err);
        setError('Failed to load languages.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading languages...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (languages.length === 0) return <section id="languages" style={{padding: '20px'}}><p>No language information available.</p></section>;

  return (
    <section id="languages" style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee' }}>
      <h2>Languages</h2>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        {languages.map(lang => (
          <li key={lang.id} style={{ marginBottom: '5px' }}>{lang.name || 'Language'}: {lang.proficiency || 'N/A'}</li>
        ))}
      </ul>
    </section>
  );
};
export default Languages;
