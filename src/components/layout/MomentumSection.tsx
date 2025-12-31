import React, { useEffect, useRef } from 'react';
import { Clock, TrendingUp, Target } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    number: "1",
    title: "10-Minute Commerce Readiness Diagnostics",
    description: "Students complete a low-pressure baseline to map strengths and gaps across the CBSE Class 11 or 12 commerce syllabus, specifically for Accountancy and Economics.",
    card: {
      icon: <Clock className="w-6 h-6 text-[#3b1578]" />,
      label: "Time Saved",
      value: "2.5 hours/week",
      rotate: "rotate-2" 
    }
  },
  {
    id: 2,
    number: "2",
    title: "Personalized Weekly Study Playlists",
    description: "ChampionsPrep crafts curated lesson and practice playlists that balance new CBSE topics with revision to ensure peak performance in board exams.",
    card: {
      icon: <TrendingUp className="w-6 h-6 text-[#3b1578]" />,
      label: "Score Impact",
      value: "+15% avg improvement",
      rotate: "-rotate-1"
    }
  },
  {
    id: 3,
    number: "3",
    title: "Automated Board Prep Progress Tracking",
    description: "Families receive automated improvement charts and next-step recommendations, keeping parents informed on board exam readiness without the chase.",
    card: {
      icon: <Target className="w-6 h-6 text-[#3b1578]" />,
      label: "Accuracy",
      value: "Identified weak spots",
      rotate: "rotate-1"
    }
  }
];

export default function MomentumSection() {
  const containerRef = useRef(null);
  const lineContainerRef = useRef(null);

  const floatStyle = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .floating-card {
      animation: float 4s ease-in-out infinite;
    }
    .floating-card-delay-1 { animation-delay: 0s; }
    .floating-card-delay-2 { animation-delay: 1.5s; }
    .floating-card-delay-3 { animation-delay: 0.7s; }
  `;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".momentum-active-line", 
        { height: "0%" },
        { 
          height: "100%", 
          ease: "none", 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%", 
            end: "bottom 80%", 
            scrub: 1
          }
        }
      );

      steps.forEach((step) => {
        gsap.fromTo(`.step-circle-${step.id}`,
          { backgroundColor: "#FBF8FF", color: "#ddd", borderColor: "#ddd" },
          { 
            backgroundColor: "#FBF8FF",
            color: "#3b1578",           
            borderColor: "#3b1578",     
            duration: 0.5,
            scrollTrigger: {
              trigger: `.step-row-${step.id}`,
              start: "top 70%", 
              toggleActions: "play reverse play reverse" 
            }
          }
        );

        gsap.fromTo(`.step-content-${step.id}`,
          { opacity: 0.3, x: -10 },
          { 
            opacity: 1, x: 0, 
            duration: 0.5,
            scrollTrigger: {
              trigger: `.step-row-${step.id}`,
              start: "top 75%",
              end: "bottom 75%",
              toggleActions: "play reverse play reverse",
              scrub: 0.5
            }
          }
        );

        gsap.from(`.step-card-${step.id}`, {
          scale: 0.8,
          opacity: 0,
          rotate: 10,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: `.step-row-${step.id}`,
            start: "top 75%",
            toggleActions: "play reverse play reverse"
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-5 md:px-12 bg-[#FBF8FF] overflow-hidden relative z-30">
      <style>{floatStyle}</style>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#060027] font-sans tracking-tight mb-6">
            Maintain <span className="text-[#6d28d9]">Study Momentum</span> for Board Exams
          </h2>
          <p className="text-[#060027]/60 text-lg font-serif max-w-3xl mx-auto leading-relaxed">
            ChampionsPrep blends <strong>personalized learning</strong> with high accountability so parents and mentors stay informed on every <strong>CBSE Commerce</strong> milestone.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-[20px] md:left-[28px] top-0 bottom-0 w-px z-0">
             <div className="w-px h-full border-l-2 border-dashed border-gray-200"></div>
          </div>
          <div ref={lineContainerRef} className="absolute left-[20px] md:left-[28px] top-0 bottom-0 w-px z-0 overflow-hidden momentum-active-line h-0">
             <div className="w-px h-[200vh] border-l-2 border-dashed border-[#6d28d9]"></div>
          </div>

          <div className="space-y-16 md:space-y-32">
            {steps.map((step, index) => (
              <div key={step.id} className={`step-row-${step.id} relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start md:items-center`}>
                
                <div className="col-span-12 md:col-span-1 flex items-start md:justify-center relative z-10">
                  <div className={`step-circle-${step.id} w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-gray-200 bg-[#FBF8FF] text-gray-300 flex items-center justify-center font-bold text-lg md:text-xl shadow-[0_0_0_8px_#FBF8FF] transition-colors`}>
                    {step.number}
                  </div>
                </div>
                
                <div className={`step-content-${step.id} col-span-12 md:col-span-6 pl-12 md:pl-0 -mt-12 md:mt-0 opacity-30`}>
                  <h3 className="text-xl md:text-2xl font-bold text-[#060027] mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#060027]/70 text-base md:text-lg leading-relaxed font-serif">
                    {step.description}
                  </p>
                </div>
                <div className={`step-card-${step.id} col-span-12 md:col-span-5 pl-12 md:pl-0 flex md:justify-end`}>
                  <div className={`floating-card floating-card-delay-${index + 1} bg-[#FBF8FF] p-5 md:p-6 rounded-2xl shadow-[0_15px_30px_rgba(6,0,39,0.1)] border border-[#060027]/5 flex items-center gap-4 max-w-xs transform ${step.card.rotate}`}>
                    <div className="w-12 h-12 rounded-full bg-[#FBF8FF] flex items-center justify-center flex-shrink-0">
                      {step.card.icon}
                    </div>
                    <div>
                      <p className="text-[#060027] font-bold text-lg leading-none mb-1">
                        {step.card.label}
                      </p>
                      <p className="text-[#6d28d9] font-medium text-sm">
                        {step.card.value}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}