import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- SEO UPDATE: Keywords for credibility and scale ---
const statsData = [
  { value: 18500, suffix: "+", label: "Commerce Learners Mentored", decimals: 0 },
  { value: 92, suffix: "%", label: "Average Improvement in Concept Mastery", decimals: 0 },
  { value: 120, suffix: "+", label: "CBSE Syllabus Topics Mastered", decimals: 0 },
  { value: 4.8, suffix: "/5", label: "Top-Rated Parent Satisfaction", decimals: 1 },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%", 
          toggleActions: "play none none reverse"
        }
      });

      tl.from(cardRef.current, {
        x: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      statsData.forEach((stat, index) => {
        const el = numberRefs.current[index];
        if (!el) return;

        const counter = { val: 0 }; 

        tl.to(counter, {
          val: stat.value,
          duration: 2, 
          ease: "power2.out",
          onUpdate: () => {
            const formatted = counter.val.toLocaleString('en-US', {
              minimumFractionDigits: stat.decimals,
              maximumFractionDigits: stat.decimals
            });
            el.textContent = `${formatted}${stat.suffix}`;
          }
        }, 
        index === 0 ? "-=0.8" : "<" 
        ); 
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-6 md:px-12 relative z-50 bg-[#FBF8FF]">
      <div className="max-w-7xl mx-auto relative">
        <div 
          ref={cardRef} 
          className="relative w-full rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden p-12 md:p-16 flex items-center justify-center shadow-2xl"
          style={{
            background: 'linear-gradient(105deg, #0F0838 0%, #1A0B2E 40%, #4F28AB 100%)'
          }}
        >

          <svg className="absolute inset-0 w-full h-full mix-blend-overlay opacity-70 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilterBg">
              <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilterBg)" />
          </svg>

          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <svg className="absolute bottom-0 left-0 text-white opacity-10 w-48 h-48 transform translate-y-1/2 -translate-x-1/2" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="2"/>
              <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="2"/>
              <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <svg className="absolute top-0 right-0 text-white opacity-10 w-56 h-56 transform -translate-y-1/2 translate-x-1/2" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="2"/>
              <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="2"/>
              <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="2"/>
              <circle cx="100" cy="100" r="38" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full text-center">
            {statsData.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-start space-y-2">
                <h3 
                  ref={(el) => { numberRefs.current[index] = el; }}
                  className="text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight"
                >
                  0{stat.suffix} 
                </h3>
                <p className="text-white/80 font-serif text-sm md:text-base leading-tight max-w-[160px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}