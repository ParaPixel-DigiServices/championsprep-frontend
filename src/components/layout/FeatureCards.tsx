import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Target } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    title: "MCQ Quiz",
    description: "Every unit begins with a diagnostic pulse. Students see a tailored lesson path focusing on exact CBSE competencies.",
    items: ["Video explainers", "AI-Built flashcards", "Real-time difficulty adaption"]
  },
  {
    id: 2,
    title: "Daily Practice",
    description: "Short, sharp problem sets designed to keep retention high without overwhelming the student's daily schedule.",
    items: ["Streak tracking", "Mistake analysis", "Peer comparison"]
  },
  {
    id: 3,
    title: "Mock Exams",
    description: "Full-length simulations that mirror the actual board pattern, ensuring time management is mastered before the big day.",
    items: ["Pattern-exact papers", "Detailed marking scheme", "Predicted score range"]
  }
];

export default function QuizFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const hideScrollbarStyles = `
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;  
      scrollbar-width: none;  
    }
  `;

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      const index = Math.round(scrollLeft / width); 
      setActiveIndex(index);
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const child = scrollContainerRef.current.children[index] as HTMLElement;
      if (child) {
        const containerWidth = scrollContainerRef.current.offsetWidth;
        const cardWidth = child.offsetWidth;
        const centerOffset = (containerWidth - cardWidth) / 2;
        
        scrollContainerRef.current.scrollTo({
          left: child.offsetLeft - centerOffset, 
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".quiz-anim-item", { y: 60, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", 
          toggleActions: "play none none reverse"
        }
      });

      tl.to(".title-anim", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      });

      tl.to(".card-anim", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2, 
        ease: "back.out(1.2)"
      }, "-=0.4");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-40 py-20 md:py-32 px-5 md:px-12 bg-[#FFFDF5] overflow-hidden">
  
      <style>{hideScrollbarStyles}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="quiz-anim-item title-anim text-center mb-8 md:mb-16"> 
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#060027] font-sans tracking-tight">
             Diagnostic-First Learning
          </h2>
          <p className="text-[#060027]/60 mt-4 text-lg font-serif max-w-2xl mx-auto">
            Identify gaps before they become exam fears with our smart assessment engine.
          </p>
        </div>

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="hide-scrollbar flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-8 py-10 -my-10 snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0"
        >
          {features.map((feature) => (
            <div key={feature.id} className="quiz-anim-item card-anim snap-center shrink-0 w-[85vw] md:w-auto h-full">
               <QuizCard {...feature} />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-3 mt-6 md:hidden">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === index 
                  ? 'w-8 h-2 bg-[#060027]' 
                  : 'w-2 h-2 bg-[#060027]/20'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function QuizCard({ title, description, items }: { title: string, description: string, items: string[] }) {
  return (
    <div className="group relative h-full rounded-2xl p-8 border border-white/10 overflow-hidden shadow-xl transition-all duration-500 ease-out md:hover:-translate-y-4 md:hover:shadow-2xl md:hover:border-white/30">
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#3b1578] to-[#1a0b2e] z-0"></div>

      <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none z-0"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-60 transition-all duration-700 ease-out md:group-hover:rotate-12 md:group-hover:scale-110 md:group-hover:opacity-80 pointer-events-none z-0 origin-bottom-right">
        <QuarterOrbit color="#ffffff" />
      </div>

      <div className="relative z-10 flex flex-col h-full text-white">
        
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-white/10 border border-white/10 backdrop-blur-md shadow-inner transition-colors md:group-hover:bg-white/20">
            <Target className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        </div>

        <p className="text-white/80 text-sm leading-relaxed mb-8 font-medium font-sans">
          {description}
        </p>

        <div className="mt-auto space-y-3 pt-6 border-t border-white/10">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-white/90 font-medium">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuarterOrbit({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none" style={{ stroke: color }}>
      <circle cx="100" cy="100" r="90" strokeWidth="0.5" opacity="0.4" />
      <circle cx="100" cy="100" r="70" strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="100" r="50" strokeWidth="2" opacity="0.6" />
      <circle cx="100" cy="100" r="30" strokeWidth="3" opacity="0.7" />
    </svg>
  );
}