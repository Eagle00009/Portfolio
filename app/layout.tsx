import type { Metadata } from 'next';
import './globals.css';
import { ThemeToggle } from '@/components/ui/theme-toggle';
export const metadata: Metadata = { title: 'Jeevesh Singh | ERP Implementation & Data Analytics', description: 'Implementation Engineer at CBO ERP Limited with 10+ client ERP implementations. Explore my data analytics projects, skills, and AI chatbot for implementation work.' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" className="scroll-smooth" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html: `(function(){var t;try{t=localStorage.getItem('portfolio-theme')}catch(e){}if(t!=='light'&&t!=='dark')t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t})()`}} /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" /></head><body className="bg-dark text-textMain font-sans antialiased selection:bg-accent selection:text-dark relative theme-ivory">{children}<ThemeToggle /></body></html>;
}
