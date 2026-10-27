import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Sun, 
  Moon, 
  Languages, 
  FileText, 
  Lock, 
  Menu, 
  X,
  ExternalLink,
  Code2
} from 'lucide-react';

interface NavbarProps {
  onOpenCV: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCV, onOpenAdmin }) => {
  const { locale, theme, data, setLocale, setTheme, isAdmin } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: locale === 'ar' ? 'عن المهندس' : 'About' },
    { href: '#projects', label: locale === 'ar' ? 'المشاريع' : 'Projects' },
    { href: '#experience', label: locale === 'ar' ? 'الخبرات' : 'Experience' },
    { href: '#education', label: locale === 'ar' ? 'المؤهلات والشهادات' : 'Education' },
    { href: '#skills', label: locale === 'ar' ? 'المهارات' : 'Skills' },
    { href: '#contact', label: locale === 'ar' ? 'تواصل معي' : 'Contact' },
  ];

  const toggleLanguage = () => {
    setLocale(locale === 'ar' ? 'en' : 'ar');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo & Avatar */}
        <a 
          href="#" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{ position: 'relative' }}>
            <img 
              src={data.avatarImage} 
              alt={data.profile.displayName[locale]} 
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent)',
                boxShadow: '0 0 12px var(--accent-glow)'
              }}
            />
            <span 
              title={locale === 'ar' ? 'متاح للعمل والمشاريع' : 'Available for Work'}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                border: '2px solid var(--bg-main)'
              }} 
            />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.2 }}>
              {data.profile.displayName[locale]}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {locale === 'ar' ? 'مهندس IT ومطور برمجيات' : 'IT Engineer & Developer'}
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav 
          style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} 
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                textDecoration: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.92rem',
                fontWeight: 600,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (CV, Lang, Theme, Admin, Menu) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          
          {/* CV Button */}
          <button
            onClick={onOpenCV}
            className="btn btn-outline"
            style={{
              padding: '0.45rem 0.95rem',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)'
            }}
            title={locale === 'ar' ? 'عرض وتحميل السيرة الذاتية' : 'View & Download CV'}
          >
            <FileText size={16} />
            <span>{locale === 'ar' ? 'السيرة الذاتية' : 'CV'}</span>
          </button>

          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            className="btn btn-secondary"
            style={{
              padding: '0.45rem 0.75rem',
              fontSize: '0.82rem',
              borderRadius: 'var(--radius-sm)',
              minWidth: '40px'
            }}
            title={locale === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
          >
            <Languages size={16} />
            <span style={{ fontWeight: 700 }}>{locale === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Theme Switch */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary"
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              minWidth: '40px'
            }}
            title={theme === 'dark' ? (locale === 'ar' ? 'الوضع النهاري' : 'Light Mode') : (locale === 'ar' ? 'الوضع الليلي' : 'Dark Mode')}
          >
            {theme === 'dark' ? <Sun size={17} color="#FBBF24" /> : <Moon size={17} color="#6366F1" />}
          </button>

          {/* Admin CMS Trigger */}
          <button
            onClick={onOpenAdmin}
            className={`btn ${isAdmin ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              position: 'relative'
            }}
            title={isAdmin ? (locale === 'ar' ? 'لوحة التحكم (نشطة)' : 'Dashboard (Active)') : (locale === 'ar' ? 'دخول لوحة الإدارة' : 'Admin Login')}
          >
            <Lock size={16} />
            {isAdmin && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981'
                }} 
              />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary mobile-menu-btn"
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-sm)'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          style={{
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontSize: '1.05rem',
                fontWeight: 600,
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border-subtle)'
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCV();
              }}
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.65rem' }}
            >
              <FileText size={18} />
              <span>{locale === 'ar' ? 'تحميل السيرة الذاتية' : 'Download CV'}</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
