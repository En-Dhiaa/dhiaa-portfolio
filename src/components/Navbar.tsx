import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio, AVAILABLE_FONTS } from '../context/PortfolioContext';
import { 
  Sun, 
  Moon, 
  Languages, 
  FileText, 
  Lock, 
  Menu, 
  X,
  Type,
  Check
} from 'lucide-react';

interface NavbarProps {
  onOpenCV: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCV, onOpenAdmin }) => {
  const { locale, theme, data, setLocale, setTheme, isAdmin, currentFont, setFont } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontMenuOpen, setFontMenuOpen] = useState(false);
  const fontMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close font menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fontMenuRef.current && !fontMenuRef.current.contains(event.target as Node)) {
        setFontMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '#about', label: locale === 'ar' ? 'عن المهندس' : 'About' },
    { href: '#projects', label: locale === 'ar' ? 'المشاريع' : 'Projects' },
    { href: '#designs', label: locale === 'ar' ? 'معرض التصاميم' : 'Designs' },
    { href: '#experience', label: locale === 'ar' ? 'الخبرات' : 'Experience' },
    { href: '#education', label: locale === 'ar' ? 'المؤهلات' : 'Education' },
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
        isScrolled ? 'glass-nav shadow-md py-2.5' : 'bg-transparent py-3.5'
      }`}
    >
      <div 
        className="container" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '0.5rem'
        }}
      >
        
        {/* Brand Logo & Avatar */}
        <a 
          href="#" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.65rem', 
            textDecoration: 'none', 
            color: 'inherit',
            flexShrink: 0
          }}
        >
          <div style={{ position: 'relative' }}>
            <img 
              src={data.avatarImage} 
              alt={data.profile.displayName[locale]} 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent)',
                boxShadow: '0 0 10px var(--accent-glow)'
              }}
            />
            <span 
              title={locale === 'ar' ? 'متاح للعمل والمشاريع' : 'Available for Work'}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                border: '2px solid var(--bg-main)'
              }} 
            />
          </div>
          <div style={{ whiteSpace: 'nowrap' }}>
            <div style={{ fontWeight: 800, fontSize: '0.96rem', lineHeight: 1.2 }}>
              {data.profile.displayName[locale]}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {locale === 'ar' ? 'مهندس IT ومطور برمجيات' : 'IT Engineer & Developer'}
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav 
          style={{ display: 'none', alignItems: 'center', gap: '1.25rem' }} 
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                textDecoration: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.88rem',
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

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          
          {/* CV Button - Compact & Space-Efficient */}
          <button
            onClick={onOpenCV}
            className="btn btn-outline"
            style={{
              padding: '0.38rem 0.65rem',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
            title={locale === 'ar' ? 'عرض وتحميل السيرة الذاتية' : 'View & Download CV'}
          >
            <FileText size={15} />
            <span className="cv-btn-text">{locale === 'ar' ? 'السيرة الذاتية' : 'CV'}</span>
            <span className="cv-btn-mobile">CV</span>
          </button>

          {/* Font Selector Menu Dropdown - Desktop Only */}
          <div style={{ position: 'relative' }} ref={fontMenuRef} className="desktop-only-action">
            <button
              onClick={() => setFontMenuOpen(!fontMenuOpen)}
              className={`btn ${fontMenuOpen ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: '0.38rem 0.55rem',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-sm)',
                minWidth: '34px'
              }}
              title={locale === 'ar' ? 'تغيير خط الموقع' : 'Change Website Font'}
              aria-label="Change Font"
            >
              <Type size={15} />
            </button>

            {fontMenuOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '115%',
                  left: locale === 'ar' ? '0' : 'auto',
                  right: locale === 'ar' ? 'auto' : '0',
                  minWidth: '220px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-hover)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '0.5rem',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}
              >
                <div 
                  style={{ 
                    padding: '0.35rem 0.65rem', 
                    fontSize: '0.72rem', 
                    fontWeight: 700, 
                    color: 'var(--text-muted)',
                    borderBottom: '1px solid var(--border-subtle)',
                    marginBottom: '0.25rem'
                  }}
                >
                  {locale === 'ar' ? 'اختر خط الموقع:' : 'Select Website Font:'}
                </div>
                {AVAILABLE_FONTS.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => {
                      setFont(font.id);
                      setFontMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '0.45rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      backgroundColor: currentFont === font.id ? 'rgba(var(--accent-rgb), 0.15)' : 'transparent',
                      color: currentFont === font.id ? 'var(--accent)' : 'var(--text-primary)',
                      fontFamily: font.fontFamily,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textAlign: locale === 'ar' ? 'right' : 'left',
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    <span>{font.name}</span>
                    {currentFont === font.id && <Check size={14} color="var(--accent)" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switch - Desktop Only */}
          <button
            onClick={toggleLanguage}
            className="btn btn-secondary desktop-only-action"
            style={{
              padding: '0.38rem 0.55rem',
              fontSize: '0.78rem',
              borderRadius: 'var(--radius-sm)',
              minWidth: '34px'
            }}
            title={locale === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
          >
            <Languages size={15} />
            <span style={{ fontWeight: 700 }}>{locale === 'ar' ? 'EN' : 'ع'}</span>
          </button>

          {/* Theme Switch - Visible on Desktop and Mobile */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary"
            style={{
              padding: '0.38rem 0.55rem',
              borderRadius: 'var(--radius-sm)',
              minWidth: '34px'
            }}
            title={theme === 'dark' ? (locale === 'ar' ? 'الوضع النهاري' : 'Light Mode') : (locale === 'ar' ? 'الوضع الليلي' : 'Dark Mode')}
          >
            {theme === 'dark' ? <Sun size={15} color="#FBBF24" /> : <Moon size={15} color="#6366F1" />}
          </button>

          {/* Admin CMS Trigger - Desktop Only */}
          <button
            onClick={onOpenAdmin}
            className={`btn ${isAdmin ? 'btn-primary' : 'btn-secondary'} desktop-only-action`}
            style={{
              padding: '0.38rem 0.55rem',
              borderRadius: 'var(--radius-sm)',
              position: 'relative',
              minWidth: '34px'
            }}
            title={isAdmin ? (locale === 'ar' ? 'لوحة التحكم (نشطة)' : 'Dashboard (Active)') : (locale === 'ar' ? 'دخول لوحة الإدارة' : 'Admin Login')}
          >
            <Lock size={15} />
            {isAdmin && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '7px',
                  height: '7px',
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
              padding: '0.38rem 0.55rem',
              borderRadius: 'var(--radius-sm)',
              minWidth: '34px'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer - Comprehensive & Intuitive */}
      {mobileMenuOpen && (
        <div 
          style={{
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1.25rem 1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            boxShadow: 'var(--shadow-lg)',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.96rem',
                  fontWeight: 600,
                  padding: '0.65rem 0.25rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{link.label}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>›</span>
              </a>
            ))}
          </div>

          {/* Transferred Mobile Options: Language, Font, Admin */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.65rem', 
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border-hover)' 
            }}
          >
            {/* Language Selector in Drawer */}
            <button
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="btn btn-secondary"
              style={{
                width: '100%',
                justifyContent: 'space-between',
                padding: '0.65rem 1rem',
                fontSize: '0.88rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Languages size={17} color="var(--accent)" />
                <span>{locale === 'ar' ? 'لغة الموقع' : 'Language'}</span>
              </div>
              <span className="badge" style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--accent)', fontWeight: 700 }}>
                {locale === 'ar' ? 'العربية (تحويل إلى English)' : 'English (Switch to العربية)'}
              </span>
            </button>

            {/* Font Selector in Drawer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, padding: '0 0.25rem' }}>
                <Type size={15} color="var(--accent)" />
                <span>{locale === 'ar' ? 'خط العرض الافتراضي:' : 'Display Font:'}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.35rem' }}>
                {AVAILABLE_FONTS.slice(0, 6).map((font) => (
                  <button
                    key={font.id}
                    onClick={() => {
                      setFont(font.id);
                    }}
                    style={{
                      padding: '0.45rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: currentFont === font.id ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                      backgroundColor: currentFont === font.id ? 'rgba(var(--accent-rgb), 0.15)' : 'var(--bg-elevated)',
                      color: currentFont === font.id ? 'var(--accent)' : 'var(--text-primary)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontFamily: font.fontFamily
                    }}
                  >
                    {font.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin CMS Trigger in Drawer */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className={`btn ${isAdmin ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.7rem 1rem',
                fontSize: '0.9rem',
                gap: '0.5rem',
                marginTop: '0.25rem'
              }}
            >
              <Lock size={16} />
              <span>{isAdmin ? (locale === 'ar' ? 'لوحة الإدارة والتحكم (نشطة)' : 'Dashboard (Active)') : (locale === 'ar' ? 'تسجيل دخول لوحة الإدارة' : 'Admin Login')}</span>
            </button>

            {/* Download CV Action */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCV();
              }}
              className="btn btn-outline"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.65rem 1rem',
                fontSize: '0.88rem',
                gap: '0.5rem'
              }}
            >
              <FileText size={16} />
              <span>{locale === 'ar' ? 'فتح وتحميل السيرة الذاتية (CV)' : 'View & Download CV'}</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .desktop-only-action {
          display: none !important;
        }
        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .desktop-only-action {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
};
