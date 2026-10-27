import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ArrowRight, 
  ArrowLeft,
  Download, 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  FolderGit2, 
  MapPin, 
  Award,
  Layers,
  ChevronDown,
  Mail,
  MessageSquare
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { FacebookIcon, InstagramIcon } from './SocialIcons';

interface HeroProps {
  onOpenCV: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCV }) => {
  const { locale, data } = usePortfolio();
  const [specialtyIndex, setSpecialtyIndex] = useState(0);

  const specialties = data.profile.specialties[locale];

  useEffect(() => {
    const timer = setInterval(() => {
      setSpecialtyIndex((prev) => (prev + 1) % specialties.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [specialties.length]);

  const ArrowIcon = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section 
      style={{
        position: 'relative',
        paddingTop: '5.5rem',
        paddingBottom: '3rem',
        overflow: 'hidden',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Background Subtle Gradient Blobs */}
      <div 
        style={{
          position: 'absolute',
          top: '-15%',
          right: locale === 'ar' ? 'auto' : '-10%',
          left: locale === 'ar' ? '-10%' : 'auto',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '5%',
          right: locale === 'ar' ? '5%' : 'auto',
          left: locale === 'ar' ? 'auto' : '5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div 
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            alignItems: 'center',
            gap: '2.5rem'
          }}
        >
          
          {/* Text Introduction Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            
            {/* Status Pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', width: 'fit-content' }}>
              <span className="section-tag">
                <Sparkles size={13} />
                <span>{locale === 'ar' ? 'الموقع المهني والملف المعتمد' : 'Official Professional Portfolio'}</span>
              </span>
            </div>

            {/* Main Name & Title */}
            <div>
              <h1 
                style={{
                  fontSize: 'clamp(1.75rem, 3.8vw, 2.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.25,
                  marginBottom: '0.45rem',
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)'
                }}
              >
                {data.profile.name[locale]}
              </h1>
              
              <div 
                className="gradient-text"
                style={{
                  fontSize: 'clamp(0.98rem, 2vw, 1.25rem)',
                  fontWeight: 700,
                  lineHeight: 1.35
                }}
              >
                {data.profile.title[locale]}
              </div>
            </div>

            {/* Dynamic Rotating Specialty Badge */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.5rem 0.95rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                width: 'fit-content',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                transition: 'all 0.3s ease'
              }}
            >
              <Layers size={16} color="var(--accent)" />
              <span style={{ color: 'var(--text-muted)' }}>
                {locale === 'ar' ? 'التخصص النشط:' : 'Specialty:'}
              </span>
              <span 
                key={specialtyIndex}
                style={{ 
                  color: 'var(--accent)', 
                  fontWeight: 700,
                  animation: 'fadeIn 0.4s ease'
                }}
              >
                {specialties[specialtyIndex]}
              </span>
            </div>

            {/* Short Bio */}
            <p 
              style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: '560px'
              }}
            >
              {data.profile.shortBio[locale]}
            </p>

            {/* Location & Contact Meta */}
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={15} color="var(--accent)" />
                <span>{data.profile.location[locale]}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={15} color="#10B981" />
                <span>{locale === 'ar' ? 'متاح للتوظيف والتعاقد' : 'Open for Opportunities'}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div 
              className="hero-cta"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.65rem',
                paddingTop: '0.35rem'
              }}
            >
              <a href="#projects" className="btn btn-primary">
                <span>{locale === 'ar' ? 'استكشف أعمالي' : 'Explore My Work'}</span>
                <ArrowIcon size={16} />
              </a>

              <button onClick={onOpenCV} className="btn btn-secondary">
                <Download size={16} />
                <span>{locale === 'ar' ? 'تحميل السيرة الذاتية' : 'Download CV'}</span>
              </button>

              <a href="#contact" className="btn btn-outline">
                <span>{locale === 'ar' ? 'تواصل معي' : 'Contact Me'}</span>
              </a>
            </div>

            {/* Quick Social Icons Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', paddingTop: '0.2rem' }}>
              <a
                href={data.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={`https://wa.me/${data.profile.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <MessageSquare size={16} color="#10B981" />
              </a>
              <a
                href={data.profile.facebook || 'https://facebook.com/eng.dhiaa.alhmiri'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}
                aria-label="Facebook Profile"
                title="Facebook"
              >
                <FacebookIcon size={16} style={{ color: '#1877F2' }} />
              </a>
              <a
                href={data.profile.instagram || 'https://instagram.com/en_dhiaa'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}
                aria-label="Instagram Profile"
                title="Instagram"
              >
                <InstagramIcon size={16} style={{ color: '#E1306C' }} />
              </a>
              <a
                href={`mailto:${data.profile.email}`}
                className="btn btn-secondary"
                style={{ padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}
                aria-label="Email"
                title="Email"
              >
                <Mail size={16} color="var(--accent)" />
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)',
                maxWidth: '480px'
              }}
            >
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent)' }}>
                  +{data.profile.stats.yearsExperience}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'سنوات خبرة مهنية' : 'Years Experience'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  +{data.profile.stats.completedProjects}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'مشروعاً ومنصة منجزة' : 'Delivered Projects'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  +{data.profile.stats.repositoriesCount}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'مستودع كود على GitHub' : 'GitHub Repos'}
                </div>
              </div>
            </div>

          </div>

          {/* Portrait Composition Column - Clean, Theme-Aware & Natural */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              padding: '0.5rem'
            }}
          >
            {/* Visual Frame - Seamless in both dark and light modes */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                aspectRatio: '4 / 5',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '2px solid var(--border-hover)',
                backgroundColor: 'var(--bg-elevated)'
              }}
            >
              {/* Authentic Subject Portrait - Clean & Crisp */}
              <img 
                src={data.heroImage} 
                alt={data.profile.name[locale]}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block'
                }} 
              />

              {/* Verified Badge Overlay (Top Corner) */}
              <div 
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: locale === 'ar' ? '1rem' : 'auto',
                  left: locale === 'ar' ? 'auto' : '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--glass-bg)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Award size={14} color="#FBBF24" />
                <span>{locale === 'ar' ? 'مهندس IT معتمد' : 'Verified IT Engineer'}</span>
              </div>
            </div>

            {/* Floating Card 1: Experience & Dev */}
            <div 
              className="floating-anim"
              style={{
                position: 'absolute',
                bottom: '8px',
                left: locale === 'ar' ? '-10px' : 'auto',
                right: locale === 'ar' ? 'auto' : '-10px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.7rem 1.05rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-hover)',
                boxShadow: 'var(--shadow-md)',
                zIndex: 2,
                maxWidth: '220px'
              }}
            >
              <div 
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '9px',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  flexShrink: 0
                }}
              >
                <Briefcase size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  {locale === 'ar' ? 'تطوير Flutter وويب' : 'Flutter & Web Dev'}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'معمارية برمجية نظيفة' : 'Clean Architecture'}
                </div>
              </div>
            </div>

            {/* Floating Card 2: GitHub & Code */}
            <div 
              style={{
                position: 'absolute',
                top: '25px',
                right: locale === 'ar' ? '-15px' : 'auto',
                left: locale === 'ar' ? 'auto' : '-15px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.55rem 0.95rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                zIndex: 2
              }}
            >
              <FolderGit2 size={16} color="var(--accent)" />
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                github.com/En-Dhiaa
              </div>
            </div>

          </div>

        </div>

        {/* Scroll Indicator */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '2rem'
          }}
        >
          <a 
            href="#about"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '0.78rem',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <span>{locale === 'ar' ? 'اكتشف المزيد' : 'Scroll Down'}</span>
            <ChevronDown size={16} className="floating-anim" />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
