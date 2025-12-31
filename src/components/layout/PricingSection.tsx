import React, { useEffect, useRef } from 'react';
import { Coins } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- SEO UPDATE: Descriptive plan names and value propositions ---
const plans = [
  {
    id: 1,
    coins: 50,
    price: "0",
    period: "7-Day Trial Period",
    buttonText: "Start Free Board Prep",
    highlight: false
  },
  {
    id: 2,
    coins: 100,
    price: "99",
    period: "Flexible Pay-As-You-Go",
    buttonText: "Get Access Now",
    highlight: false
  },
  {
    id: 3,
    coins: 220,
    price: "199",
    period: "Best Value for Exams",
    buttonText: "Unlock Full Access",
    highlight: true,
    badgeText: "Most Popular for Class 12"
  },
  {
    id: 4,
    coins: 350,
    price: "299",
    period: "Full-Term Board Prep",
    buttonText: "Maximize My Score",
    highlight: false
  }
];

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(".pricing-header", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      tl.fromTo(".pricing-card", 
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" },
        "-=0.4"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-50 py-24 md:py-32 px-5 md:px-12 bg-[#FBF8FF] overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="pricing-header text-center mb-16 md:mb-20">
          {/* --- SEO HEADER: Targeting "Commerce Coaching Fees" --- */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#060027] font-sans tracking-tight mb-6">
            Affordable <span className="text-[#6d28d9]">Commerce Coaching</span> Plans <br className="hidden md:block" />
            for Every Board Student
          </h2>
          <p className="text-[#060027]/60 text-lg font-serif max-w-2xl mx-auto leading-relaxed">
            Choose the right investment for your <strong>Accountancy, Economics, and BST</strong> preparation. Start with a free trial and scale as your board exams approach.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {plans.map((plan) => (
            <article 
              key={plan.id} 
              className={`pricing-card relative flex flex-col items-center p-6 rounded-2xl transition-all duration-300 group
                ${plan.highlight 
                  ? 'bg-[#F3F0FF] border-2 border-[#6d28d9] shadow-[0_10px_40px_-10px_rgba(109,40,217,0.3)] transform lg:-translate-y-4 z-10' 
                  : 'bg-[#F3F0FF] border border-[#060027]/5 hover:border-[#6d28d9]/30 hover:shadow-lg'
                }
              `}
            >
              
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#6d28d9] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                  {plan.badgeText}
                </div>
              )}

              <div className="mb-6 bg-white border border-[#6d28d9]/20 rounded-full px-5 py-2 flex items-center gap-2 text-[#060027]">
                <Coins className="w-4 h-4 text-[#6d28d9]" />
                <span className="font-semibold">{plan.coins} Study Coins</span>
              </div>

              <div className="text-center mb-2">
                <span className="text-sm font-bold text-[#060027]/40 block mb-1">Tuition Fees</span>
                <span className="text-3xl font-extrabold text-[#060027]">₹{plan.price}</span>
              </div>

              <p className="text-sm font-medium text-[#060027]/60 mb-8 text-center">
                {plan.period}
              </p>

              <button className={`w-full py-3 rounded-lg font-bold text-sm transition-colors border
                ${plan.highlight
                  ? 'bg-white text-[#060027] border-[#6d28d9]/20 hover:bg-[#6d28d9] hover:text-white'
                  : 'bg-white text-[#060027] border-[#060027]/10 hover:border-[#6d28d9] hover:text-[#6d28d9]'
                }
              `}>
                {plan.buttonText}
              </button>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}