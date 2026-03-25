import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useCMS } from '../../hooks/useCMS';
import { Globe, Menu, X, Anchor, ChevronDown, Settings } from 'lucide-react';

function Header() {
  const { language, setLanguage, t, isAdmin } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const nav = [
    { href: '/', label: { en: 'Home', it: 'Home' } },
    { href: '/about', label: { en: 'About', it: 'Chi Siamo' } },
    { href: '/services', label: { en: 'Services', it: 'Servizi' }, hasDropdown: true },
    { href: '/projects', label: { en: 'Projects', it: 'Progetti' } },
    { href: '/contact', label: { en: 'Contact', it: 'Contatti' } },
  ];

  const services = [
    { slug: 'naval-marine', label: { en: 'Naval & Marine', it: 'Navale e Marittimo' } },
    { slug: 'rope-access', label: { en: 'Rope Access', it: 'Rope Access' } },
    { slug: 'construction', label: { en: 'Construction', it: 'Costruzioni' } },
    { slug: 'welding', label: { en: 'Welding', it: 'Saldatura' } },
  ];

  const isActive = (href: string) => href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.4s ease;
          padding: 20px 0;
        }
        .site-header.scrolled {
          background: var(--navy);
          padding: 14px 0;
          box-shadow: 0 4px 32px rgba(0,0,0,0.3);
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
        }
        .logo-icon {
          width: 150px;
          height: 50px;
          //background: var(--accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--navy);
        }
        .logo-text { line-height: 1; }
        .logo-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          letter-spacing: 0.05em;
          color: white;
        }
        .logo-tagline {
          font-family: var(--font-condensed);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .nav-list {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
        }
        .nav-item { position: relative; }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 14px;
          font-family: var(--font-condensed);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          border-radius: var(--radius);
          transition: var(--transition);
          cursor: pointer;
          background: none;
        }
        .nav-link:hover, .nav-link.active {
          color: white;
          background: rgba(255,255,255,0.1);
        }
        .nav-link.active { color: var(--accent); }
        .dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: var(--navy-mid);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-lg);
          padding: 8px;
          min-width: 220px;
          box-shadow: var(--shadow-lg);
          opacity: 0;
          pointer-events: none;
          transform: translateY(-8px);
          transition: var(--transition);
        }
        .nav-item:hover .dropdown {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }
        .dropdown-link {
          display: block;
          padding: 10px 14px;
          font-family: var(--font-condensed);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          border-radius: var(--radius);
          transition: var(--transition);
        }
        .dropdown-link:hover { background: rgba(255,255,255,0.1); color: var(--accent); }
        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .lang-switcher {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 99px;
          font-family: var(--font-condensed);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: white;
          transition: var(--transition);
          cursor: pointer;
        }
        .lang-switcher:hover { border-color: var(--accent); color: var(--accent); }
        .hamburger {
          display: none;
          color: white;
          padding: 8px;
        }
        .mobile-menu {
          display: none;
          position: fixed;
          inset: 0;
          background: var(--navy);
          z-index: 999;
          flex-direction: column;
          padding: 80px 24px 40px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-nav-link {
          font-family: var(--font-display);
          font-size: 2.5rem;
          letter-spacing: 0.04em;
          color: white;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: block;
          transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: var(--accent); }
        .mobile-close {
          position: absolute;
          top: 20px;
          right: 20px;
          color: white;
          padding: 8px;
        }
        @media (max-width: 1024px) {
          .nav-list { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo">
            {/* <div className="logo-icon"><Anchor size={20} /></div>
            <div className="logo-text">
              <div className="logo-name">NavigoMaris</div>
              <div className="logo-tagline">{language === 'en' ? 'Industrial Services' : 'Servizi Industriali'}</div>
            </div> */}

            <div className="logo-icon">
              <img src="/assets/logo.png" alt="NavigoMaris" />
            </div>
          </Link>

          <nav>
            <ul className="nav-list">
              {nav.map(item => (
                <li key={item.href} className="nav-item">
                  {item.hasDropdown ? (
                    <>
                      <Link to={item.href} className={`nav-link ${isActive(item.href) ? 'active' : ''}`}>
                        {t(item.label)} <ChevronDown size={13} />
                      </Link>
                      <div className="dropdown">
                        {services.map(s => (
                          <Link key={s.slug} to={`/services/${s.slug}`} className="dropdown-link">{t(s.label)}</Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link to={item.href} className={`nav-link ${isActive(item.href) ? 'active' : ''}`}>{t(item.label)}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-right">
            <button className="lang-switcher" onClick={() => setLanguage(language === 'en' ? 'it' : 'en')}>
              <Globe size={13} />
              {language === 'en' ? 'IT' : 'EN'}
            </button>
            {isAdmin && (
              <Link to="/admin" className="btn btn-sm btn-outline" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>
                <Settings size={13} /> CMS
              </Link>
            )}
            <button className="hamburger" onClick={() => setMenuOpen(true)}><Menu size={24} /></button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}><X size={28} /></button>
        {nav.map(item => (
          <Link key={item.href} to={item.href} className="mobile-nav-link">{t(item.label)}</Link>
        ))}
        <div style={{ marginTop: 'auto', display: 'flex', gap: 12 }}>
          <button className="lang-switcher" onClick={() => setLanguage(language === 'en' ? 'it' : 'en')}>
            <Globe size={13} /> {language === 'en' ? 'Italiano' : 'English'}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { t } = useCMS();
  return (
    <footer style={{ background: 'var(--navy)', color: 'rgba(255,255,255,0.7)', padding: '64px 0 32px' }}>
      <style>{`
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
        .footer-heading { font-family: var(--font-condensed); font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
        .footer-link { display: block; color: rgba(255,255,255,0.6); font-size: 14px; padding: 4px 0; transition: color 0.2s; }
        .footer-link:hover { color: white; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr; } .footer-bottom { flex-direction: column; gap: 12px; text-align: center; } }
      `}</style>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Anchor size={18} color="var(--navy)" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'white', letterSpacing: '0.04em' }}>MarinePro</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              {t({ en: 'Professional marine, rope access, construction and welding services across Italy and internationally.', it: 'Servizi professionali marini, rope access, costruzioni e saldatura in tutta Italia e a livello internazionale.' })}
            </p>
          </div>
          <div>
            <div className="footer-heading">{t({ en: 'Services', it: 'Servizi' })}</div>
            <Link to="/services/naval-marine" className="footer-link">{t({ en: 'Naval & Marine', it: 'Navale e Marittimo' })}</Link>
            <Link to="/services/rope-access" className="footer-link">Rope Access</Link>
            <Link to="/services/construction" className="footer-link">{t({ en: 'Construction', it: 'Costruzioni' })}</Link>
            <Link to="/services/welding" className="footer-link">{t({ en: 'Welding', it: 'Saldatura' })}</Link>
          </div>
          <div>
            <div className="footer-heading">{t({ en: 'Company', it: 'Azienda' })}</div>
            <Link to="/about" className="footer-link">{t({ en: 'About Us', it: 'Chi Siamo' })}</Link>
            <Link to="/projects" className="footer-link">{t({ en: 'Projects', it: 'Progetti' })}</Link>
            <Link to="/contact" className="footer-link">{t({ en: 'Contact', it: 'Contatti' })}</Link>
          </div>
          <div>
            <div className="footer-heading">{t({ en: 'Contact', it: 'Contatti' })}</div>
            <p style={{ fontSize: 14, lineHeight: 1.8 }}>+39 081 123 4567<br />info@marinepro.it<br />{t({ en: 'Via del Porto 42', it: 'Via del Porto 42' })}<br />{t({ en: 'Naples, Italy', it: 'Napoli, Italia' })}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MarinePro S.r.l. — {t({ en: 'All rights reserved', it: 'Tutti i diritti riservati' })}</span>
          <button
            onClick={() => {
              const pass = prompt('Admin password:');
              if (pass === 'admin123') { localStorage.setItem('marinepro_admin', 'true'); window.location.href = '/admin'; }
            }}
            style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'var(--font-body)' }}
          >
            {t({ en: 'Admin', it: 'Amministratore' })}
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
