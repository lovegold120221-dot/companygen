import React, { useState, useEffect } from 'react';
import './BrandDashboard.css';
import { BrandProfile, DOCS, getDefaults, buildDocumentHTML } from '../lib/documentGenerator';

export const BrandDashboard: React.FC<{ brand: BrandProfile, onReset: () => void }> = ({ brand, onReset }) => {
  const [activeTab, setActiveTab] = useState('documents');
  const [selectedDocId, setSelectedDocId] = useState('letterhead');
  const [formData, setFormData] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    setFormData(getDefaults(brand));
  }, [brand]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectedDoc = DOCS.find(d => d.id === selectedDocId) || DOCS[0];
  const htmlContent = buildDocumentHTML(selectedDoc, formData, brand);

  const renderNav = (id: string, code: string, title: string, count: string) => (
    <li className={`nav-item ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>
      <span className="nav-code">{code}</span>
      <span className="nav-text">{title}</span>
      <span className="nav-count">{count}</span>
    </li>
  );

  return (
    <div className="brand-dashboard" style={{
      '--brand-primary': brand.primary_color,
      '--brand-primary-light': brand.primary_color_light || brand.primary_color,
      '--brand-secondary': brand.secondary_color,
      '--brand-bg': brand.background_color,
      '--brand-text': brand.text_color,
      '--brand-card': '#171717',
      '--brand-primary-alpha10': `${brand.primary_color}1a`,
      '--brand-primary-alpha15': `${brand.primary_color}26`,
      '--brand-primary-alpha20': `${brand.primary_color}33`,
      '--brand-primary-alpha50': `${brand.primary_color}80`,
    } as React.CSSProperties}>
      <aside className="brand-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 10px 18px', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
          <div className="brand-mark" dangerouslySetInnerHTML={{__html: brand.logo_svg}}></div>
          <div>
            <h1 style={{ color: 'var(--brand-primary)', fontSize: '16px', margin: 0 }}>{brand.company_name}</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', marginTop: '3px', fontWeight: 700 }}>ASSET + DOCUMENT STUDIO</p>
          </div>
        </div>

        <div>
          <div className="nav-label">Core Identity</div>
          <ul className="nav-list">
            {renderNav('logo', '01', 'Logo & Brand Identity', '6')}
            {renderNav('guide', '02', 'Brand Guide', '3')}
            {renderNav('cards', '03', 'Business Card', '2')}
          </ul>
        </div>
        <div>
          <div className="nav-label">HTML Documents</div>
          <ul className="nav-list">
            {renderNav('documents', '04', 'Stationery & Documents', '12')}
          </ul>
        </div>
        <div>
          <div className="nav-label">Digital Assets</div>
          <ul className="nav-list">
            {renderNav('posts', '07', 'Social Post Templates', '3')}
            {renderNav('website', '08', 'Website Preview', 'UI')}
            {renderNav('reels', '15', 'Shorts / Reels', '3')}
          </ul>
        </div>
        
        <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button className="brand-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={onReset}>Generate Another</button>
        </div>
      </aside>

      <main className="dashboard-main">
        {activeTab === 'documents' && (
          <section className="section active">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <div className="eyebrow">04. Stationery & Documents</div>
                <h2 className="header-title">Dynamic HTML Documents</h2>
              </div>
            </div>
            <div className="doc-studio">
              <aside className="doc-sidebar">
                <input className="doc-search" placeholder="Search documents..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                <div className="doc-list">
                  {DOCS.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase())).map(doc => (
                    <div key={doc.id} className={`doc-tile ${doc.id === selectedDocId ? "active" : ""}`} onClick={() => setSelectedDocId(doc.id)}>
                      <div style={{ width: '56px', height: '70px', borderRadius: '7px', background: '#fff', position: 'relative' }}></div>
                      <div>
                        <div className="meta">{doc.code} · {doc.category}</div>
                        <h4>{doc.title}</h4>
                        <p style={{ margin: 0, opacity: 0.7, fontSize: '11px' }}>{doc.purpose}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
              <div className="studio-main">
                <div className="preview-shell">
                   <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                     <strong style={{ color: 'var(--brand-primary)'}}>Preview: {selectedDoc.title}</strong>
                   </div>
                   <iframe className="preview-frame" srcDoc={htmlContent}></iframe>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'logo' && (
          <section className="section active">
            <div className="eyebrow">01. Logo & Brand Identity</div>
            <h2 className="header-title">Logo Assets</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div className="logo-preview">
                 <div dangerouslySetInnerHTML={{__html: brand.logo_svg}} style={{ width: '92px', height: '92px', margin: '0 auto' }}></div>
                 <div className="logo-name">{brand.company_name}</div>
                 <div className="logo-sub">{brand.company_legal_name}</div>
              </div>
              <div className="logo-preview">
                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                   <div dangerouslySetInnerHTML={{__html: brand.logo_svg}} style={{ width: '60px', height: '60px' }}></div>
                   <div style={{ textAlign: 'left' }}>
                     <div className="logo-name" style={{ marginTop: 0 }}>{brand.company_name}</div>
                   </div>
                 </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'posts' && (
          <section className="section active">
            <div className="eyebrow">07. Social Media Post Templates</div>
            <h2 className="header-title">Post Templates</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {brand.social_posts.map((post: any, i: number) => (
                <div key={i} className="post-card">
                  <div dangerouslySetInnerHTML={{__html: brand.logo_svg}} style={{ width: '34px', height: '34px' }}></div>
                  <h4 style={{ color: i % 2 === 0 ? '#fff' : 'var(--brand-primary)' }}>{post.text}</h4>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>{post.sub}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'reels' && (
          <section className="section active">
            <div className="eyebrow">15. Shorts / Reels Placeholder</div>
            <h2 className="header-title">Animated Concept</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>A CSS-animated vertical concept perfect for stories or reels.</p>
            <div style={{ 
               width: '315px', height: '560px', borderRadius: '24px', margin: '0 auto', 
               overflow: 'hidden', position: 'relative', border: '8px solid #222', background: 'var(--brand-bg)' 
            }}>
               <div style={{ 
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', 
                  alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center',
                  background: 'var(--brand-primary-alpha15)'
               }}>
                  <div dangerouslySetInnerHTML={{__html: brand.logo_svg}} style={{ width: '80px', height: '80px', marginBottom: '24px' }}></div>
                  <h1 style={{ color: 'var(--brand-primary)', fontSize: '32px', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '16px' }}>
                     {brand.slogan_1}
                  </h1>
                  <p style={{ fontSize: '18px', color: '#fff', opacity: 0.8 }}>{brand.slogan_2}</p>
               </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
