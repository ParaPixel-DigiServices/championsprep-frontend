import React, { useState, useEffect } from 'react';
import { Button } from "../ui/Button";
import { Menu, X, GraduationCap } from 'lucide-react';

const navLinks = [
  { name: "Overview", href: "#hero" },
  { name: "Features", href: "#features" },
  { name: "Curriculum", href: "#curriculum" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);

    if (elem) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = elem.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-[#FFFDF5]/90 backdrop-blur-md border-[#060027]/5 shadow-sm py-4' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a 
            href="#hero" 
            onClick={(e) => handleScrollTo(e, '#hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-[#060027] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 shadow-md">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#060027] font-sans font-bold text-lg tracking-tight">
              ChampionsPrep
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-[#060027]/70 hover:text-[#6d28d9] font-sans font-medium text-sm transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#6d28d9] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="hidden md:block">
            <Button className="bg-[#060027] hover:bg-[#6d28d9] text-white">
              Login / Register
            </Button>
          </div>
          <div className="md:hidden z-50">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#060027] p-2 hover:bg-[#060027]/5 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>
      <div 
        className={`fixed inset-0 bg-[#FFFDF5] z-[90] md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-6 w-full px-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-2xl font-bold text-[#060027] hover:text-[#6d28d9] transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="w-full h-px bg-[#060027]/10 my-4"></div>
          
          <Button className="w-full bg-[#060027] hover:bg-[#6d28d9] text-white py-6 text-lg">
            Login / Register
          </Button>
        </div>
      </div>
    </>
  );
}