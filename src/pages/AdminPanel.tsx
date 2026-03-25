import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../hooks/useCMS';
import { SiteContent, Project, Service } from '../types';
import {
  LayoutDashboard, Image, FolderOpen, Settings, Globe,
  LogOut, Plus, Trash2, Save, Upload, X, Edit2,
  Home, Anchor, ExternalLink, ChevronRight, Eye
} from 'lucide-react';

type Tab = 'dashboard' | 'hero' | 'services' | 'projects' | 'clients' | 'team' | 'contact' | 'seo';

function Sidebar({ tab, setTab, onLogout }: { tab: Tab; setTab: (t: Tab) => void; onLogout: () => void }) {
  const navItems: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { key: 'hero', label: 'Hero / Homepage', icon: <Home size={16} /> },
    { key: 'services', label: 'Services', icon: <Anchor size={16} /> },
    { key: 'projects', label: 'Projects', icon: <FolderOpen size={16} /> },
    { key: 'clients', label: 'Clients', icon: <Globe size={16} /> },
    { key: 'team', label: 'Team', icon: <Settings size={16} /> },
    { key: 'contact', label: 'Contact Info', icon: <Settings size={16} /> },
    { key: 'seo', label: 'SEO Settings', icon: <Settings size={16} /> },
  ];

  return (
    <div className="admin-sidebar">
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Anchor size={16} color="var(--navy)" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'white', letterSpacing: '0.05em' }}>MarinePro</span>
        </div>
        <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginLeft: 42 }}>
          CMS Admin
        </div>
      </div>

      <nav style={{ padding: '16px 12px' }}>
        {navItems.map(item => (
          <button key={item.key} onClick={() => setTab(item.key)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
              borderRadius: 'var(--radius)', marginBottom: 2, textAlign: 'left',
              fontFamily: 'var(--font-condensed)', fontSize: 14, fontWeight: 500, letterSpacing: '0.04em',
              color: tab === item.key ? 'white' : 'rgba(255,255,255,0.55)',
              background: tab === item.key ? 'rgba(232,160,32,0.2)' : 'none',
              borderLeft: tab === item.key ? '2px solid var(--accent)' : '2px solid transparent',
              transition: 'var(--transition)', cursor: 'pointer'
            }}>
            {item.icon} {item.label}
          </button>
        ))}
      </nav>

      <div style={{ padding: '16px 12px', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)', position: 'absolute', bottom: 0, width: '100%' }}>
        <Link to="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-condensed)', fontSize: 13, marginBottom: 4 }}>
          <Eye size={14} /> View Website <ExternalLink size={12} />
        </Link>
        <button onClick={onLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-condensed)', fontSize: 13, cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'white')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
          <LogOut size={14} /> Logout
        </button>
      </div>
    </div>
  );
}

// Image upload dropzone
function ImageUploader({ onAdd }: { onAdd: (url: string) => void }) {
  const [drag, setDrag] = useState(false);
  const [url, setUrl] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => { if (e.target?.result) onAdd(e.target.result as string); };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div className={`dropzone ${drag ? 'drag-over' : ''}`}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        onClick={() => fileRef.current?.click()}>
        <Upload size={24} color="var(--text-muted)" />
        <p>Drag & drop images or <strong>click to browse</strong></p>
        <p style={{ fontSize: 12 }}>PNG, JPG, WEBP supported</p>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <input className="form-input" placeholder="Or paste image URL..." value={url} onChange={e => setUrl(e.target.value)} style={{ flex: 1 }} />
        <button className="btn btn-sm btn-primary" onClick={() => { if (url) { onAdd(url); setUrl(''); } }}>Add URL</button>
      </div>
    </div>
  );
}

function ImageGrid({ images, onRemove }: { images: string[]; onRemove: (i: number) => void }) {
  return (
    <div className="img-grid">
      {images.map((img, i) => (
        <div key={i} className="img-thumb">
          <img src={img} alt="" />
          <button className="img-thumb__del" onClick={() => onRemove(i)}><X size={12} /></button>
        </div>
      ))}
      {images.length === 0 && <div style={{ color: 'var(--text-muted)', fontSize: 13, padding: 8 }}>No images</div>}
    </div>
  );
}

