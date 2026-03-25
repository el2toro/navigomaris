import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../hooks/useCMS';
import { ArrowRight, Anchor, Phone, Mail, ChevronRight } from 'lucide-react';

// Hero Slideshow
function Hero() {
  const { content, t } = useCMS();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % content.heroImages.length), 5000);
    return () => clearInterval(timer);
  }, [content.heroImages.length]);

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden' }}>
      <style>{`
        .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .hero-slide.active { opacity: 1; }
        .hero-slide img { width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.4) 60%, rgba(10,22,40,0.6) 100%);
        }
        .hero-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 80px;
        }
        .hero-label {
          font-family: var(--font-condensed);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: slideIn 0.8s ease 0.2s both;
        }
        .hero-label::before { content: ''; width: 40px; height: 2px; background: var(--accent); }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 8vw, 7rem);
          line-height: 0.95;
          letter-spacing: 0.03em;
          color: white;
          max-width: 800px;
          animation: slideIn 0.8s ease 0.4s both;
        }
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: rgba(255,255,255,0.75);
          max-width: 560px;
          line-height: 1.7;
          margin: 24px 0 36px;
          animation: slideIn 0.8s ease 0.6s both;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          animation: slideIn 0.8s ease 0.8s both;
        }
        .hero-indicators {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 3;
        }
        .hero-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
          border: none;
        }
        .hero-dot.active { background: var(--accent); width: 24px; border-radius: 4px; }
        .hero-scroll {
          position: absolute;
          right: 40px;
          bottom: 40px;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.5);
          font-family: var(--font-condensed);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          writing-mode: vertical-rl;
        }
        .hero-scroll::after {
          content: '';
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
        }
      `}</style>

      {content.heroImages.map((img, i) => (
        <div key={i} className={`hero-slide ${i === current ? 'active' : ''}`}>
          <img src={img} alt="" loading={i === 0 ? 'eager' : 'lazy'} />
        </div>
      ))}
      <div className="hero-overlay" />

      <div className="container hero-content">
        <div className="hero-label"><Anchor size={14} /> MarinePro Services</div>
        <h1 className="hero-title">{t(content.heroTitle)}</h1>
        <p className="hero-sub">{t(content.heroSubtitle)}</p>
        <div className="hero-actions">
          <Link to="/services" className="btn btn-primary">
            {t({ en: 'Our Services', it: 'I Nostri Servizi' })} <ArrowRight size={16} />
          </Link>
          <Link to="/projects" className="btn btn-ghost">
            {t({ en: 'View Projects', it: 'Vedi Progetti' })}
          </Link>
        </div>
      </div>

      <div className="hero-indicators">
        {content.heroImages.map((_, i) => (
          <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
        ))}
      </div>

      <div className="hero-scroll">{t({ en: 'Scroll', it: 'Scorri' })}</div>
    </section>
  );
}

