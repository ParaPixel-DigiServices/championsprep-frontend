import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "../components/layout/Navbar";
import StatsSection from "../components/layout/StatsSection";
import { Button } from "../components/ui/Button";
import CrayonScroll from "../components/animation/CrayonScroll";
import FeaturesSection from "../components/layout/FeatureSection";
import QuizFeatures from "../components/layout/FeatureCards";
import MomentumSection from "../components/layout/MomentumSection";
import CoverageSection from "../components/layout/CoverageSection";
import TestimonialsSection from "../components/layout/TestimonialSection";
import PricingSection from "../components/layout/PricingSection";
import FAQSection from "../components/layout/FAQSection";
import SEO from "../components/seo/SEO"; // Ensure you have this component from the previous step

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isDesktop;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeLeft = useRef<HTMLDivElement>(null);
  const shapeRight = useRef<HTMLDivElement>(null);
  const circle1 = useRef<HTMLDivElement>(null);
  const circle2 = useRef<HTMLDivElement>(null);

  const [isCrayonReady, setIsCrayonReady] = useState(false);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".hero-text", { y: 50, opacity: 0 });
      gsap.set([shapeLeft.current, shapeRight.current], { y: 150, opacity: 0 });
      gsap.set([circle1.current, circle2.current], { scale: 0 });

      // Intro Timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => startFloating(),
      });

      tl.to(".hero-text", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
      })
        .to(
          [shapeLeft.current, shapeRight.current],
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
          },
          "-=0.8"
        )
        .to(
          [circle1.current, circle2.current],
          {
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        );

      // --- SMOOTH FLOATING ANIMATION LOGIC ---
      const startFloating = () => {
        if (shapeLeft.current) {
          gsap.to(shapeLeft.current, {
            y: "-=15",
            rotation: 0.01, // Trick: Forces sub-pixel rendering (prevents jitter)
            force3D: true,  // Trick: Forces GPU layer promotion
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
        
        if (shapeRight.current) {
          gsap.to(shapeRight.current, {
            y: "+=20",
            rotation: 0.01,
            force3D: true,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
        
        if (circle2.current) {
          gsap.to(circle2.current, {
            y: "+=8",
            x: "-=5",
            rotation: 0.01,
            force3D: true,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FBF8FF] overflow-x-hidden relative"
    >
      {/* --- SEO INJECTION START --- */}
      <SEO 
        title="Best CBSE Class 12 Commerce Coaching & Board Prep | ChampionsPrep"
        description="Join India's best online commerce coaching for Class 11 & 12. Master Accountancy, Economics, and Business Studies with AI-driven plans and expert tuition."
        keywords="CBSE Class 12 Commerce coaching, online commerce tuition, class 11 commerce classes, accountancy board prep, economics tuition online, business studies coaching, commerce board exam preparation"
      />
      {/* --- SEO INJECTION END --- */}

      <Navbar />

      {isDesktop && (
        <CrayonScroll
          startTriggerRef={circle1}
          onReady={() => setIsCrayonReady(true)}
        />
      )}
      <main
        id="hero"
        className="pt-24 pb-12 px-5 md:pt-32 md:pb-0 md:px-12 max-w-7xl mx-auto min-h-auto md:min-h-[90vh] flex flex-col md:flex-row items-center relative"
      >
        <div className="w-full md:w-1/2 relative z-20 flex flex-col items-start gap-5 md:gap-8 md:pr-12 mb-8 md:mb-0">
          {/* --- H1 Optimized for Primary Keyword: "Commerce Board Prep" --- */}
          <h1 className="hero-text text-4xl md:text-[4rem] leading-[1.1] font-extrabold font-sans text-navy tracking-tight will-change-transform">
            Smarter <span className="text-accent">Commerce Board Prep</span> With AI Buddy Parents Trust
          </h1>

          <div className="hero-text space-y-3 md:space-y-4 max-w-lg will-change-transform">
            {/* --- H2 Optimized for Subject Keywords --- */}
            <h2 className="text-xl md:text-2xl font-sans font-bold text-navy">
              Master Accountancy, Economics & BST
            </h2>
            {/* --- Paragraph Optimized for "Online Tuition" and "Class 12" --- */}
            <p className="text-base md:text-lg font-serif text-navy/80 leading-relaxed">
              Get personalized weekly study plans for <strong>Class 11 & 12 Commerce</strong>. 
              Track chapter-wise performance in <strong>Accountancy</strong> and <strong>Economics</strong> 
              with a dashboard designed for board exam success.
            </p>
          </div>

          <div className="hero-text pt-2 md:pt-4 will-change-transform">
            <Button>Start Free Trial</Button>
          </div>
        </div>
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden md:pointer-events-auto md:relative md:w-1/2 md:opacity-100 md:block md:h-[600px] md:-mt-40 md:overflow-visible">
          <div
            ref={shapeLeft}
            className="absolute -left-12 -top-12 md:left-0 md:top-[5%] w-40 h-60 md:w-56 md:h-80 bg-navy z-10 shadow-2xl will-change-transform"
            style={{ borderRadius: "20px 20px 120px 120px" }}
          >
            <div
              ref={circle1}
              className={`absolute -left-6 -bottom-6 w-12 h-12 bg-accent rounded-full z-20 shadow-lg transition-opacity duration-200 ${
                isDesktop && isCrayonReady ? "opacity-0" : "opacity-100"
              }`}
            ></div>
          </div>
          <div
            ref={shapeRight}
            className="absolute -right-12 top-48 md:right-10 md:bottom-[5%] md:top-auto w-48 h-72 md:w-64 md:h-96 bg-navy z-10 shadow-2xl will-change-transform"
            style={{ borderRadius: "130px 130px 20px 20px" }}
          >
            <div
              ref={circle2}
              className="absolute -right-6 -top-8 w-10 h-10 bg-accent rounded-full z-20 shadow-lg"
            ></div>
          </div>
        </div>
      </main>
      <div id="features">
        <StatsSection />
        <FeaturesSection />
        <QuizFeatures />
      </div>

      <div id="curriculum">
        <MomentumSection />
        <CoverageSection />
      </div>

      <TestimonialsSection />

      <div id="pricing">
        <PricingSection />
      </div>

      <div id="faq">
        <FAQSection />
      </div>
    </div>
  );
}