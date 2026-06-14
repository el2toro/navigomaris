import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../hooks/useCMS';
import { ArrowRight } from 'lucide-react';
import { getPublicUrl } from '../utils/supabase';

const servicesHeroImageUrl = getPublicUrl('services/services_hero.jpg');

const navalServiceUrl = getPublicUrl('services/marine_service.avif');
const ropeServiceUrl = getPublicUrl('services/rope_acces_service.avif');
const constructionServiceUrl = getPublicUrl('services/construction_service.avif');
const weldingServiceUrl = getPublicUrl('services/welding_service.avif');

const marineService1Url = getPublicUrl('services/marine_service1.jpg');
const ropeAccessService1Url = getPublicUrl('services/rope_acces_service1.jpg');
const carpentryService1Url = getPublicUrl('services/carpentry_service.jpg');
const civilEngineeringService1Url = getPublicUrl('services/civil_engineering_service1.jpg');

const navalIconUrl = getPublicUrl('icons/cruise_ship.svg');
const ropeIconUrl = getPublicUrl('icons/climbing.svg');
const civilEngineeringIconUrl = getPublicUrl('icons/helmet_construction.svg');
const weldingIconUrl = getPublicUrl('icons/welder.svg');

export default function Services() {
  const { content, t } = useCMS();
  content.services[0].images[0] = marineService1Url;
  content.services[1].images[0] = ropeAccessService1Url;
  content.services[2].images[0] = carpentryService1Url;
  content.services[3].images[0] = civilEngineeringService1Url;

  content.services[0].icon = navalIconUrl;
  content.services[1].icon = ropeIconUrl;
  content.services[2].icon = weldingIconUrl;
  content.services[3].icon = civilEngineeringIconUrl;


  return (
    <>
      <div className="page-hero">
        <img className="page-hero__bg" src={servicesHeroImageUrl} alt="" />
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
                  <img src={service.images[0]} alt={t(service.title)} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 20, left: 20, width: 56, height: 56, borderRadius: '50%', background: service.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                    { <img src={service.icon} alt={t(service.title)} style={{ width: 40, height: 40}} /> }
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
                  <Link to={`/services/${service.slug}`} className="btn btn-primary" style={{ background: service.color, borderColor: service.color, color: 'var(--accent)' }}>
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
