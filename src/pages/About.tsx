import { Link } from 'react-router-dom';
import { useCMS } from '../hooks/useCMS';
import { ArrowRight, Shield, Award, Target, Zap, Users } from 'lucide-react';

export default function About() {
  const { content, t } = useCMS();

  const valueIcons = [Shield, Award, Target, Zap, Users];

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <img className="page-hero__bg" src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80" alt="" />
        <div className="page-hero__overlay" />
        <div className="container page-hero__content">
          <div className="section-label light">{t({ en: 'Who We Are', it: 'Chi Siamo' })}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,6rem)', color: 'white', lineHeight: 0.95, letterSpacing: '0.03em' }}>
            {t({ en: 'About\nMarinePro', it: 'Chi Siamo —\nMarinePro' })}
          </h1>
        </div>
      </div>

      {/* Company Story */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 80, alignItems: 'center' }}>
            <div>
              <div className="section-label">{t({ en: 'Our Story', it: 'La Nostra Storia' })}</div>
              <h2 className="section-title" style={{ marginBottom: 24 }}>{t(content.aboutTitle)}</h2>
              <div className="divider" />
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: 24 }}>
                {t(content.aboutText)}
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                {t({ en: 'From underwater hull inspections in the Mediterranean to rope access works on offshore platforms, we combine deep technical expertise with an uncompromising safety culture. Every project, regardless of scale, receives the same level of professionalism and attention to detail.', it: 'Dalle ispezioni subacquee degli scafi nel Mediterraneo ai lavori di rope access su piattaforme offshore, combiniamo una profonda competenza tecnica con una cultura della sicurezza senza compromessi. Ogni progetto, indipendentemente dalle dimensioni, riceve lo stesso livello di professionalità e attenzione ai dettagli.' })}
              </p>
              <div style={{ marginTop: 36 }}>
                <Link to="/contact" className="btn btn-primary">{t({ en: 'Work With Us', it: 'Lavora Con Noi' })} <ArrowRight size={16} /></Link>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80" alt="NavigoMaris team" style={{ borderRadius: 'var(--radius-lg)', width: '100%', objectFit: 'cover', aspectRatio: '4/3' }} />
              <div style={{ position: 'absolute', bottom: -24, left: -24, background: 'var(--navy)', borderRadius: 'var(--radius-lg)', padding: '24px 32px', color: 'white', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--accent)', lineHeight: 1 }}>20+</div>
                <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                  {t({ en: 'Years of Excellence', it: 'Anni di Eccellenza' })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section" style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(232,160,32,0.08) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>{t({ en: 'Our Mission', it: 'La Nostra Missione' })}</div>
            <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,3rem)', color: 'white', lineHeight: 1.2, letterSpacing: '0.02em', margin: '0 0 24px' }}>
              "{t(content.mission)}"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>{t({ en: 'What Drives Us', it: 'Cosa Ci Guida' })}</div>
            <h2 className="section-title">{t({ en: 'Our Core Values', it: 'I Nostri Valori' })}</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {content.values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <div key={i} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '32px 36px', textAlign: 'center', minWidth: 180, boxShadow: 'var(--shadow)', flex: '1 1 180px', maxWidth: 220 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Icon size={24} color="var(--accent)" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)' }}>{t(v)}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>{t({ en: 'The People Behind MarinePro', it: 'Le Persone Dietro MarinePro' })}</div>
            <h2 className="section-title">{t({ en: 'Leadership Team', it: 'Team di Direzione' })}</h2>
          </div>
          <div className="grid-3">
            {content.team.map(member => (
              <div key={member.id} style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', textAlign: 'center' }}>
                <div style={{ height: 220, background: 'linear-gradient(135deg, var(--navy-mid), var(--steel))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--accent)' }}>
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div style={{ padding: 28 }}>
                  <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.04em' }}>{member.name}</h3>
                  <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', margin: '6px 0 12px' }}>{t(member.role)}</div>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{t(member.bio)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-sm" style={{ background: 'var(--navy)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>{t({ en: 'Standards & Certifications', it: 'Standard e Certificazioni' })}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginTop: 32 }}>
            {['ISO 9001:2015', 'IRATA Level 3', 'AWS D1.1', 'ISO 3834', 'IMCA', 'EN 1090'].map(cert => (
              <div key={cert} style={{ padding: '12px 28px', border: '1px solid rgba(232,160,32,0.4)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-condensed)', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)' }}>
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
