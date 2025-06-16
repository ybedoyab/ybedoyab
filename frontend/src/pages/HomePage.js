import React from 'react';
import Profile from '../components/Portfolio/Profile';
import Experience from '../components/Portfolio/Experience';
import Education from '../components/Portfolio/Education';
import Projects from '../components/Portfolio/Projects';
import Skills from '../components/Portfolio/Skills';
import Awards from '../components/Portfolio_ReadOnly/Awards';
import Languages from '../components/Portfolio_ReadOnly/Languages';
import References from '../components/Portfolio_ReadOnly/References';
import Courses from '../components/Portfolio_ReadOnly/Courses';

const HomePage = () => {
  return (
    <>
      <Profile />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Awards />
      <Languages />
      <Courses />
      <References />
    </>
  );
};

export default HomePage;
