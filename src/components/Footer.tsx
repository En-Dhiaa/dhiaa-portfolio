import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MessageSquare, ArrowUp, Heart, Shield } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export const Footer: React.FC = () => {
  const { locale, data } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{
        backgroundColor: 'var(--bg-main)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '4rem',
        paddingBottom: '2.5rem'
      }}
    >
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          {/* Identity Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img 
                src={data.avatarImage} 
                alt={data.profile.displayName[locale]} 
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--accent)'
                }}
              />
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  {data.profile.name[locale]}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
                  {data.profile.title[locale]}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              {data.profile.shortBio[locale]}
            </p>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <a 
                href={data.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>

              <a 
                href={`https://wa.me/${data.profile.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
                aria-label="WhatsApp"
              >
                <MessageSquare size={18} color="#10B981" />
              </a>

              <a 
                href={`mailto:${data.profile.email}`}
                className="btn btn-secondary"
                style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
                aria-label="Email"
              >
                <Mail size={18} color="var(--accent)" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              {locale === 'ar' ? 'أقسام الموقع' : 'Navigation'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.92rem' }}>
              <a href="#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                {locale === 'ar' ? 'السيرة الذاتية وعن المهندس' : 'Professional Biography'}
              </a>
              <a href="#projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                {locale === 'ar' ? 'معرض المشاريع والأكواد' : 'Projects & Repositories'}
              </a>
              <a href="#experience" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                {locale === 'ar' ? 'المسار المهني والخبرات' : 'Career Timeline'}
              </a>
              <a href="#education" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                {locale === 'ar' ? 'المؤهلات والشهادات المعتمدة' : 'Education & Credentials'}
              </a>
              <a href="#contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                {locale === 'ar' ? 'قنوات التواصل المباشرة' : 'Direct Contact Channels'}
              </a>
            </div>
          </div>

          {/* Academic & Professional Credibility Column */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              {locale === 'ar' ? 'الاعتمادات والمقر' : 'Location & Credentials'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>
                  {locale === 'ar' ? 'المقر الدائم:' : 'Location:'}
                </strong>{' '}
                {data.profile.location[locale]}
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>
                  {locale === 'ar' ? 'المؤهل الأكاديمي:' : 'Degree:'}
                </strong>{' '}
                {locale === 'ar' ? 'بكالوريوس تقنية معلومات — جامعة الحكمة' : 'B.S. Information Technology — Al-Hikma Univ.'}
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>
                  {locale === 'ar' ? 'اللغات:' : 'Languages:'}
                </strong>{' '}
                {locale === 'ar' ? 'العربية (الأم)، الإنجليزية (طلاقة كاملة)' : 'Arabic (Native), English (Fluent)'}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div 
          style={{
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {currentYear} {data.profile.name[locale]}. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>
              {locale === 'ar' ? 'صُمم وبُرمج بأعلى معايير الويب' : 'Engineered with Modern Web Standards'}
            </span>
            <button
              onClick={scrollToTop}
              className="btn btn-secondary"
              style={{
                padding: '0.4rem 0.65rem',
                borderRadius: 'var(--radius-sm)'
              }}
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
