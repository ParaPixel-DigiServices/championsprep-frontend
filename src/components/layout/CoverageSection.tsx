import React, { useEffect, useRef } from 'react';
import { BookOpen, Briefcase, Swords } from 'lucide-react'; // 'Swords' for Friend Challenges
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const subjects = [
  {
    id: 1,
    title: "Accountancy",
    icon: <BookOpen className="w-6 h-6 text-[#060027]" />,
    tags: ["Partnership", "Company Accounts", "Financial Statements", "Cash Flow"]
  },
  {
    id: 2,
    title: "Business Studies",
    icon: <Briefcase className="w-6 h-6 text-[#060027]" />,
    tags: ["Principles of Management", "Marketing Management", "Planning", "Organising"]
  },
  {
    id: 3,
    title: "Friend Challenges",
    icon: <Swords className="w-6 h-6 text-[#060027]" />,
    tags: ["1v1 Battles", "Weekly Leaderboard", "Topic Wars", "Streak Saver"]
  }
];

export default function CoverageSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(".coverage-header", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      tl.fromTo(".coverage-card", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
        "-=0.4"
      );

      tl.fromTo(".coverage-pill",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.7)" },
        "-=0.4"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-5 md:px-12 bg-[#FFFDF5] relative overflow-hidden z-30">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="coverage-header text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#060027] font-sans tracking-tight mb-6">
            Complete coverage for <br className="hidden md:block" />
            <span className="text-[#6d28d9]">Class 11 and 12 Commerce</span>
          </h2>
          <p className="text-[#060027]/60 text-lg font-serif max-w-3xl mx-auto leading-relaxed">
            Every concept map, lesson, and practice deck is reviewed by board examiners and updated each term.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {subjects.map((subject) => (
            <div 
              key={subject.id} 
              className="coverage-card group bg-[#F0F0FF] rounded-2xl p-6 md:p-8 border border-[#060027]/5 hover:border-[#6d28d9]/20 hover:shadow-[0_10px_30px_-10px_rgba(109,40,217,0.2)] hover:-translate-y-2 transition-all duration-300"
            >

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {subject.icon}
                </div>
                <h3 className="text-xl font-bold text-[#060027]">
                  {subject.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {subject.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="coverage-pill bg-white px-4 py-2 rounded-full text-sm font-medium text-[#060027]/80 border border-[#060027]/5 shadow-sm group-hover:border-[#6d28d9]/10 group-hover:text-[#6d28d9] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}