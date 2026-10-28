import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { DesignItem } from '../types';
import designsDataRaw from '../data/designsData.json';
import { 
  Palette, 
  Eye, 
  X, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Image as ImageIcon,
  Download,
  Filter
} from 'lucide-react';

export const DesignGallery: React.FC = () => {
  const { locale, data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeDesign, setActiveDesign] = useState<DesignItem | null>(null);

  const designs: DesignItem[] = (data.designs && data.designs.length > 0) 
    ? (data.designs as DesignItem[]) 
    : (designsDataRaw as unknown as DesignItem[]);

  const categories = [
    { id: 'all', label: locale === 'ar' ? 'جميع التصاميم' : 'All Works' },
    { id: 'posters', label: locale === 'ar' ? 'بوسترات وإعلانات' : 'Posters & Ads' },
    { id: 'uiux', label: locale === 'ar' ? 'واجهات UI/UX' : 'UI/UX Concepts' },
    { id: 'branding', label: locale === 'ar' ? 'هويات وبصريات' : 'Branding & Media' },
  ];

  const filteredDesigns = designs.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="designs" style={{ padding: '5.5rem 0', backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">
            <Palette size={14} />
            <span>{locale === 'ar' ? 'معرض التصاميم والهوية البصرية' : 'Creative Design Showcase'}</span>
          </span>
          <h2 className="section-title">
            {locale === 'ar' ? 'أعمالي في التصاميم الجرافيكية والواجهات' : 'Graphic Design, Branding & Visual Art'}
          </h2>
          <p className="section-subtitle">
            {locale === 'ar' 
              ? 'مجموعة مختارة من التصاميم الإعلانية المتقدمة، بوسترات المنتجات، وهوية الوسائط الرقمية المنفذة بأعلى معايير الإبداع.'
              : 'Curated selection of commercial advertising posters, brand identities, and mobile UI concepts.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '2.5rem'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: '0.45rem 1.1rem',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Designs Grid - Mobile Overflow Free */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '1.75rem'
          }}
        >
          {filteredDesigns.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-surface)'
              }}
              onClick={() => setActiveDesign(item)}
            >
              {/* Thumbnail Container */}
              <div 
                style={{ 
                  position: 'relative', 
                  width: '100%', 
                  aspectRatio: '4 / 3', 
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-elevated)'
                }}
              >
                <img 
                  src={item.thumbImage} 
                  alt={item.title[locale]} 
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
                
                {/* Category Badge Overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: locale === 'ar' ? '10px' : 'auto',
                    left: locale === 'ar' ? 'auto' : '10px',
                    backgroundColor: 'rgba(16, 20, 29, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--text-primary)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  {item.category === 'posters' 
                    ? (locale === 'ar' ? 'بوستر إعلاني' : 'Poster') 
                    : item.category === 'uiux' 
                    ? (locale === 'ar' ? 'واجهات UI/UX' : 'UI Screen') 
                    : (locale === 'ar' ? 'هوية بصرية' : 'Branding')}
                </div>

                {/* View Overlay Icon */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: locale === 'ar' ? '10px' : 'auto',
                    right: locale === 'ar' ? 'auto' : '10px',
                    backgroundColor: 'rgba(var(--accent-rgb), 0.9)',
                    color: '#FFFFFF',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <Eye size={16} />
                </div>
              </div>

              {/* Card Meta Content */}
              <div style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                  {item.title[locale]}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 }}>
                  {item.desc[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Lightbox Modal */}
      {activeDesign && (
        <div
          className="no-print"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(12px)',
            zIndex: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem'
          }}
          onClick={() => setActiveDesign(null)}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '820px',
              maxHeight: '92vh',
              overflowY: 'auto',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-hover)',
              padding: '1.5rem',
              position: 'relative',
              borderRadius: 'var(--radius-lg)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '1rem',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.75rem'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {activeDesign.title[locale]}
                </h3>
                <span className="badge" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.15)', color: 'var(--accent)', marginTop: '0.25rem' }}>
                  {activeDesign.category === 'posters' ? 'بوستر إعلاني' : activeDesign.category === 'uiux' ? 'واجهات UI/UX' : 'هوية بصرية'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <a
                  href={activeDesign.fullImage}
                  download
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}
                  title="تحميل التصميم"
                >
                  <Download size={14} />
                  <span>{locale === 'ar' ? 'تحميل الصورة' : 'Download'}</span>
                </a>
                <button
                  onClick={() => setActiveDesign(null)}
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem', borderRadius: '50%' }}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* High-Res Image Display */}
            <div 
              style={{
                width: '100%',
                maxHeight: '65vh',
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}
            >
              <img 
                src={activeDesign.fullImage} 
                alt={activeDesign.title[locale]} 
                style={{
                  maxWidth: '100%',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                  borderRadius: 'var(--radius-md)'
                }}
              />
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              {activeDesign.desc[locale]}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
