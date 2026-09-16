import GlyphPortal from '@/components/ui/glyph-portal';

export default function NamePortal() {
  return <GlyphPortal word="JEEVESH SINGH" scrollLength={1} className="portfolio-portal name-portal" enterLabel="Meet Jeevesh" background={<div className="portal-scene name-scene" />} style={{'--gp-paper':'var(--background)', '--gp-ink':'var(--foreground)', '--gp-field':'var(--portal-field)', '--gp-foreground':'var(--portal-foreground)'}} front={<div className="name-intro"><p>Implementation Engineer · Data &amp; AI</p><span>Welcome to my portfolio</span></div>}>
    <div className="portal-story name-story"><p className="portal-eyebrow">Jeevesh Singh · Noida, India</p><h2>Turning everyday challenges<br />into useful systems.</h2><p>ERP implementation, data analytics, and an AI chatbot in the making.</p><a href="#home" className="name-profile-link">Explore my portfolio <span aria-hidden="true">↗</span></a></div>
  </GlyphPortal>;
}