// Dashboard
function Dashboard({ content, setTab }: { content: SiteContent; setTab: (t: Tab) => void }) {
  const stats = [
    { label: 'Services', count: content.services.length, tab: 'services' as Tab, color: '#0077b6' },
    { label: 'Projects', count: content.projects.length, tab: 'projects' as Tab, color: '#e85d04' },
    { label: 'Clients', count: content.clients.length, tab: 'clients' as Tab, color: '#588157' },
    { label: 'Team Members', count: content.team.length, tab: 'team' as Tab, color: '#c1121f' },
  ];
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', letterSpacing: '0.03em' }}>Dashboard</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: 4 }}>Welcome back. Here's an overview of your site content.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {stats.map(s => (
          <button key={s.label} onClick={() => setTab(s.tab)} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '24px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', cursor: 'pointer', textAlign: 'left', border: `2px solid transparent`, transition: 'var(--transition)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = s.color)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: s.color, lineHeight: 1 }}>{s.count}</div>
            <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
          </button>
        ))}
      </div>
      <div className="admin-card">
        <h3>Quick Actions</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <button className="btn btn-primary btn-sm" onClick={() => setTab('hero')}><Image size={14} /> Edit Hero</button>
          <button className="btn btn-sm" style={{ background: 'var(--off-white)', color: 'var(--navy)' }} onClick={() => setTab('projects')}><Plus size={14} /> Add Project</button>
          <button className="btn btn-sm" style={{ background: 'var(--off-white)', color: 'var(--navy)' }} onClick={() => setTab('contact')}><Settings size={14} /> Update Contact</button>
          <Link to="/" target="_blank" className="btn btn-sm" style={{ background: 'var(--off-white)', color: 'var(--navy)' }}><ExternalLink size={14} /> View Site</Link>
        </div>
      </div>
    </div>
  );
}

