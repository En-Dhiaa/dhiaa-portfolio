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
  ChevronDown
} from 'lucide-react';

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
        paddingTop: '6.5rem',
        paddingBottom: '3.5rem',
        overflow: 'hidden',
        minHeight: '92vh',
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
          width: '520px',
          height: '520px',
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
          width: '400px',
          height: '400px',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '3rem'
          }}
        >
          
          {/* Text Introduction Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            
            {/* Status Pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', width: 'fit-content' }}>
              <span className="section-tag">
                <Sparkles size={14} />
                <span>{locale === 'ar' ? 'الموقع المهني والملف الشخصي المعتمد' : 'Official Professional Portfolio'}</span>
              </span>
            </div>

            {/* Main Name & Title */}
            <div>
              <h1 
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  marginBottom: '0.6rem',
                  letterSpacing: '-0.02em'
                }}
              >
                {data.profile.name[locale]}
              </h1>
              
              <div 
                className="gradient-text"
                style={{
                  fontSize: 'clamp(1.15rem, 2.5vw, 1.55rem)',
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
                gap: '0.65rem',
                padding: '0.6rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                width: 'fit-content',
                fontSize: '0.96rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                transition: 'all 0.3s ease'
              }}
            >
              <Layers size={18} color="var(--accent)" />
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
                fontSize: '1.08rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                maxWidth: '600px'
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
                gap: '1.25rem',
                fontSize: '0.92rem',
                color: 'var(--text-muted)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={16} color="var(--accent)" />
                <span>{data.profile.location[locale]}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="#10B981" />
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
                gap: '0.85rem',
                paddingTop: '0.5rem'
              }}
            >
              <a href="#projects" className="btn btn-primary">
                <span>{locale === 'ar' ? 'استكشف أعمالي' : 'Explore My Work'}</span>
                <ArrowIcon size={18} />
              </a>

              <button onClick={onOpenCV} className="btn btn-secondary">
                <Download size={18} />
                <span>{locale === 'ar' ? 'تحميل السيرة الذاتية' : 'Download CV'}</span>
              </button>

              <a href="#contact" className="btn btn-outline">
                <span>{locale === 'ar' ? 'تواصل معي' : 'Contact Me'}</span>
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)',
                maxWidth: '540px'
              }}
            >
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--accent)' }}>
                  +{data.profile.stats.yearsExperience}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'سنوات خبرة مهنية' : 'Years Experience'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  +{data.profile.stats.completedProjects}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'مشروعاً ومنصة منجزة' : 'Delivered Projects'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  +{data.profile.stats.repositoriesCount}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'مستودع كود على GitHub' : 'GitHub Repositories'}
                </div>
              </div>
            </div>

          </div>

          {/* Portrait Composition Column */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            {/* Visual Frame & Glow */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '430px',
                aspectRatio: '4 / 5',
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '2px solid rgba(var(--accent-rgb), 0.25)',
                background: 'linear-gradient(180deg, rgba(24, 30, 41, 0.4) 0%, rgba(16, 20, 29, 0.95) 100%)'
              }}
            >
              {/* Actual Subject Portrait - Authentic with zero distortion */}
              <img 
                src={data.heroImage} 
                alt={data.profile.name[locale]}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  filter: 'contrast(1.03) brightness(1.02)'
                }} 
              />

              {/* Bottom Vignette Overlay */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, var(--bg-main) 0%, transparent 35%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Verified Badge Overlay (Top Corner) */}
              <div 
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: locale === 'ar' ? '1.25rem' : 'auto',
                  left: locale === 'ar' ? 'auto' : '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(16, 20, 29, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#FFFFFF'
                }}
              >
                <Award size={15} color="#FBBF24" />
                <span>{locale === 'ar' ? 'مهندس IT معتمد' : 'Verified IT Engineer'}</span>
              </div>
            </div>

            {/* Floating Card 1: Experience & Dev */}
            <div 
              className="floating-anim"
              style={{
                position: 'absolute',
                bottom: '15px',
                left: locale === 'ar' ? '-20px' : 'auto',
                right: locale === 'ar' ? 'auto' : '-20px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-hover)',
                boxShadow: 'var(--shadow-md)',
                zIndex: 2,
                maxWidth: '240px'
              }}
            >
              <div 
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  flexShrink: 0
                }}
              >
                <Briefcase size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  {locale === 'ar' ? 'تطوير Flutter وويب' : 'Flutter & Web Dev'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'حلول معمارية نظيفة' : 'Clean Architecture'}
                </div>
              </div>
            </div>

            {/* Floating Card 2: GitHub & Code */}
            <div 
              style={{
                position: 'absolute',
                top: '40px',
                right: locale === 'ar' ? '-25px' : 'auto',
                left: locale === 'ar' ? 'auto' : '-25px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                zIndex: 2
              }}
            >
              <FolderGit2 size={18} color="var(--accent)" />
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
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
            paddingTop: '2.5rem'
          }}
        >
          <a 
            href="#about"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.3rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '0.8rem',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <span>{locale === 'ar' ? 'اكتشف المزيد' : 'Scroll Down'}</span>
            <ChevronDown size={18} className="floating-anim" />
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
