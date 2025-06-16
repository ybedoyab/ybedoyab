import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/awards')
      .then(response => {
        setAwards(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching awards:', err);
        setError('Failed to load awards.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading awards...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (awards.length === 0) return <section id="awards" style={{padding: '20px'}}><p>No awards listed yet.</p></section>;


  return (
    <section id="awards" style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee' }}>
      <h2>Awards & Recognitions</h2>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        {awards.map(award => (
          <li key={award.id} style={{ marginBottom: '5px' }}>
            <strong>{award.name || 'Award Name'}</strong>
            {award.description && award.description.trim() !== '' && `: ${award.description}`}
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Awards;
