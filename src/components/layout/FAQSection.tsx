import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How does the free trial work?",
    answer: "You get 50 free coins immediately upon signing up. This allows you to unlock specific topic quizzes or flashcards to test the platform. The trial lasts for 7 days or until your coins run out."
  },
  {
    question: "What costs coins in ChampionsPrep?",
    answer: "Coins are used to unlock premium practice sets, detailed video solutions, and AI-generated mock exams. Basic summaries and progress tracking are free."
  },
  {
    question: "Can I purchase coins anytime?",
    answer: "Yes! You can top up your coin balance instantly from the dashboard. We offer various bundles ranging from small top-ups to full-term packages."
  },
  {
    question: "Is ChampionsPrep subscription-based?",
    answer: "We offer both pay-as-you-go (coin based) and subscription models. The subscription gives you unlimited access without needing to count coins."
  },
  {
    question: "Do parents need a separate login?",
    answer: "Yes, parents can create a linked observer account. This allows them to view activity reports and streaks without interfering with the student's actual study data."
  }
];

export default function FAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(".faq-header", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      tl.fromTo(".faq-item", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-50 py-24 md:py-32 px-5 md:px-12 bg-[#FFFDF5]">
      
      <div className="max-w-3xl mx-auto">
 
        <div className="faq-header text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#060027] font-sans tracking-tight mb-2">
            Got Questions?
          </h2>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#060027] font-sans tracking-tight">
             We’ve <span className="text-[#6d28d9]">got answers</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="faq-item bg-[#1A1033] rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none group"
              >
                <span className="text-white font-medium text-lg md:text-xl pr-6 group-hover:text-white/90 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-6 h-6 text-white/70 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <div 
                className={`transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="p-5 md:p-6 pt-0 text-white/70 leading-relaxed text-sm md:text-base border-t border-white/5 mt-2">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}