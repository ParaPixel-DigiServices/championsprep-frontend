import React, { useEffect, useRef } from 'react';
import { BookOpen, Briefcase, TrendingUp } from 'lucide-react'; // Changed icon for Economics
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- SEO UPDATE: Replaced "Friend Challenges" with "Economics" ---
// Google ranks pages higher that cover the full syllabus (Accounts + BST + Eco).
const subjects = [
  {
    id: 1,
    title: "Accountancy",
    icon: <BookOpen className="w-6 h-6 text-[#060027]" />,
    // Keywords: Partnership, Shares, Cash Flow are high volume
    tags: ["Partnership Fundamentals", "Company Accounts (Shares)", "Cash Flow Statements", "Analysis of Financial Statements"]
  },
  {
    id: 2,
    title: "Business Studies",
    icon: <Briefcase className="w-6 h-6 text-[#060027]" />,
    // Keywords: Case Studies is a huge pain point for students
    tags: ["Principles of Management", "Marketing Management", "BST Case Studies", "Financial Markets"]
  },
  {
    id: 3,
    title: "Economics",
    icon: <TrendingUp className="w-6 h-6 text-[#060027]" />,
    // Keywords: Macro/Micro distinctions are frequently searched
    tags: ["Introductory Macroeconomics", "Indian Economic Development", "Statistics for Economics", "Microeconomics Graphs"]
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
    <section ref={containerRef} className="py-24 px-5 md:px-12 bg-[#FBF8FF] relative overflow-hidden z-30">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="coverage-header text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#060027] font-sans tracking-tight mb-6">
            Complete syllabus coverage for <br className="hidden md:block" />
            <span className="text-[#6d28d9]">Class 11 & 12 Commerce</span>
          </h2>
          <p className="text-[#060027]/60 text-lg font-serif max-w-3xl mx-auto leading-relaxed">
            From <strong>Balance Sheets</strong> to <strong>Macroeconomics curves</strong>, every concept is reviewed by CBSE board examiners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {subjects.map((subject) => (
            <article 
              key={subject.id} 
              className="coverage-card group bg-[#F0F0FF] rounded-2xl p-6 md:p-8 border border-[#060027]/5 hover:border-[#6d28d9]/20 hover:shadow-[0_10px_30px_-10px_rgba(109,40,217,0.2)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
            >

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {subject.icon}
                </div>
                <h3 className="text-xl font-bold text-[#060027]">
                  {subject.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-auto">
                {subject.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="coverage-pill bg-white px-4 py-2 rounded-full text-sm font-medium text-[#060027]/80 border border-[#060027]/5 shadow-sm group-hover:border-[#6d28d9]/10 group-hover:text-[#6d28d9] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}