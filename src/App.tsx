import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { SkillsShowcase } from './components/SkillsShowcase';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { AdminPage } from './components/AdminPage';

export const AppContent: React.FC = () => {
  const [cvOpen, setCvOpen] = useState(false);
  const [page, setPage] = useState<'home' | 'admin'>(() => {
    return window.location.hash === '#/admin' || window.location.hash === '#admin' ? 'admin' : 'home';
  });

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#/admin' || window.location.hash === '#admin') {
        setPage('admin');
      } else {
        setPage('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // When admin page is active, render full standalone page
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

  return (
    <div className="portfolio-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar 
        onOpenCV={() => setCvOpen(true)} 
        onOpenAdmin={() => {
          setPage('admin');
          window.location.hash = '#/admin';
        }} 
      />

      <main style={{ flex: 1 }}>
        <Hero onOpenCV={() => setCvOpen(true)} />
        <About />
        <Projects />
        <Experience />
        <Education />
        <SkillsShowcase />
        <Contact />
      </main>

      <Footer />

      {/* CV Modal */}
      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
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
