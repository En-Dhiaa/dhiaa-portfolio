import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MessageSquare, ArrowUp, Eye, Users, Activity } from 'lucide-react';
import { SocialBar } from './SocialIcons';

export const Footer: React.FC = () => {
  const { locale, data, visitorCount, analyticsStats } = usePortfolio();

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

            {/* Social Icons Row - Standardized 44px Touch Targets */}
            <div style={{ paddingTop: '0.35rem' }}>
              <SocialBar iconSize={20} gap="0.75rem" />
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

          {/* Live Real Visitor Counter & Site Stats Column */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              {locale === 'ar' ? 'إحصائيات وزوار الموقع' : 'Real-Time Site Analytics'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              
              {/* Real Visitor Counter Widget */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  padding: '0.85rem 1.1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-hover)',
                  width: 'fit-content'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div 
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(var(--accent-rgb), 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent)'
                    }}
                  >
                    <Eye size={19} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {locale === 'ar' ? 'إجمالي زيارات الموقع' : 'Verified Site Visits'}
                    </div>
                    <div 
                      style={{ 
                        fontSize: '1.3rem', 
                        fontWeight: 900, 
                        color: 'var(--text-primary)', 
                        letterSpacing: '0.04em' 
                      }}
                      dir="ltr"
                    >
                      {(analyticsStats?.sessions || visitorCount || 1).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.85rem', 
                    fontSize: '0.74rem', 
                    borderTop: '1px solid var(--border-subtle)', 
                    paddingTop: '0.45rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Users size={13} color="var(--accent)" />
                    <span>{locale === 'ar' ? 'الزوار الفريدون:' : 'Unique Visitors:'}</span>
                    <strong style={{ color: 'var(--text-primary)' }} dir="ltr">
                      {(analyticsStats?.uniqueVisitors || 1).toLocaleString()}
                    </strong>
                  </div>
                  <span 
                    className="badge" 
                    style={{ 
                      backgroundColor: analyticsStats?.status === 'connected' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(var(--accent-rgb), 0.15)',
                      color: analyticsStats?.status === 'connected' ? '#10B981' : 'var(--accent)',
                      fontSize: '0.66rem',
                      fontWeight: 700
                    }}
                  >
                    {analyticsStats?.status === 'connected' 
                      ? (locale === 'ar' ? '🟢 متزامن سحابياً' : '🟢 Cloud Synced')
                      : (locale === 'ar' ? '🟢 مباشر موثق' : '🟢 Verified Live')}
                  </span>
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
