"use client";

import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface CarouselImage { src: string; alt: string }
export const defaultImages: CarouselImage[] = [
  {src:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85',alt:'Mountain peaks under drifting clouds'},
  {src:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85',alt:'Alpine lake reflecting the mountains'},
  {src:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=85',alt:'Sunlight filtering through a green forest'},
  {src:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85',alt:'Boats beside a peaceful mountain lake'},
  {src:'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=900&q=85',alt:'Ocean waves at sunset'},
  {src:'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=900&q=85',alt:'Woodland filled with soft morning light'},
  {src:'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=85',alt:'Sunlit mountain wilderness'},
];
const SPRING_OPTIONS = {type:'spring' as const, mass:3, stiffness:400, damping:50};
export function ThumbnailCarousel({images = defaultImages, autoDelay = 5000, photoGallery = false}: {images?: CarouselImage[]; autoDelay?: number; photoGallery?: boolean}) {
  const [imgIndex, setImgIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();
  const dragX = useMotionValue(0);
  const index = Math.min(imgIndex, Math.max(0, images.length - 1));
  const move = (delta: number) => setImgIndex((current) => (Math.min(current, images.length-1) + delta + images.length) % images.length);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update(); document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  useEffect(() => {
    if (paused || hovered || focused || dragging || !visible || reducedMotion || images.length < 2 || autoDelay <= 0) return;
    const timer = setInterval(() => setImgIndex(current => (current + 1) % images.length), autoDelay);
    return () => clearInterval(timer);
  }, [paused, hovered, focused, dragging, visible, reducedMotion, images.length, autoDelay, index]);
  if (!images.length) return null;
  return <div role="region" aria-roledescription="carousel" aria-label={photoGallery ? "Personal photo gallery" : "Landscape gallery"} className={`mx-auto w-full select-none py-2 ${photoGallery ? "max-w-2xl" : "max-w-96"}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => {if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);}} onKeyDown={event => {if(event.key === 'ArrowRight') {event.preventDefault(); move(1);} if(event.key === 'ArrowLeft') {event.preventDefault(); move(-1);}}}>
    <div className="overflow-hidden rounded-2xl">
      <motion.div drag={images.length > 1 ? 'x' : false} dragConstraints={{left:0,right:0}} style={{x:dragX, touchAction:'pan-y'}} animate={{translateX:`-${index * 100}%`}} transition={reducedMotion ? {duration:0} : SPRING_OPTIONS} onDragStart={() => setDragging(true)} onDragEnd={(_, info) => {if(info.offset.x <= -50 && index < images.length-1) setImgIndex(index+1); else if(info.offset.x >= 50 && index > 0) setImgIndex(index-1); setDragging(false);}} className="flex cursor-grab active:cursor-grabbing">
        {images.map((img, idx) => <motion.div key={`${img.src}-${idx}`} role="group" aria-roledescription="slide" aria-label={`${idx+1} of ${images.length}`} aria-hidden={index !== idx} animate={{scale:index === idx ? .95 : .85}} transition={reducedMotion ? {duration:0} : SPRING_OPTIONS} className={`relative w-full shrink-0 overflow-hidden rounded-2xl shadow-2xl ${photoGallery ? "aspect-[4/3] bg-cardDark" : "aspect-square"}`}><Image src={img.src} alt={img.alt} fill draggable={false} className={`${photoGallery ? "object-contain" : "object-cover"} pointer-events-none`} sizes={photoGallery ? "(max-width: 720px) calc(100vw - 48px), 672px" : "(max-width: 432px) calc(100vw - 48px), 384px"} priority={idx === 0} /></motion.div>)}
      </motion.div>
    </div>
    <div className="mt-4 flex gap-2 items-center overflow-x-auto p-2" aria-label="Choose an image">
      {images.map((img, idx) => <button key={`${img.src}-${idx}`} type="button" onClick={() => setImgIndex(idx)} aria-label={`Go to slide ${idx+1}: ${img.alt}`} aria-current={index === idx ? 'true' : undefined} className={`relative h-11 w-11 sm:h-13 sm:w-13 shrink-0 rounded-lg overflow-hidden transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 ${index === idx ? 'scale-110 ring-2 ring-white/60 shadow-md opacity-100' : 'opacity-60 hover:opacity-90'}`}><Image src={img.src} alt="" fill draggable={false} className="object-cover" sizes="52px" /></button>)}
    </div>
    {images.length > 1 && <div className="flex items-center justify-center gap-4 mt-3 text-textMuted"><button type="button" aria-label="Previous slide" onClick={() => move(-1)} className="p-3 rounded-full hover:bg-white/10 focus-visible:outline-2"><ChevronLeft size={18}/></button><span className="text-sm tabular-nums">{index+1} / {images.length}</span>{!reducedMotion && autoDelay > 0 && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} className="p-3 rounded-full hover:bg-white/10 focus-visible:outline-2">{paused ? <Play size={16}/> : <Pause size={16}/>}</button>}<button type="button" aria-label="Next slide" onClick={() => move(1)} className="p-3 rounded-full hover:bg-white/10 focus-visible:outline-2"><ChevronRight size={18}/></button></div>}
  </div>;
}
export default ThumbnailCarousel;
