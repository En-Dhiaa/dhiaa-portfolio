import React from 'react';
import { ProjectItem } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ExternalLink, CheckCircle2, Tag, Calendar, Layers } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { locale } = usePortfolio();

  if (!project) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
      onClick={onClose}
    >
      <div 
        className="card"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-surface)',
          padding: '2rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-secondary"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: locale === 'ar' ? 'auto' : '1.25rem',
            left: locale === 'ar' ? '1.25rem' : 'auto',
            padding: '0.45rem',
            borderRadius: '50%'
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem', paddingRight: locale === 'ar' ? '0' : '2.5rem', paddingLeft: locale === 'ar' ? '2.5rem' : '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <span className="badge" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.15)', color: 'var(--accent)' }}>
              {project.categoryLabel[locale]}
            </span>
            <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
              {project.status}
            </span>
          </div>

          <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {project.title[locale]}
          </h3>
        </div>

        {/* Cover Image */}
        <div 
          style={{
            width: '100%',
            height: '240px',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <img 
            src={project.coverImage} 
            alt={project.title[locale]}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.65rem', color: 'var(--text-primary)' }}>
            {locale === 'ar' ? 'وصف المشروع والمعمارية' : 'Project Overview & Architecture'}
          </h4>
          <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {project.description[locale]}
          </p>
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights[locale].length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              {locale === 'ar' ? 'أهم المميزات المطبقة' : 'Key Engineering Features'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.highlights[locale].map((hl, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="var(--accent)" flex-shrink="0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            {locale === 'ar' ? 'التقنيات والأدوات المستخدمة' : 'Technologies & Stack'}
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tags.map((tag, i) => (
              <span key={i} className="badge">
                <Tag size={13} />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ flex: 1, minWidth: '200px' }}
            >
              <GithubIcon size={18} />
              <span>{locale === 'ar' ? 'عرض الكود على GitHub' : 'View Code on GitHub'}</span>
              <ExternalLink size={15} />
            </a>
          )}

          {project.demoUrl && (
            <a 
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <ExternalLink size={18} />
              <span>{locale === 'ar' ? 'معاينة حية' : 'Live Demo'}</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
