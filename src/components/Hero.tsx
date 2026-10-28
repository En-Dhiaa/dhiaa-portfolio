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
import { SocialBar } from './SocialIcons';

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
        paddingTop: '5rem',
        paddingBottom: '2.5rem',
        overflow: 'hidden',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Background Ambient Glows - Responsive and Smooth */}
      <div 
        className="ambient-glow-1"
        style={{
          right: locale === 'ar' ? 'auto' : '-5%',
          left: locale === 'ar' ? '-5%' : 'auto'
        }}
      />
      <div 
        className="ambient-glow-2"
        style={{
          right: locale === 'ar' ? '5%' : 'auto',
          left: locale === 'ar' ? 'auto' : '5%'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div 
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            alignItems: 'center',
            gap: '2.5rem'
          }}
        >
          
          {/* Text Introduction Column */}
          <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Status Pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', width: 'fit-content' }}>
              <span className="section-tag">
                <Sparkles size={13} />
                <span>{locale === 'ar' ? 'الموقع المهني والملف المعتمد' : 'Official Portfolio'}</span>
              </span>
            </div>

            {/* Main Name & Title with Professional Visual Alignment */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <h1 
                style={{
                  fontSize: 'clamp(1.85rem, 4vw, 2.65rem)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  margin: 0
                }}
              >
                {data.profile.name[locale]}
              </h1>
              
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.65rem',
                  minHeight: '2.2rem'
                }}
              >
                <span 
                  className="gradient-text"
                  style={{
                    fontSize: 'clamp(1.05rem, 2.2vw, 1.32rem)',
                    fontWeight: 800,
                    lineHeight: 1.3
                  }}
                >
                  {data.profile.title[locale]}
                </span>

                {/* Dynamic Rotating Specialty Badge with Smooth Slide */}
                <span 
                  key={specialtyIndex}
                  className="badge"
                  style={{ 
                    backgroundColor: 'rgba(var(--accent-rgb), 0.12)',
                    color: 'var(--accent)',
                    border: '1px solid rgba(var(--accent-rgb), 0.3)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    animation: 'slideUpSoft 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <Layers size={14} color="var(--accent)" />
                  <span>{specialties[specialtyIndex]}</span>
                </span>
              </div>
            </div>

            {/* Short Bio - Concise & Responsive */}
            <p 
              style={{
                fontSize: '0.94rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                maxWidth: '540px'
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
                paddingTop: '0.25rem'
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

            {/* Quick Social Icons Row - Accessible 44px Touch Targets */}
            <div style={{ paddingTop: '0.4rem' }}>
              <SocialBar iconSize={20} gap="0.75rem" />
            </div>

            {/* Quick Stats Grid */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                paddingTop: '1.15rem',
                borderTop: '1px solid var(--border-subtle)',
                maxWidth: '460px'
              }}
            >
              <div>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--accent)' }}>
                  +{data.profile.stats.yearsExperience}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'سنوات خبرة مهنية' : 'Years Experience'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  +{data.profile.stats.completedProjects}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'مشروعاً ومنصة منجزة' : 'Delivered Projects'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                  +{data.profile.stats.repositoriesCount}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'مستودع كود على GitHub' : 'GitHub Repos'}
                </div>
              </div>
            </div>

          </div>

          {/* Frameless Cutout Silhouette Column - Smooth & Natural */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              minHeight: '400px',
              padding: '0.5rem 0'
            }}
          >
            {/* Smooth Ambient Glow Behind Cutout Silhouette */}
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'min(300px, 75vw)',
                height: 'min(300px, 75vw)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
                filter: 'blur(25px)',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />

            {/* Seamless Cutout Portrait (From صورة مفرغة.png) */}
            <img 
              src={data.heroImage || './images/hero-cutout.webp'} 
              alt={data.profile.name[locale]}
              className="floating-anim"
              style={{
                width: 'auto',
                maxWidth: '92%',
                maxHeight: '480px',
                objectFit: 'contain',
                display: 'block',
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0 14px 24px rgba(0, 0, 0, 0.25))'
              }} 
            />

            {/* Verified Badge Overlay */}
            <div 
              style={{
                position: 'absolute',
                top: '10px',
                right: locale === 'ar' ? '5px' : 'auto',
                left: locale === 'ar' ? 'auto' : '5px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid var(--border-hover)',
                fontSize: '0.76rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
                zIndex: 3
              }}
            >
              <Award size={14} color="#FBBF24" />
              <span>{locale === 'ar' ? 'مهندس IT معتمد' : 'Verified IT Engineer'}</span>
            </div>

            {/* Floating Card 1: Experience & Dev */}
            <div 
              className="floating-anim hero-floating-card-1"
              style={{
                position: 'absolute',
                bottom: '10px',
                left: locale === 'ar' ? '5px' : 'auto',
                right: locale === 'ar' ? 'auto' : '5px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 0.95rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-hover)',
                boxShadow: 'var(--shadow-md)',
                zIndex: 3,
                maxWidth: '210px'
              }}
            >
              <div 
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '9px',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  flexShrink: 0
                }}
              >
                <Briefcase size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  {locale === 'ar' ? 'تطوير Flutter وويب' : 'Flutter & Web Dev'}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {locale === 'ar' ? 'معمارية برمجية نظيفة' : 'Clean Architecture'}
                </div>
              </div>
            </div>

            {/* Floating Card 2: GitHub & Code */}
            <div 
              className="hero-floating-card-2"
              style={{
                position: 'absolute',
                top: '55px',
                left: locale === 'ar' ? '5px' : 'auto',
                right: locale === 'ar' ? 'auto' : '5px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                zIndex: 3
              }}
            >
              <FolderGit2 size={15} color="var(--accent)" />
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-primary)' }}>
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
            paddingTop: '1.25rem'
          }}
        >
          <a 
            href="#about"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '0.76rem',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <span>{locale === 'ar' ? 'اكتشف المزيد' : 'Scroll Down'}</span>
            <ChevronDown size={15} className="floating-anim" />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes slideUpSoft {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
