import React, { useState } from 'react';
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
import { AdminModal } from './components/AdminModal';

export const AppContent: React.FC = () => {
  const [cvOpen, setCvOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="portfolio-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar 
        onOpenCV={() => setCvOpen(true)} 
        onOpenAdmin={() => setAdminOpen(true)} 
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

      {/* Admin Dashboard CMS Modal */}
      <AdminModal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
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
