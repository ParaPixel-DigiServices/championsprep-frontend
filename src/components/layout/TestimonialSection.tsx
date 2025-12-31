import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%", 
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(".testimonial-header", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" } 
      );

      tl.fromTo(contentWrapperRef.current,
        { x: "20%", opacity: 0 }, 
        { 
          x: "0%", 
          opacity: 1, 
          duration: 1.8, 
          ease: "power2.out" 
        },
        "-=0.6"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-50 py-24 md:py-32 bg-[#FFFDF5] overflow-hidden">
      <div className="testimonial-header text-center mb-16 md:mb-24 px-5">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#060027] font-sans tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Families see calmer <span className="text-[#6d28d9]">study weeks</span> and stronger <span className="text-[#6d28d9]">scores</span>
        </h2>
        <p className="text-[#060027]/60 text-lg font-serif max-w-2xl mx-auto leading-relaxed">
          Real words from students, parents, and mentors using ChampionsPrep today.
        </p>
      </div>
      <div ref={contentWrapperRef} className="relative w-full flex items-center justify-center min-h-[450px] md:min-h-[550px] opacity-0 transform-gpu z-30">
        <div className="absolute right-0 h-[450px] md:h-[550px] w-[90%] md:w-[55%] bg-[#E0D5FF] rounded-l-[225px] md:rounded-l-[275px] z-30 pointer-events-none"></div>
        <div className="relative z-40 bg-[#0F0529] rounded-[2.5rem] p-8 md:p-14 shadow-2xl text-white max-w-md md:max-w-3xl mx-4">
          <blockquote className="text-lg md:text-[1.35rem] font-serif leading-relaxed opacity-90 text-center mb-10 md:mb-12">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu."
          </blockquote>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-[#FFFDF5] rounded-full shadow-inner"></div>
            <div className="text-center">
              <h4 className="text-xl md:text-2xl font-bold mb-1">Amogh</h4>
              <p className="text-white/60 text-sm md:text-base">Student of Class 12</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}