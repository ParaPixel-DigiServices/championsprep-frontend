import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- SEO UPDATE: Question-based keywords for Featured Snippets ---
const faqs = [
  {
    question: "Is ChampionsPrep suitable for CBSE Class 12 Commerce board exams?",
    answer: "Absolutely. Our platform is specifically designed for the CBSE Commerce syllabus. We provide comprehensive practice for Accountancy, Economics, and Business Studies, ensuring students are fully prepared for their Class 12 board exams with the latest pattern questions."
  },
  {
    question: "Do you provide video solutions for Accountancy problems?",
    answer: "Yes! Premium members can unlock detailed video solutions for complex Accountancy problems and Economics numericals. Our expert mentors break down each step so you understand the logic, not just the answer."
  },
  {
    question: "How can parents track Class 11 & 12 Commerce progress?",
    answer: "Parents can create a dedicated 'Observer Account' linked to their child. You will receive weekly activity reports, streak updates, and performance analytics for every subject, allowing you to monitor board exam readiness without any hassle."
  },
  {
    question: "How do I use coins to unlock Commerce study material?",
    answer: "ChampionsPrep uses a flexible coin system. Upon signing up, you get free coins to explore topic-wise quizzes and flashcards. You can use coins to unlock specific premium practice sets or mock tests as needed, making it a cost-effective way to study."
  },
  {
    question: "Is there a full subscription for the entire Commerce syllabus?",
    answer: "Yes, we offer both a pay-as-you-go coin model and a full-term subscription. The subscription provides unlimited access to all subjects—Accountancy, Economics, and Business Studies—including all AI mock exams and video solutions for the entire academic year."
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
    <section ref={containerRef} className="relative z-50 py-24 md:py-32 px-5 md:px-12 bg-[#FBF8FF]">
      
      <div className="max-w-3xl mx-auto">
 
        <div className="faq-header text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#060027] font-sans tracking-tight mb-2">
            Got Questions?
          </h2>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#060027] font-sans tracking-tight">
             We’ve <span className="text-[#6d28d9]">got answers</span>
          </h2>
        </div>

        {/* --- Semantic <dl> tag for better SEO structure --- */}
        <dl className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="faq-item bg-[#1A1033] rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <dt>
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
              </dt>
              
              <dd 
                className={`transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="p-5 md:p-6 pt-0 text-white/70 leading-relaxed text-sm md:text-base border-t border-white/5 mt-2">
                  {faq.answer}
                </p>
              </dd>
            </div>
          ))}
        </dl>

      </div>
    </section>
  );
}