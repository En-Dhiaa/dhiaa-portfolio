import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MessageSquare } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export const FacebookIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({ 
  size = 20, 
  className, 
  style 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
};

export const InstagramIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({ 
  size = 20, 
  className, 
  style 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
};

interface SocialBarProps {
  iconSize?: number;
  gap?: string;
  style?: React.CSSProperties;
}

export const SocialBar: React.FC<SocialBarProps> = ({ 
  iconSize = 20, 
  gap = '0.75rem',
  style 
}) => {
  const { data } = usePortfolio();

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '42px',
    minHeight: '42px',
    padding: '0.55rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-primary)',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    boxShadow: 'var(--shadow-sm)'
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap, 
        ...style 
      }}
    >
      {/* GitHub */}
      <a
        href={data.profile.github}
        target="_blank"
        rel="noopener noreferrer"
        style={btnStyle}
        className="social-btn"
        aria-label="GitHub Profile"
        title="GitHub"
      >
        <GithubIcon size={iconSize} />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${data.profile.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        style={btnStyle}
        className="social-btn"
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        <MessageSquare size={iconSize} color="#10B981" />
      </a>

      {/* Facebook */}
      <a
        href={data.profile.facebook || 'https://www.facebook.com/share/14tD7vqteaR/'}
        target="_blank"
        rel="noopener noreferrer"
        style={btnStyle}
        className="social-btn"
        aria-label="Facebook Profile"
        title="Facebook"
      >
        <FacebookIcon size={iconSize} style={{ color: '#1877F2' }} />
      </a>

      {/* Instagram */}
      <a
        href={data.profile.instagram || 'https://www.instagram.com/eng.d.hm?obrf=b2lpeXJwb3cxZmwz'}
        target="_blank"
        rel="noopener noreferrer"
        style={btnStyle}
        className="social-btn"
        aria-label="Instagram Profile"
        title="Instagram"
      >
        <InstagramIcon size={iconSize} style={{ color: '#E1306C' }} />
      </a>

      {/* Email */}
      <a
        href={`mailto:${data.profile.email}`}
        style={btnStyle}
        className="social-btn"
        aria-label="Email"
        title="Email"
      >
        <Mail size={iconSize} color="var(--accent)" />
      </a>
    </div>
  );
};
