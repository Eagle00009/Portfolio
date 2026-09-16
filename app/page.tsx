import fs from 'node:fs';
import path from 'node:path';
import Script from 'next/script';
import { ThumbnailCarousel } from '@/components/ui/thumbnail-carousel';
import GlyphPortalDemo from '@/components/ui/glyph-portal-demo';
import NamePortal from '@/components/ui/name-portal';
import { personalPhotos } from '@/lib/gallery';
export default function Home() {
  const read = (file: string) => fs.readFileSync(path.join(process.cwd(), 'content', file), 'utf8');
  return <><NamePortal /><div dangerouslySetInnerHTML={{__html: read('before-gallery.html')}} /><GlyphPortalDemo /><section id="gallery" className="py-20 bg-dark border-y border-white/5"><div className="container mx-auto px-6 text-center"><p className="text-accent uppercase tracking-[0.25em] text-xs mb-3">Beyond work</p><h2 className="text-3xl sm:text-4xl font-bold">Life Through <span className="text-accent">My Lens</span></h2><p className="text-textMuted mt-4 mb-6">A few moments, places, and perspectives from my collection. Swipe to explore.</p><ThumbnailCarousel images={personalPhotos} photoGallery /></div></section><div dangerouslySetInnerHTML={{__html: read('after-gallery.html')}} /><Script src="/portfolio.js" strategy="afterInteractive" /></>;
}
