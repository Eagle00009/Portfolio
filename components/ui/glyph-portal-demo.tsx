import GlyphPortal from '@/components/ui/glyph-portal';

export default function GlyphPortalDemo() {
  return <GlyphPortal word="BUILD" scrollLength={1.4} enterLabel="Explore what I’m building" className="portfolio-portal" background={<div className="portal-scene" />} style={{'--gp-paper':'var(--background)', '--gp-ink':'var(--foreground)', '--gp-field':'var(--portal-field)', '--gp-foreground':'var(--portal-foreground)'}}>
    <div className="portal-story">
      <p className="portal-eyebrow">From requirements to real use</p>
      <h2>Building systems.<br />Supporting the people using them.</h2>
      <div className="portal-details">
        <div><span>01 / IMPLEMENT</span><h3>ERP in practice</h3><p>Configuration, data migration, UAT, and go-live support across 10+ client organizations.</p></div>
        <div><span>02 / UNDERSTAND</span><h3>Make data useful</h3><p>Clean data, reliable reports, and dashboards that help teams understand their operations.</p></div>
        <div><span>03 / BUILD</span><h3>AI for implementation</h3><p>Currently developing an AI chatbot for implementation work, informed by hands-on experience.</p></div>
      </div>
    </div>
  </GlyphPortal>;
}
