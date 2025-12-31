import React, { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Home, BookOpen, MessageCircle, ArrowLeft } from 'lucide-react';
import SEO from '../components/seo/SEO';

// Define a type for our star data
interface Star {
  id: number;
  width: string;
  height: string;
  top: string;
  left: string;
  opacity: number;
}

const NotFound: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const astronautRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // --- FIX: Generate stars once and cache them ---
  const stars = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      width: Math.random() * 3 + 'px',
      height: Math.random() * 3 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      opacity: Math.random(),
    }));
  }, []); // Empty array means only calculate once

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (astronautRef.current) {
        gsap.to(astronautRef.current, {
          y: -20,
          rotation: 0.01,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      if (textRef.current) {
        gsap.from(Array.from(textRef.current.children), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        });
      }

      gsap.to(".star", {
        opacity: 0.3,
        duration: "random(1, 3)",
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 2,
          grid: "auto",
          from: "random"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-[#060027] flex flex-col items-center justify-center px-6 overflow-hidden relative"
    >
      <SEO 
        title="404 - Page Not Found" 
        description="Oops! It looks like you've drifted off course. Let's get you back to your Commerce board prep."
      />
      {stars.map((star) => (
        <div 
          key={star.id} 
          className="star absolute bg-white rounded-full pointer-events-none" 
          style={{
            width: star.width,
            height: star.height,
            top: star.top,
            left: star.left,
            opacity: star.opacity
          }}
        />
      ))}

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        <div ref={astronautRef} className="flex justify-center relative">
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6d28d9] to-[#3b1578] rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <img 
              src="/astro.png" 
              alt="404 Lost in Space Astronaut"
              className="relative z-10 w-full h-full object-contain"
              loading="eager"
            />
          </div>
        </div>

        <div ref={textRef} className="text-center md:text-left">
          <h1 className="text-[#6d28d9] font-black text-8xl md:text-9xl mb-4 tracking-tighter">404</h1>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 font-sans">
            Drifting off course?
          </h2>
          <p className="text-white/60 text-lg mb-10 font-serif leading-relaxed">
            Even the best Champions take a wrong turn sometimes. Let's get your board exam prep back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/">
              <button className="flex items-center justify-center gap-2 bg-[#6d28d9] hover:bg-[#5b21b6] text-white px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto shadow-lg shadow-purple-900/20">
                <Home className="w-5 h-5" />
                Back to Mission Control
              </button>
            </Link>
            
            <Link to="/#curriculum">
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto backdrop-blur-sm">
                <BookOpen className="w-5 h-5" />
                View Syllabus
              </button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center md:justify-start gap-6 text-white/40">
            <Link to="/#faq" className="hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
              <MessageCircle className="w-4 h-4" /> Help Center
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20">
        <img src="/logo.png" alt="ChampionsPrep Logo" className="h-8 grayscale brightness-200" />
      </div>
    </div>
  );
};

export default NotFound;