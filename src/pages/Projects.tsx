import React, { useState } from 'react';
import { useCMS } from '../hooks/useCMS';
import { getPublicUrl } from '../utils/supabase';
import { Helmet } from 'react-helmet-async';

type Filter = 'all' | 'naval' | 'rope' | 'civil-engineering' | 'carpentry';

export default function Projects() {
  const { content, t } = useCMS();
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<string | null>(null);

  const heroImageUrl = getPublicUrl('projects/projects_hero.jpg');

  const costaSmeraldaUrl = getPublicUrl('projects/costa_smeralda.jpg');
  const mscGrandiosaUrl = getPublicUrl('projects/msc_grandiosa.jpeg');
  const mscVirtuosaUrl = getPublicUrl('projects/msc_virtuosa.jpg');
  const celebrityBeyondUrl = getPublicUrl('projects/celebrity_beyond.jpg');
  const wonderOfTheSeasUrl = getPublicUrl('projects/wonder_of_the_seas.jpg');  
  
  const mardiGrasUrl = getPublicUrl('projects/mardi_gras.jpg'); 
  const mardiGras1Url = getPublicUrl('projects/mardi_gras1.jpg');
  const worldEuropaUrl = getPublicUrl('projects/msc_world_europa.jpg');
  const carnivalCelebrationUrl = getPublicUrl('projects/carnival_celebration.jpg');
  const mscEuribiaUrl = getPublicUrl('projects/msc_euribia.jpg');
  const iconOfTheSeasUrl = getPublicUrl('projects/icon_of_the_seas.jpg');
  const celebrityAscentUrl = getPublicUrl('projects/celebrity_ascent.jpg');

  const cityRingUrl = getPublicUrl('projects/sky_light_metropolitan.jpg');
   const clocheDorUrl = getPublicUrl('projects/cloche_d_or.jpg');
   const torreMervilleUrl = getPublicUrl('projects/torre_merville_jesolo.jpg');
   const torreMerville1Url = getPublicUrl('projects/torre_merville_jesolo_2.jpg');
    const torreIntesaSanPaoloUrl = getPublicUrl('projects/torre_intesa_san_paolo_torino.jpg');

  const justicePalaceUrl = getPublicUrl('projects/justice-palace-tbilisi.jpg');
  const justicePalace1Url = getPublicUrl('projects/justice-palace-tbilisi-1.jpg');
  const justicePalace2Url = getPublicUrl('projects/justice-palace-tbilisi-2.jpg');
  const justicePalace3Url = getPublicUrl('projects/justice-palace-tbilisi-3.jpg');
  
  content.projects.map(p => p.id === 'p1' ? p.images[0] = costaSmeraldaUrl : p);
  content.projects.map(p => p.id === 'p2' ? p.images[0] = iconOfTheSeasUrl : p);
  content.projects.map(p => p.id === 'p3' ? p.images[0] = celebrityAscentUrl : p);
  content.projects.map(p => p.id === 'p4' ? p.images[0] = celebrityBeyondUrl : p);
  content.projects.map(p => p.id === 'p5' ? p.images[0] = wonderOfTheSeasUrl : p);
  content.projects.map(p => p.id === 'p6' ? p.images[0] = mardiGrasUrl : p);
  content.projects.map(p => p.id === 'p6' ? p.images[1] = mardiGras1Url : p);
  content.projects.map(p => p.id === 'p7' ? p.images[0] = worldEuropaUrl : p);
  content.projects.map(p => p.id === 'p8' ? p.images[0] = carnivalCelebrationUrl : p);
  content.projects.map(p => p.id === 'p9' ? p.images[0] = mscEuribiaUrl : p);
  content.projects.map(p => p.id === 'p10' ? p.images[0] = mscGrandiosaUrl : p);
  content.projects.map(p => p.id === 'p11' ? p.images[0] = mscVirtuosaUrl: p);

  content.projects.map(p => p.id === 'p12' ? p.images[0] = cityRingUrl: p);
  content.projects.map(p => p.id === 'p13' ? p.images[0] = clocheDorUrl: p);
  content.projects.map(p => p.id === 'p14' ? p.images = [torreMervilleUrl, torreMerville1Url]: p);
  content.projects.map(p => p.id === 'p15' ? p.images[0] = torreIntesaSanPaoloUrl: p);

  content.projects.map(p => p.id === 'p16' ? p.images = [justicePalaceUrl, justicePalace1Url, justicePalace2Url, justicePalace3Url]: p);


  const filters: { key: Filter; label: { en: string; it: string } }[] = [
    { key: 'all', label: { en: 'All Projects', it: 'Tutti i Progetti' } },
    { key: 'naval', label: { en: 'Naval & Marine', it: 'Navale e Marittimo' } },
    { key: 'rope', label: { en: 'Rope Access', it: 'Lavori con Corda' } },
    { key: 'civil-engineering', label: { en: 'Civil Engineering Works', it: 'Lavori di Ingegneria Civile' } },
    { key: 'carpentry', label: { en: 'Carpentry', it: 'Falegnameria' } },
  ];

  const catColors: Record<string, string> = { naval: 'badge-naval', rope: 'badge-rope', 'civil-engineering': 'badge-civil-engineering', carpentry: 'badge-carpentry' };
  const catLabel: Record<string, { en: string; it: string }> = {
    naval: { en: 'Naval', it: 'Navale' }, 
    rope: { en: 'Rope Access', it: 'Lavori in Corda' },
    'civil-engineering': { en: 'Civil Engineering Works', it: 'Lavori di Ingegneria Civile' }, 
    carpentry: { en: 'Carpentry', it: 'Carpenteria' }
  };
  
  const filtered = filter === 'all' ? content.projects : content.projects.filter(p => p.serviceCategory === filter);
  const selectedProject = content.projects.find(p => p.id === selected);

  return (
    <>
    <Helmet>
      <title>Projects | Navigomaris – International Portfolio</title>
      <meta name="description" content="Browse completed projects by Navigomaris including civil construction, marine vessel refits, curtain wall installations and rope access works delivered internationally." />
      <meta property="og:title" content="Projects | Navigomaris" />
      <meta property="og:description" content="Browse completed projects by Navigomaris including civil construction, marine vessel refits, curtain wall installations and rope access works delivered internationally." />
      <meta property="og:url" content="https://navigomaris.com/projects" />
    </Helmet>
      <div className="page-hero">
        <img className="page-hero__bg" src={heroImageUrl} alt="" />
        <div className="page-hero__overlay" />
        <div className="container page-hero__content">
          <div className="section-label light">{t({ en: 'Our Work', it: 'Il Nostro Lavoro' })}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,6rem)', color: 'white', lineHeight: 0.95, letterSpacing: '0.03em' }}>
            {t({ en: 'Project Portfolio', it: 'Portfolio Progetti' })}
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filter tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48 }}>
            {filters.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)}
                className="btn btn-sm"
                style={{
                  background: filter === f.key ? 'var(--navy)' : 'var(--off-white)',
                  color: filter === f.key ? 'white' : 'var(--navy)',
                  border: filter === f.key ? '2px solid var(--navy)' : '2px solid transparent',
                }}>
                {t(f.label)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid-3" style={{ gap: 20 }}>
            {filtered.map(project => (
              <div key={project.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(project.id)}>
                <div className="project-card" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative', aspectRatio: '4/3' }}>
                  <img src={project.images[0]} alt={t(project.title)} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.2) 60%, transparent 100%)' }} />
                  <div style={{ position: 'absolute', top: 16, left: 16 }}>
                    <span className={`badge ${catColors[project.serviceCategory]}`}>{t(catLabel[project.serviceCategory])}</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px' }}>
                    <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '1.05rem', fontWeight: 700, color: 'white', marginBottom: 4, letterSpacing: '0.04em' }}>{t(project.title)}</h3>
                    <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>
                      📍 {project.location} · {project.year}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1.1rem' }}>{t({ en: 'No projects found for this category.', it: 'Nessun progetto trovato per questa categoria.' })}</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selected && selectedProject && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={() => setSelected(null)}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', maxWidth: 800, width: '100%', maxHeight: '90vh', overflow: 'auto' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ position: 'relative' }}>
              <img src={selectedProject.images[0]} alt={t(selectedProject.title)} style={{ width: '100%', height: 320, objectFit: 'cover' }} />
              <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', width: 36, height: 36, borderRadius: '50%', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                <span className={`badge ${catColors[selectedProject.serviceCategory]}`}>{t(catLabel[selectedProject.serviceCategory])}</span>
              </div>
            </div>
            <div style={{ padding: '32px 36px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', letterSpacing: '0.03em', marginBottom: 8 }}>{t(selectedProject.title)}</h2>
              <div style={{ display: 'flex', gap: 20, fontFamily: 'var(--font-condensed)', fontSize: 13, color: 'var(--text-muted)', marginBottom: 20, letterSpacing: '0.08em' }}>
                <span>📍 {selectedProject.location}</span>
                <span>📅 {selectedProject.year}</span>
                {selectedProject.client && <span>🏢 {selectedProject.client}</span>}
              </div>
              <div className="divider" />
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: 8 }}>{t(selectedProject.description)}</p>
              {selectedProject.images.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8, marginTop: 24 }}>
                  {selectedProject.images.map((img, i) => (
                    <img key={i} src={img} alt="" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
