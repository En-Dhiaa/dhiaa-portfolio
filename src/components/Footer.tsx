import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MessageSquare, ArrowUp, Eye, Users } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { FacebookIcon, InstagramIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const { locale, data, visitorCount } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{
        backgroundColor: 'var(--bg-main)',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '3.5rem',
        paddingBottom: '2rem'
      }}
    >
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          {/* Identity Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <img 
                src={data.avatarImage} 
                alt={data.profile.displayName[locale]} 
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--accent)'
                }}
              />
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                  {data.profile.name[locale]}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--accent)', fontWeight: 600 }}>
                  {data.profile.title[locale]}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {data.profile.shortBio[locale]}
            </p>

            {/* Social Icons Row */}
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
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
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              {locale === 'ar' ? 'أقسام الموقع' : 'Navigation'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.84rem' }}>
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

          {/* Live Visitor Counter & Site Stats Column */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              {locale === 'ar' ? 'إحصائيات وزوار الموقع' : 'Site Visits & Status'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              
              {/* Elegant Visitor Counter Widget */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-hover)',
                  width: 'fit-content'
                }}
              >
                <div 
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(var(--accent-rgb), 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent)'
                  }}
                >
                  <Eye size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {locale === 'ar' ? 'إجمالي زيارات الموقع' : 'Total Site Visitors'}
                  </div>
                  <div 
                    style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 900, 
                      color: 'var(--text-primary)', 
                      letterSpacing: '0.04em' 
                    }}
                    dir="ltr"
                  >
                    {visitorCount.toLocaleString()}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>
                    {locale === 'ar' ? 'المقر:' : 'Location:'}
                  </strong>{' '}
                  {data.profile.location[locale]}
                </div>
                <div style={{ marginTop: '0.3rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>
                    {locale === 'ar' ? 'المؤهل:' : 'Degree:'}
                  </strong>{' '}
                  {locale === 'ar' ? 'بكالوريوس IT — جامعة الحكمة' : 'B.S. IT — Al-Hikma Univ.'}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div 
          style={{
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {currentYear} {data.profile.name[locale]}. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>
              {locale === 'ar' ? 'صُمم وبُرمج بأعلى معايير الويب الحديثة' : 'Engineered with Modern Web Standards'}
            </span>
            <button
              onClick={scrollToTop}
              className="btn btn-secondary"
              style={{
                padding: '0.35rem 0.55rem',
                borderRadius: 'var(--radius-sm)'
              }}
              aria-label="Back to top"
              title={locale === 'ar' ? 'الرجوع للأعلى' : 'Back to top'}
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
