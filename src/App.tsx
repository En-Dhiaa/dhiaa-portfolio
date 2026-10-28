import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { DesignGallery } from './components/DesignGallery';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { SkillsShowcase } from './components/SkillsShowcase';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CVPage } from './components/CVPage';
import { AdminPage } from './components/AdminPage';

export const AppContent: React.FC = () => {
  const [page, setPage] = useState<'home' | 'admin' | 'cv'>(() => {
    const hash = window.location.hash;
    if (hash === '#/admin' || hash === '#admin') return 'admin';
    if (hash === '#/cv' || hash === '#cv') return 'cv';
    return 'home';
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#/admin' || hash === '#admin') {
        setPage('admin');
      } else if (hash === '#/cv' || hash === '#cv') {
        setPage('cv');
      } else {
        setPage('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // When admin page is active, render full standalone Admin page
  if (page === 'admin') {
    return (
      <AdminPage 
        onBack={() => {
          setPage('home');
          window.location.hash = '';
        }} 
      />
    );
  }

  // When CV page is active, render full dedicated CV document viewer
  if (page === 'cv') {
    return (
      <CVPage 
        onBack={() => {
          setPage('home');
          window.location.hash = '';
        }} 
      />
    );
  }

  return (
    <div className="portfolio-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar 
        onOpenCV={() => {
          setPage('cv');
          window.location.hash = '#/cv';
        }} 
        onOpenAdmin={() => {
          setPage('admin');
          window.location.hash = '#/admin';
        }} 
      />

      <main style={{ flex: 1 }}>
        <Hero 
          onOpenCV={() => {
            setPage('cv');
            window.location.hash = '#/cv';
          }} 
        />
        <About />
        <Projects />
        <DesignGallery />
        <Experience />
        <Education />
        <SkillsShowcase />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
};

export default App;
