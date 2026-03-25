import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCMS } from '../../hooks/useCMS';
import { ArrowRight, Check, ArrowLeft } from 'lucide-react';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { content, t } = useCMS();
  const [activeImage, setActiveImage] = useState(0);

  const service = content.services.find(s => s.slug === slug);

  if (!service) {
    return (
      <div style={{ padding: '200px 0', textAlign: 'center' }}>
        <h2>Service not found</h2>
        <Link to="/services" className="btn btn-primary" style={{ marginTop: 24 }}>Back to Services</Link>
      </div>
    );
  }

  const catColors: Record<string, string> = {
    naval: 'badge-naval', rope: 'badge-rope', construction: 'badge-construction', welding: 'badge-welding'
  };

  const relatedProjects = content.projects.filter(p => p.serviceCategory === service.id);

  return (
    <>
      {/* Hero */}
      <div className="page-hero" style={{ height: '60vh' }}>
        <img className="page-hero__bg" src={service.heroImage} alt={t(service.title)} />
        <div className="page-hero__overlay" />
        <div className="container page-hero__content">
          <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-condensed)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 16, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'white')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
            <ArrowLeft size={14} /> {t({ en: 'All Services', it: 'Tutti i Servizi' })}
          </Link>
          <div className="section-label light">{t({ en: 'Service Detail', it: 'Dettaglio Servizio' })}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', color: 'white', lineHeight: 0.95, letterSpacing: '0.03em' }}>
            {t(service.title)}
          </h1>
        </div>
      </div>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 80, alignItems: 'start' }}>
            {/* Left */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--navy)', marginBottom: 16, letterSpacing: '0.02em' }}>
                {t({ en: 'Overview', it: 'Panoramica' })}
              </h2>
              <div className="divider" style={{ background: service.color }} />
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: 40 }}>
                {t(service.fullDesc)}
              </p>

              {/* Benefits */}
              <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 20 }}>
                {t({ en: 'Key Benefits', it: 'Benefici Principali' })}
              </h3>
              <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
                {service.benefits.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: service.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={14} color="white" />
                    </div>
                    <span style={{ fontWeight: 500, color: 'var(--navy)' }}>{t(b)}</span>
                  </div>
                ))}
              </div>

              {/* Capabilities */}
              <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 16 }}>
                {t({ en: 'Capabilities', it: 'Capacità' })}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {service.capabilities.map((cap, i) => (
                  <span key={i} style={{ padding: '8px 16px', background: 'var(--off-white)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-condensed)', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--navy)', border: `1px solid transparent`, transition: 'var(--transition)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = service.color; e.currentTarget.style.color = service.color; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'var(--navy)'; }}>
                    {t(cap)}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: 40 }}>
                <Link to="/contact" className="btn btn-primary" style={{ background: service.color }}>
                  {t({ en: 'Request This Service', it: 'Richiedi Questo Servizio' })} <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right — Image gallery */}
            <div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 12, position: 'relative', aspectRatio: '16/10' }}>
                <img src={service.images[activeImage] || service.heroImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {service.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} style={{ padding: 0, border: `2px solid ${i === activeImage ? service.color : 'transparent'}`, borderRadius: 'var(--radius)', overflow: 'hidden', cursor: 'pointer', aspectRatio: '4/3' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="section" style={{ background: 'var(--off-white)' }}>
          <div className="container">
            <div className="section-label">{t({ en: 'Case Studies', it: 'Casi Studio' })}</div>
            <h2 className="section-title" style={{ marginBottom: 40 }}>{t({ en: 'Related Projects', it: 'Progetti Correlati' })}</h2>
            <div className="grid-3">
              {relatedProjects.map(project => (
                <div key={project.id} className="card">
                  <div style={{ height: 200, overflow: 'hidden' }}>
                    <img src={project.images[0]} alt={t(project.title)} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                  </div>
                  <div style={{ padding: '20px 24px' }}>
                    <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>{t(project.title)}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12 }}>{t(project.description).slice(0, 100)}…</p>
                    <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>📍 {project.location} · {project.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