// Stats bar
function StatsBar() {
  const { t } = useCMS();
  const stats = [
    { num: '20+', label: { en: 'Years Experience', it: 'Anni di Esperienza' } },
    { num: '350+', label: { en: 'Projects Completed', it: 'Progetti Completati' } },
    { num: '4', label: { en: 'Core Services', it: 'Servizi Principali' } },
    { num: '100%', label: { en: 'Safety Record', it: 'Record di Sicurezza' } },
  ];
  return (
    <div style={{ background: 'var(--navy)', padding: '48px 0' }}>
      <div className="container">
        <div className="grid-4">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{t(s.label)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Services overview
function ServicesSection() {
  const { content, t } = useCMS();
  const icons: Record<string, string> = { naval: '⚓', rope: '🧗', construction: '🏗️', welding: '🔥' };

  return (
    <section className="section" style={{ background: 'var(--off-white)' }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <div className="section-label">{t({ en: 'What We Do', it: 'Cosa Facciamo' })}</div>
          <h2 className="section-title">{t({ en: 'Our Services', it: 'I Nostri Servizi' })}</h2>
        </div>
        <div className="grid-4">
          {content.services.map(service => (
            <Link key={service.id} to={`/services/${service.slug}`} className="service-card">
              <img src={service.heroImage} alt={t(service.title)} />
              <div className="service-card__body">
                <div className="service-card__icon" style={{ background: service.color + '33', color: service.color }}>
                  <span style={{ fontSize: 20 }}>{icons[service.id]}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'white', letterSpacing: '0.03em', lineHeight: 1.1, marginBottom: 8 }}>
                  {t(service.title)}
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                  {t(service.shortDesc)}
                </p>
                <div className="service-card__arrow">
                  {t({ en: 'Learn more', it: 'Scopri di più' })} <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Featured Projects
function FeaturedProjects() {
  const { content, t } = useCMS();
  const featured = content.projects.filter(p => p.featured).slice(0, 3);
  const catColors: Record<string, string> = { naval: 'badge-naval', rope: 'badge-rope', construction: 'badge-construction', welding: 'badge-welding' };
  const catLabels: Record<string, { en: string; it: string }> = {
    naval: { en: 'Naval', it: 'Navale' }, rope: { en: 'Rope Access', it: 'Rope Access' },
    construction: { en: 'Construction', it: 'Costruzioni' }, welding: { en: 'Welding', it: 'Saldatura' }
  };

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="section-label">{t({ en: 'Our Work', it: 'Il Nostro Lavoro' })}</div>
            <h2 className="section-title">{t({ en: 'Featured Projects', it: 'Progetti in Evidenza' })}</h2>
          </div>
          <Link to="/projects" className="btn btn-outline">{t({ en: 'All Projects', it: 'Tutti i Progetti' })} <ArrowRight size={15} /></Link>
        </div>
        <div className="grid-3">
          {featured.map(project => (
            <div key={project.id} className="project-card">
              <img src={project.images[0]} alt={t(project.title)} loading="lazy" />
              <div className="project-card__always">
                <span className={`badge ${catColors[project.serviceCategory]}`}>{t(catLabels[project.serviceCategory])}</span>
              </div>
              <div className="project-card__overlay">
                <span className={`badge ${catColors[project.serviceCategory]}`} style={{ marginBottom: 8 }}>{t(catLabels[project.serviceCategory])}</span>
                <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>{t(project.title)}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{t(project.description).slice(0, 120)}…</p>
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-condensed)', fontSize: 12, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  📍 {project.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Clients
function Clients() {
  const { content, t } = useCMS();
  return (
    <section className="section-sm" style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>{t({ en: 'Trusted By', it: 'Si Fidano di Noi' })}</div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, alignItems: 'center' }}>
          {content.clients.map(client => (
            <div key={client.id} style={{
              padding: '16px 32px',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-condensed)',
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              transition: 'var(--transition)',
              cursor: 'default'
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
              {client.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA
function CTA() {
  const { t } = useCMS();
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, var(--navy-mid) 0%, var(--navy) 100%)', padding: '96px 0' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(232,160,32,0.1) 0%, transparent 60%)' }} />
      <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>{t({ en: 'Get In Touch', it: 'Contattaci' })}</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', color: 'white', letterSpacing: '0.03em', marginBottom: 20 }}>
          {t({ en: "Ready To Start\nYour Project?", it: "Pronti Ad Iniziare\nIl Tuo Progetto?" })}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 500, margin: '0 auto 40px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          {t({ en: "Our team of specialists is ready to deliver expert solutions tailored to your needs.", it: "Il nostro team di specialisti è pronto a fornire soluzioni esperte su misura per le vostre esigenze." })}
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn-primary">{t({ en: 'Request a Quote', it: 'Richiedi un Preventivo' })} <ArrowRight size={16} /></Link>
          <a href="tel:+390811234567" className="btn btn-ghost"><Phone size={16} /> +39 081 123 4567</a>
        </div>
      </div>
    </section>
  );
}

// Quick contact
function QuickContact() {
  const { t } = useCMS();
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="section" style={{ background: 'var(--off-white)' }}>
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center', gap: 64 }}>
          <div>
            <div className="section-label">{t({ en: 'Quick Contact', it: 'Contatto Rapido' })}</div>
            <h2 className="section-title">{t({ en: 'Get In Touch', it: 'Contattaci' })}</h2>
            <div className="divider" />
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
              {t({ en: "Have a project in mind? Send us a quick message and our team will respond within 24 hours.", it: "Hai un progetto in mente? Inviaci un messaggio veloce e il nostro team risponderà entro 24 ore." })}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a href="tel:+390811234567" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--navy)', fontWeight: 500 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={18} color="white" />
                </div>
                +39 081 123 4567
              </a>
              <a href="mailto:info@marinepro.it" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--navy)', fontWeight: 500 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={18} color="white" />
                </div>
                info@marinepro.it
              </a>
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 36, boxShadow: 'var(--shadow)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>
                  {t({ en: 'Message Sent!', it: 'Messaggio Inviato!' })}
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>{t({ en: "We'll get back to you shortly.", it: 'Ti risponderemo a breve.' })}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid-2" style={{ gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label">{t({ en: 'Name', it: 'Nome' })}</label>
                    <input className="form-input" placeholder={t({ en: 'Your name', it: 'Il tuo nome' })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" placeholder="email@example.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{t({ en: 'Service', it: 'Servizio' })}</label>
                  <select className="form-select">
                    <option value="">{t({ en: 'Select service', it: 'Seleziona servizio' })}</option>
                    <option>{t({ en: 'Naval & Marine', it: 'Navale e Marittimo' })}</option>
                    <option>Rope Access</option>
                    <option>{t({ en: 'Construction', it: 'Costruzioni' })}</option>
                    <option>{t({ en: 'Welding', it: 'Saldatura' })}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">{t({ en: 'Message', it: 'Messaggio' })}</label>
                  <textarea className="form-textarea" placeholder={t({ en: 'Brief project description...', it: 'Breve descrizione del progetto...' })} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  {t({ en: 'Send Message', it: 'Invia Messaggio' })} <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesSection />
      <FeaturedProjects />
      <Clients />
      <CTA />
      <QuickContact />
    </>
  );
}
