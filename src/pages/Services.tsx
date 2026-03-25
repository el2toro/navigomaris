import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../hooks/useCMS';
import { ArrowRight } from 'lucide-react';

export default function Services() {
  const { content, t } = useCMS();

  return (
    <>
      <div className="page-hero">
        <img className="page-hero__bg" src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80" alt="" />
        <div className="page-hero__overlay" />
        <div className="container page-hero__content">
          <div className="section-label light">{t({ en: 'What We Do', it: 'Cosa Facciamo' })}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,6rem)', color: 'white', lineHeight: 0.95, letterSpacing: '0.03em' }}>
            {t({ en: 'Our Services', it: 'I Nostri Servizi' })}
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gap: 64 }}>
            {content.services.map((service, i) => (
              <div key={service.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', direction: i % 2 === 1 ? 'rtl' : 'ltr' }}>
                <div style={{ direction: 'ltr', position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
                  <img src={service.heroImage} alt={t(service.title)} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 20, left: 20, width: 56, height: 56, borderRadius: '50%', background: service.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                    {service.icon === 'anchor' ? '⚓' : service.icon === 'mountain' ? '🧗' : service.icon === 'building' ? '🏗️' : '🔥'}
                  </div>
                </div>
                <div style={{ direction: 'ltr' }}>
                  <div className="section-label">{t({ en: 'Service', it: 'Servizio' })}</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--navy)', lineHeight: 1, letterSpacing: '0.02em', marginBottom: 16 }}>
                    {t(service.title)}
                  </h2>
                  <div className="divider" />
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 24 }}>{t(service.fullDesc)}</p>
                  <div style={{ marginBottom: 24 }}>
                    <h4 style={{ fontFamily: 'var(--font-condensed)', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 12 }}>
                      {t({ en: 'Capabilities', it: 'Capacità' })}
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {service.capabilities.map((cap, j) => (
                        <span key={j} style={{ padding: '6px 14px', background: 'var(--off-white)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-condensed)', fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>
                          {t(cap)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link to={`/services/${service.slug}`} className="btn btn-primary" style={{ background: service.color, borderColor: service.color }}>
                    {t({ en: 'Learn More', it: 'Scopri di Più' })} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
