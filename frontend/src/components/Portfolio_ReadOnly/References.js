import React, { useState, useEffect } from 'react';
import axios from 'axios';

const References = () => {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/references')
      .then(response => {
        setReferences(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching references:', err);
        setError('Failed to load references.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading references...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (references.length === 0) return <section id="references" style={{padding: '20px'}}><p>References available upon request.</p></section>;


  return (
    <section id="references" style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee' }}>
      <h2>References</h2>
      {references.map(ref => (
        <div key={ref.id} style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
          <strong>{ref.name || 'Reference Name'}</strong>
          {ref.title && <p style={{ margin: '5px 0 0 0' }}><em>{ref.title}</em></p>}
          {ref.email && <p style={{ margin: '5px 0 0 0' }}>Email: {ref.email}</p>}
          {ref.phone && <p style={{ margin: '5px 0 0 0' }}>Phone: {ref.phone}</p>}
        </div>
      ))}
    </section>
  );
};
export default References;
