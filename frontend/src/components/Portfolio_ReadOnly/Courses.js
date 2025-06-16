import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/courses')
      .then(response => {
        setCourses(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (courses.length === 0) return <section id="courses" style={{padding: '20px'}}><p>No courses to display.</p></section>;


  return (
    <section id="courses" style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee' }}>
      <h2>Relevant Courses & Certifications</h2>
      <ul style={{ columns: 2, columnGap: '20px', listStyleType: 'disc', paddingLeft: '20px' }}>
        {courses.map((course, index) => (
          <li key={index} style={{ marginBottom: '5px' }}>{course}</li>
        ))}
      </ul>
    </section>
  );
};
export default Courses;