// Hero Editor
function HeroEditor({ content, updateContent }: { content: SiteContent; updateContent: (u: Partial<SiteContent>) => void }) {
  const [heroImages, setHeroImages] = useState(content.heroImages);
  const [heroTitle, setHeroTitle] = useState(content.heroTitle);
  const [heroSub, setHeroSub] = useState(content.heroSubtitle);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateContent({ heroImages, heroTitle, heroSubtitle: heroSub });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', letterSpacing: '0.03em' }}>Hero & Homepage</h2>
        <button className={`btn btn-sm ${saved ? 'btn-success' : 'btn-primary'}`} onClick={save}>
          <Save size={14} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="admin-card">
        <h3>Hero Images (Slideshow)</h3>
        <ImageUploader onAdd={url => setHeroImages(prev => [...prev, url])} />
        <ImageGrid images={heroImages} onRemove={i => setHeroImages(prev => prev.filter((_, idx) => idx !== i))} />
      </div>

      <div className="admin-card">
        <h3>Hero Text</h3>
        <div style={{ display: 'grid', gap: 16 }}>
          <div>
            <div style={{ marginBottom: 12 }}>
              <label className="form-label">Title — English</label>
              <input className="form-input" value={heroTitle.en} onChange={e => setHeroTitle(p => ({ ...p, en: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">Title — Italian</label>
              <input className="form-input" value={heroTitle.it} onChange={e => setHeroTitle(p => ({ ...p, it: e.target.value }))} />
            </div>
          </div>
          <div>
            <div style={{ marginBottom: 12 }}>
              <label className="form-label">Subtitle — English</label>
              <textarea className="form-textarea" value={heroSub.en} onChange={e => setHeroSub(p => ({ ...p, en: e.target.value }))} />
            </div>
            <div>
              <label className="form-label">Subtitle — Italian</label>
              <textarea className="form-textarea" value={heroSub.it} onChange={e => setHeroSub(p => ({ ...p, it: e.target.value }))} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Projects Manager
function ProjectsManager({ content, updateContent }: { content: SiteContent; updateContent: (u: Partial<SiteContent>) => void }) {
  const [projects, setProjects] = useState(content.projects);
  const [editing, setEditing] = useState<Project | null>(null);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateContent({ projects });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const newProject = (): Project => ({
    id: Date.now().toString(),
    title: { en: 'New Project', it: 'Nuovo Progetto' },
    description: { en: '', it: '' },
    location: '',
    serviceCategory: 'naval',
    year: new Date().getFullYear(),
    images: [],
    featured: false,
  });

  const saveProject = (p: Project) => {
    setProjects(prev => prev.find(x => x.id === p.id) ? prev.map(x => x.id === p.id ? p : x) : [...prev, p]);
    setEditing(null);
  };

  const del = (id: string) => setProjects(prev => prev.filter(p => p.id !== id));

  if (editing) {
    return (
      <div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
          <button className="btn btn-sm" style={{ background: 'var(--off-white)' }} onClick={() => setEditing(null)}>← Back</button>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--navy)', letterSpacing: '0.03em' }}>
            {editing.title.en || 'New Project'}
          </h2>
        </div>

        <div className="admin-card">
          <h3>Project Details</h3>
          <div className="grid-2" style={{ gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Title — English</label>
              <input className="form-input" value={editing.title.en} onChange={e => setEditing(p => p && ({ ...p, title: { ...p.title, en: e.target.value } }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Title — Italian</label>
              <input className="form-input" value={editing.title.it} onChange={e => setEditing(p => p && ({ ...p, title: { ...p.title, it: e.target.value } }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input className="form-input" value={editing.location} onChange={e => setEditing(p => p && ({ ...p, location: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Year</label>
              <input className="form-input" type="number" value={editing.year} onChange={e => setEditing(p => p && ({ ...p, year: parseInt(e.target.value) }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Service Category</label>
              <select className="form-select" value={editing.serviceCategory} onChange={e => setEditing(p => p && ({ ...p, serviceCategory: e.target.value }))}>
                <option value="naval">Naval & Marine</option>
                <option value="rope">Rope Access</option>
                <option value="construction">Construction</option>
                <option value="welding">Welding</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Client</label>
              <input className="form-input" value={editing.client || ''} onChange={e => setEditing(p => p && ({ ...p, client: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <input type="checkbox" id="featured" checked={editing.featured} onChange={e => setEditing(p => p && ({ ...p, featured: e.target.checked }))} />
            <label htmlFor="featured" style={{ fontFamily: 'var(--font-condensed)', fontSize: 14, fontWeight: 500 }}>Featured on Homepage</label>
          </div>
        </div>

        <div className="admin-card">
          <h3>Description</h3>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label className="form-label">Description — English</label>
              <textarea className="form-textarea" value={editing.description.en} onChange={e => setEditing(p => p && ({ ...p, description: { ...p.description, en: e.target.value } }))} style={{ minHeight: 100 }} />
            </div>
            <div>
              <label className="form-label">Description — Italian</label>
              <textarea className="form-textarea" value={editing.description.it} onChange={e => setEditing(p => p && ({ ...p, description: { ...p.description, it: e.target.value } }))} style={{ minHeight: 100 }} />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3>Project Images</h3>
          <ImageUploader onAdd={url => setEditing(p => p && ({ ...p, images: [...p.images, url] }))} />
          <ImageGrid images={editing.images} onRemove={i => setEditing(p => p && ({ ...p, images: p.images.filter((_, idx) => idx !== i) }))} />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-primary" onClick={() => saveProject(editing)}><Save size={14} /> Save Project</button>
          <button className="btn" style={{ background: 'var(--off-white)' }} onClick={() => setEditing(null)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', letterSpacing: '0.03em' }}>Projects</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-sm btn-primary" onClick={() => setEditing(newProject())}><Plus size={14} /> Add Project</button>
          <button className={`btn btn-sm ${saved ? 'btn-success' : ''}`} style={{ background: saved ? undefined : 'var(--off-white)', color: saved ? 'white' : 'var(--navy)' }} onClick={save}>
            <Save size={14} /> {saved ? 'Saved!' : 'Save All'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {projects.map(project => (
          <div key={project.id} style={{ background: 'white', borderRadius: 'var(--radius)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            {project.images[0] && (
              <img src={project.images[0]} alt="" style={{ width: 72, height: 54, objectFit: 'cover', borderRadius: 'var(--radius)', flexShrink: 0 }} />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 15, fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.04em', marginBottom: 2 }}>{project.title.en}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{project.location} · {project.year} · {project.serviceCategory}</div>
            </div>
            {project.featured && <span className="badge badge-naval">Featured</span>}
            <button className="btn btn-sm" style={{ background: 'var(--off-white)' }} onClick={() => setEditing(project)}><Edit2 size={13} /> Edit</button>
            <button className="btn btn-sm btn-danger" onClick={() => del(project.id)}><Trash2 size={13} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Services Editor
function ServicesEditor({ content, updateContent }: { content: SiteContent; updateContent: (u: Partial<SiteContent>) => void }) {
  const [services, setServices] = useState(content.services);
  const [editing, setEditing] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateContent({ services });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const editingService = services.find(s => s.id === editing);

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  if (editing && editingService) {
    const s = editingService;
    return (
      <div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
          <button className="btn btn-sm" style={{ background: 'var(--off-white)' }} onClick={() => setEditing(null)}>← Back</button>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--navy)' }}>{s.title.en}</h2>
        </div>
        <div className="admin-card">
          <h3>Service Titles</h3>
          <div className="grid-2" style={{ gap: 16 }}>
            <div><label className="form-label">Title — English</label>
              <input className="form-input" value={s.title.en} onChange={e => updateService(s.id, { title: { ...s.title, en: e.target.value } })} /></div>
            <div><label className="form-label">Title — Italian</label>
              <input className="form-input" value={s.title.it} onChange={e => updateService(s.id, { title: { ...s.title, it: e.target.value } })} /></div>
          </div>
        </div>
        <div className="admin-card">
          <h3>Short Description</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div><label className="form-label">English</label>
              <textarea className="form-textarea" value={s.shortDesc.en} onChange={e => updateService(s.id, { shortDesc: { ...s.shortDesc, en: e.target.value } })} /></div>
            <div><label className="form-label">Italian</label>
              <textarea className="form-textarea" value={s.shortDesc.it} onChange={e => updateService(s.id, { shortDesc: { ...s.shortDesc, it: e.target.value } })} /></div>
          </div>
        </div>
        <div className="admin-card">
          <h3>Hero Image</h3>
          <ImageUploader onAdd={url => updateService(s.id, { heroImage: url })} />
          {s.heroImage && <img src={s.heroImage} alt="" style={{ maxHeight: 200, borderRadius: 'var(--radius)', marginTop: 8 }} />}
        </div>
        <div className="admin-card">
          <h3>Gallery Images</h3>
          <ImageUploader onAdd={url => updateService(s.id, { images: [...s.images, url] })} />
          <ImageGrid images={s.images} onRemove={i => updateService(s.id, { images: s.images.filter((_, idx) => idx !== i) })} />
        </div>
        <button className="btn btn-primary" onClick={() => { save(); setEditing(null); }}><Save size={14} /> Save Service</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', letterSpacing: '0.03em' }}>Services</h2>
        <button className={`btn btn-sm ${saved ? 'btn-success' : 'btn-primary'}`} onClick={save}><Save size={14} /> {saved ? 'Saved!' : 'Save Changes'}</button>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {services.map(s => (
          <div key={s.id} style={{ background: 'white', borderRadius: 'var(--radius)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 'var(--radius)', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
              {s.icon === 'anchor' ? '⚓' : s.icon === 'mountain' ? '🧗' : s.icon === 'building' ? '🏗️' : '🔥'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 15, fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.04em' }}>{s.title.en}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{s.images.length} gallery images</div>
            </div>
            <button className="btn btn-sm" style={{ background: 'var(--off-white)' }} onClick={() => setEditing(s.id)}><Edit2 size={13} /> Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Contact Editor
function ContactEditor({ content, updateContent }: { content: SiteContent; updateContent: (u: Partial<SiteContent>) => void }) {
  const [info, setInfo] = useState(content.contactInfo);
  const [saved, setSaved] = useState(false);
  const save = () => { updateContent({ contactInfo: info }); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)' }}>Contact Information</h2>
        <button className={`btn btn-sm ${saved ? 'btn-success' : 'btn-primary'}`} onClick={save}><Save size={14} /> {saved ? 'Saved!' : 'Save'}</button>
      </div>
      <div className="admin-card">
        <h3>Contact Details</h3>
        <div style={{ display: 'grid', gap: 16 }}>
          <div><label className="form-label">Phone</label>
            <input className="form-input" value={info.phone} onChange={e => setInfo(p => ({ ...p, phone: e.target.value }))} /></div>
          <div><label className="form-label">Email</label>
            <input className="form-input" type="email" value={info.email} onChange={e => setInfo(p => ({ ...p, email: e.target.value }))} /></div>
          <div><label className="form-label">Address — English</label>
            <input className="form-input" value={info.address.en} onChange={e => setInfo(p => ({ ...p, address: { ...p.address, en: e.target.value } }))} /></div>
          <div><label className="form-label">Address — Italian</label>
            <input className="form-input" value={info.address.it} onChange={e => setInfo(p => ({ ...p, address: { ...p.address, it: e.target.value } }))} /></div>
        </div>
      </div>
    </div>
  );
}

// SEO Editor
function SEOEditor({ content, updateContent }: { content: SiteContent; updateContent: (u: Partial<SiteContent>) => void }) {
  const [title, setTitle] = useState(content.seoTitle);
  const [desc, setDesc] = useState(content.seoDescription);
  const [saved, setSaved] = useState(false);
  const save = () => { updateContent({ seoTitle: title, seoDescription: desc }); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)' }}>SEO Settings</h2>
        <button className={`btn btn-sm ${saved ? 'btn-success' : 'btn-primary'}`} onClick={save}><Save size={14} /> {saved ? 'Saved!' : 'Save'}</button>
      </div>
      <div className="admin-card">
        <h3>Meta Title</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          <div><label className="form-label">English</label><input className="form-input" value={title.en} onChange={e => setTitle(p => ({ ...p, en: e.target.value }))} /></div>
          <div><label className="form-label">Italian</label><input className="form-input" value={title.it} onChange={e => setTitle(p => ({ ...p, it: e.target.value }))} /></div>
        </div>
      </div>
      <div className="admin-card">
        <h3>Meta Description</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          <div><label className="form-label">English</label><textarea className="form-textarea" value={desc.en} onChange={e => setDesc(p => ({ ...p, en: e.target.value }))} /></div>
          <div><label className="form-label">Italian</label><textarea className="form-textarea" value={desc.it} onChange={e => setDesc(p => ({ ...p, it: e.target.value }))} /></div>
        </div>
      </div>
    </div>
  );
}

// Clients
function ClientsEditor({ content, updateContent }: { content: SiteContent; updateContent: (u: Partial<SiteContent>) => void }) {
  const [clients, setClients] = useState(content.clients);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  const save = () => { updateContent({ clients }); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)' }}>Clients</h2>
        <button className={`btn btn-sm ${saved ? 'btn-success' : 'btn-primary'}`} onClick={save}><Save size={14} /> {saved ? 'Saved!' : 'Save'}</button>
      </div>
      <div className="admin-card">
        <h3>Add Client</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <input className="form-input" placeholder="Client name" value={name} onChange={e => setName(e.target.value)} />
          <button className="btn btn-primary btn-sm" onClick={() => { if (name) { setClients(p => [...p, { id: Date.now().toString(), name, logo: '' }]); setName(''); } }}><Plus size={14} /> Add</button>
        </div>
      </div>
      <div className="admin-card">
        <h3>Current Clients</h3>
        <div style={{ display: 'grid', gap: 8 }}>
          {clients.map(c => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--off-white)', borderRadius: 'var(--radius)' }}>
              <input className="form-input" value={c.name} onChange={e => setClients(prev => prev.map(x => x.id === c.id ? { ...x, name: e.target.value } : x))} style={{ flex: 1 }} />
              <button className="btn btn-sm btn-danger" onClick={() => setClients(prev => prev.filter(x => x.id !== c.id))}><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Admin Panel
export default function AdminPanel() {
  const { content, updateContent, isAdmin, setIsAdmin } = useCMS();
  const [tab, setTab] = useState<Tab>('dashboard');

  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 48, maxWidth: 400, width: '100%', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ width: 64, height: 64, background: 'var(--navy)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Anchor size={28} color="var(--accent)" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', letterSpacing: '0.03em', marginBottom: 8 }}>CMS Admin</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 14 }}>Enter the admin password to access the content management system.</p>
          <form onSubmit={e => {
            e.preventDefault();
            const input = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
            if (input === 'admin123') setIsAdmin(true);
            else alert('Incorrect password');
          }}>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label">Password</label>
              <input name="password" type="password" className="form-input" placeholder="Enter admin password" autoComplete="current-password" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Login to CMS</button>
          </form>
          <p style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>Demo password: admin123</p>
          <Link to="/" style={{ display: 'block', marginTop: 16, color: 'var(--ocean)', fontSize: 14 }}>← Back to Website</Link>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (tab) {
      case 'dashboard': return <Dashboard content={content} setTab={setTab} />;
      case 'hero': return <HeroEditor content={content} updateContent={updateContent} />;
      case 'services': return <ServicesEditor content={content} updateContent={updateContent} />;
      case 'projects': return <ProjectsManager content={content} updateContent={updateContent} />;
      case 'clients': return <ClientsEditor content={content} updateContent={updateContent} />;
      case 'contact': return <ContactEditor content={content} updateContent={updateContent} />;
      case 'seo': return <SEOEditor content={content} updateContent={updateContent} />;
      default: return <Dashboard content={content} setTab={setTab} />;
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar tab={tab} setTab={setTab} onLogout={() => { setIsAdmin(false); window.location.href = '/'; }} />
      <div className="admin-main">
        <div className="admin-header">
          <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            Admin <ChevronRight size={12} />
            <span style={{ color: 'var(--navy)', fontWeight: 600, textTransform: 'capitalize' }}>{tab}</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-condensed)', fontSize: 13, color: 'var(--text-muted)' }}>Logged in as Administrator</span>
            <Link to="/" target="_blank" className="btn btn-sm" style={{ background: 'var(--off-white)', color: 'var(--navy)' }}>
              <Eye size={13} /> View Site
            </Link>
          </div>
        </div>
        <div className="admin-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
