import React, { useState } from 'react';
import { useCMS } from '../hooks/useCMS';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function Contact() {
  const { content, t } = useCMS();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <>
      <div className="page-hero">
        <img className="page-hero__bg" src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80" alt="" />
        <div className="page-hero__overlay" />
        <div className="container page-hero__content">
          <div className="section-label light">{t({ en: 'Reach Us', it: 'Contattaci' })}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,6rem)', color: 'white', lineHeight: 0.95, letterSpacing: '0.03em' }}>
            {t({ en: 'Get In Touch', it: 'Contatti' })}
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 80, alignItems: 'start' }}>
            {/* Info */}
            <div>
              <div className="section-label">{t({ en: 'Contact Information', it: 'Informazioni di Contatto' })}</div>
              <h2 className="section-title" style={{ marginBottom: 24 }}>{t({ en: "Let's Work\nTogether", it: "Lavoriamo\nInsieme" })}</h2>
              <div className="divider" />
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40 }}>
                {t({ en: "Our team is available to discuss your project requirements and provide expert guidance on the best approach for your needs.", it: "Il nostro team è disponibile per discutere i requisiti del vostro progetto e fornire una guida esperta sull'approccio migliore per le vostre esigenze." })}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  { icon: Phone, label: t({ en: 'Phone', it: 'Telefono' }), value: content.contactInfo.phone, href: `tel:${content.contactInfo.phone}` },
                  { icon: Mail, label: 'Email', value: content.contactInfo.email, href: `mailto:${content.contactInfo.email}` },
                  { icon: MapPin, label: t({ en: 'Address', it: 'Indirizzo' }), value: t(content.contactInfo.address), href: '' },
                  { icon: Clock, label: t({ en: 'Hours', it: 'Orari' }), value: t({ en: 'Mon–Fri 8:00–18:00 · Emergency 24/7', it: 'Lun–Ven 8:00–18:00 · Emergenze 24/7' }), href: '' },
                ].map(({ icon: Icon, label, value, href }, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 'var(--radius)', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} color="var(--accent)" />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
                      {href ? (
                        <a href={href} style={{ fontWeight: 500, color: 'var(--navy)', fontSize: '1rem', transition: 'color 0.2s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--ocean)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--navy)')}>
                          {value}
                        </a>
                      ) : (
                        <span style={{ fontWeight: 500, color: 'var(--navy)', fontSize: '1rem' }}>{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 40, boxShadow: 'var(--shadow-lg)', border: '1px solid rgba(0,0,0,0.04)' }}>
                {sent ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <span style={{ color: 'white', fontSize: 28 }}>✓</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', letterSpacing: '0.03em', marginBottom: 12 }}>
                      {t({ en: 'Message Received!', it: 'Messaggio Ricevuto!' })}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                      {t({ en: "Thank you for reaching out. Our team will respond within one business day.", it: "Grazie per averci contattato. Il nostro team risponderà entro un giorno lavorativo." })}
                    </p>
                    <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => setSent(false)}>
                      {t({ en: 'Send Another', it: 'Invia un Altro' })}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--navy)', letterSpacing: '0.03em', marginBottom: 24 }}>
                      {t({ en: 'Service Request', it: 'Richiesta di Servizio' })}
                    </h3>
                    <div className="grid-2" style={{ gap: 16 }}>
                      <div className="form-group">
                        <label className="form-label">{t({ en: 'First Name', it: 'Nome' })} *</label>
                        <input className="form-input" required placeholder={t({ en: 'John', it: 'Marco' })} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">{t({ en: 'Last Name', it: 'Cognome' })} *</label>
                        <input className="form-input" required placeholder={t({ en: 'Smith', it: 'Rossi' })} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input className="form-input" type="email" required placeholder="email@company.com" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t({ en: 'Phone', it: 'Telefono' })}</label>
                      <input className="form-input" type="tel" placeholder="+39 000 000 0000" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t({ en: 'Company', it: 'Azienda' })}</label>
                      <input className="form-input" placeholder={t({ en: 'Your company', it: 'La tua azienda' })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t({ en: 'Service Required', it: 'Servizio Richiesto' })} *</label>
                      <select className="form-select" required>
                        <option value="">{t({ en: 'Select a service', it: 'Seleziona un servizio' })}</option>
                        <option value="naval">{t({ en: 'Naval & Marine Services', it: 'Servizi Navali e Marittimi' })}</option>
                        <option value="rope">Rope Access</option>
                        <option value="construction">{t({ en: 'Building & Construction', it: 'Edilizia e Costruzioni' })}</option>
                        <option value="welding">{t({ en: 'Welding Services', it: 'Servizi di Saldatura' })}</option>
                        <option value="multi">{t({ en: 'Multiple Services', it: 'Servizi Multipli' })}</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t({ en: 'Project Description', it: 'Descrizione Progetto' })} *</label>
                      <textarea className="form-textarea" required style={{ minHeight: 140 }}
                        placeholder={t({ en: 'Describe your project, location, timeline, and any specific requirements...', it: 'Descrivi il tuo progetto, la posizione, i tempi e qualsiasi requisito specifico...' })} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                      {loading ? t({ en: 'Sending...', it: 'Invio...' }) : <>{t({ en: 'Submit Request', it: 'Invia Richiesta' })} <ArrowRight size={16} /></>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section style={{ background: 'var(--off-white)', padding: '0 0 0' }}>
        <div className="map-placeholder" style={{ borderRadius: 0 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48387.60076786816!2d14.207611299999999!3d40.8518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b08265aaaaaa%3A0x6da561bba3c4a6c7!2sNaples%2C%20Metropolitan%20City%20of%20Naples%2C%20Italy!5e0!3m2!1sen!2sit!4v1234567890"
            title="MarinePro Location"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
