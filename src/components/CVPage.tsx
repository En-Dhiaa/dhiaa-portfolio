import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  Printer, 
  Languages, 
  FileText, 
  Eye, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Locale } from '../types';

interface CVPageProps {
  onBack: () => void;
}

export const CVPage: React.FC<CVPageProps> = ({ onBack }) => {
  const { data, locale: initialLocale, theme, setTheme } = usePortfolio();
  const [cvLocale, setCvLocale] = useState<Locale>(initialLocale);
  const [viewMode, setViewMode] = useState<'interactive' | 'pdf'>('interactive');
  const [pdfError, setPdfError] = useState(false);

  const ArrowIcon = cvLocale === 'ar' ? ArrowRight : ArrowLeft;
  const pdfUrl = './docs/Dhiaa-Alhmiri-CV.pdf';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-main)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Sticky Top Header Navigation */}
      <header 
        className="glass-nav no-print"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          padding: '0.85rem 1rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onBack}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', gap: '0.4rem' }}
            title={cvLocale === 'ar' ? 'الرجوع للموقع الرئيسي' : 'Back to Portfolio'}
          >
            <ArrowIcon size={16} />
            <span>{cvLocale === 'ar' ? 'العودة للموقع' : 'Back to Portfolio'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <FileText size={18} color="var(--accent)" />
            <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>
              {cvLocale === 'ar' ? 'السيرة الذاتية المهنية' : 'Professional CV'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          
          {/* Mode Switcher: Interactive vs PDF */}
          <div 
            style={{ 
              display: 'inline-flex', 
              backgroundColor: 'var(--bg-elevated)', 
              borderRadius: 'var(--radius-sm)', 
              padding: '0.2rem',
              border: '1px solid var(--border-subtle)' 
            }}
          >
            <button
              onClick={() => setViewMode('interactive')}
              className="btn"
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'interactive' ? 'var(--accent)' : 'transparent',
                color: viewMode === 'interactive' ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none'
              }}
            >
              {cvLocale === 'ar' ? 'العرض الرقمي' : 'Digital View'}
            </button>
            <button
              onClick={() => setViewMode('pdf')}
              className="btn"
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'pdf' ? 'var(--accent)' : 'transparent',
                color: viewMode === 'pdf' ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none'
              }}
            >
              {cvLocale === 'ar' ? 'مستند PDF' : 'PDF Document'}
            </button>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setCvLocale(cvLocale === 'ar' ? 'en' : 'ar')}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
          >
            <Languages size={15} />
            <span>{cvLocale === 'ar' ? 'English CV' : 'السيرة بالعربية'}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
            title="Print"
          >
            <Printer size={15} />
            <span className="cv-btn-text">{cvLocale === 'ar' ? 'طباعة' : 'Print'}</span>
          </button>

          {/* Real PDF Download Button */}
          <a
            href={pdfUrl}
            download="Dhiaa-Alhmiri-CV.pdf"
            className="btn btn-primary"
            style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', gap: '0.4rem', textDecoration: 'none' }}
          >
            <Download size={15} />
            <span>{cvLocale === 'ar' ? 'تنزيل PDF المعتمد' : 'Download Official PDF'}</span>
          </a>
        </div>
      </header>

      {/* Main Body */}
      <main 
        style={{
          flex: 1,
          width: '100%',
          maxWidth: '1050px',
          marginInline: 'auto',
          padding: '2rem 1.25rem 4rem'
        }}
      >
        {viewMode === 'pdf' ? (
          /* Embedded PDF Viewer Mode */
          <div 
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-hover)',
              padding: '1rem',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '1rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="#10B981" />
                <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                  {cvLocale === 'ar' ? 'مستند السيرة الذاتية الرسمي بصيغة PDF' : 'Official Verified CV Document (PDF)'}
                </span>
              </div>
              <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
              >
                <span>{cvLocale === 'ar' ? 'فتح في علامة تبويب جديدة' : 'Open in New Tab'}</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {!pdfError ? (
              <iframe
                src={pdfUrl}
                title="Dhiaa Al-Hmiri CV"
                style={{
                  width: '100%',
                  height: '82vh',
                  minHeight: '650px',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#FFFFFF'
                }}
                onError={() => setPdfError(true)}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  {cvLocale === 'ar' 
                    ? 'متصفحك لا يدعم معاينة ملفات PDF مباشرة، يمكنك تنزيل الملف بسهولة:' 
                    : 'Your browser cannot preview PDFs directly. You can download the file below:'}
                </p>
                <a href={pdfUrl} download className="btn btn-primary">
                  <Download size={16} />
                  <span>{cvLocale === 'ar' ? 'تنزيل ملف السيرة الذاتية' : 'Download CV File'}</span>
                </a>
              </div>
            )}
          </div>
        ) : (
          /* Interactive Full-Page Document View */
          <article 
            className="card cv-printable"
            dir={cvLocale === 'ar' ? 'rtl' : 'ltr'}
            style={{
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-lg)',
              fontFamily: cvLocale === 'ar' ? 'var(--font-arabic)' : 'var(--font-english)'
            }}
          >
            {/* Header Identity Row */}
            <header 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem',
                borderBottom: '2px solid var(--accent)',
                paddingBottom: '1.75rem',
                marginBottom: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <img 
                  src={data.avatarImage} 
                  alt={data.profile.name[cvLocale]}
                  style={{
                    width: '85px',
                    height: '85px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--accent)',
                    boxShadow: '0 0 16px var(--accent-glow)'
                  }} 
                />
                <div>
                  <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {data.profile.name[cvLocale]}
                  </h1>
                  <div style={{ fontSize: '1.05rem', color: 'var(--accent)', fontWeight: 700 }}>
                    {data.profile.title[cvLocale]}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {cvLocale === 'ar' ? 'بكالوريوس تقنية معلومات — جامعة الحكمة، صنعاء' : 'B.S. in Information Technology — Al-Hikma Univ.'}
                  </div>
                </div>
              </div>

              {/* Contact Meta Info */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <MapPin size={16} color="var(--accent)" />
                  <span>{data.profile.location[cvLocale]}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Phone size={16} color="var(--accent)" />
                  <span dir="ltr">{data.profile.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Mail size={16} color="var(--accent)" />
                  <span>{data.profile.email}</span>
                </div>
              </div>
            </header>

            {/* Professional Summary */}
            <section style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '0.85rem' }}>
                {cvLocale === 'ar' ? 'النبذة المهنية' : 'Professional Summary'}
              </h2>
              <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {data.profile.fullBio[cvLocale]}
              </p>
            </section>

            {/* Education & Academic Degrees */}
            <section style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
                {cvLocale === 'ar' ? 'المؤهلات الأكاديمية والشهادات' : 'Education & Certifications'}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {data.education.map((edu) => (
                  <div key={edu.id} style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {edu.degree[cvLocale]}
                      </h3>
                      <span className="badge" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.15)', color: 'var(--accent)' }}>
                        {edu.period[cvLocale]}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--accent)', fontWeight: 600, marginTop: '0.2rem' }}>
                      {edu.institution[cvLocale]}
                    </div>
                    {edu.details && (
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                        {edu.details[cvLocale]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Experience Timeline */}
            <section style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
                {cvLocale === 'ar' ? 'الخبرات المهنية والمشاريع' : 'Work Experience'}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {data.experiences.map((exp) => (
                  <div key={exp.id} style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {exp.role[cvLocale]}
                      </h3>
                      <span className="badge" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.15)', color: 'var(--accent)' }}>
                        {exp.period[cvLocale]}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--accent)', fontWeight: 600, marginTop: '0.2rem' }}>
                      {exp.organization[cvLocale]} — {exp.location[cvLocale]}
                    </div>
                    <ul style={{ paddingRight: cvLocale === 'ar' ? '1.25rem' : '0', paddingLeft: cvLocale === 'en' ? '1.25rem' : '0', marginTop: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {exp.responsibilities[cvLocale].map((res, i) => (
                        <li key={i}>{res}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills & Technologies */}
            <section>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
                {cvLocale === 'ar' ? 'المهارات التقنية والتصميمية' : 'Core Skills & Competencies'}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1rem' }}>
                {data.skills.map((cat) => (
                  <div key={cat.id} style={{ padding: '0.9rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                      {cat.title[cvLocale]}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {cat.skills.map((s, idx) => (
                        <span key={idx} className="badge" style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </article>
        )}
      </main>
    </div>
  );
};
