import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Search, Bell, Settings, ChevronDown, 
  Link, Flame, Timer, TrendingUp 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", 
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(dashboardRef.current, 
        { y: 100, opacity: 0, rotateX: -10, scale: 0.95 },
        { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.5, ease: "power3.out" }
      );

      tl.from(".dashboard-nav", { y: -20, opacity: 0, duration: 1 }, "-=1");

      tl.from(".col-profile", { x: -30, opacity: 0, duration: 1.2, ease: "power2.out" }, "-=0.8")
        .from(".col-activity", { x: 30, opacity: 0, duration: 1.2, ease: "power2.out" }, "<"); 

      tl.from(".stat-item", { scale: 0.8, opacity: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }, "-=0.8");

      tl.from(".activity-bar-line", { height: 0, duration: 1.5, ease: "power4.out", stagger: 0.1 }, "-=1.0");

      tl.from(".bottom-card", { y: 30, opacity: 0, duration: 1.2, stagger: 0.3 }, "-=1.0");

      tl.from(".mastery-bar", { height: 0, duration: 1.8, ease: "elastic.out(1, 0.75)", stagger: 0.3 }, "-=1.0");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-30 py-16 px-5 md:px-12 bg-[#FFFDF5] overflow-hidden perspective-1000">
      
      <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-navy font-sans tracking-tight mb-6 leading-tight">
          Features built for the <span className="text-accent">CBSE Commerce</span> journey
        </h2>
        <p className="text-lg text-navy/60 font-serif max-w-2xl mx-auto">
          Rich storytelling, detailed study material, and analytics that speak the language of board exam readiness—not just streaks.
        </p>
      </div>

      <div 
        ref={dashboardRef}
        className="max-w-6xl mx-auto bg-[#060027] rounded-3xl shadow-2xl overflow-hidden border border-[#060027] ring-4 ring-black/5 transform-gpu"
      >
        
        <div className="dashboard-nav flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#060027]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFFDF5] rounded-md shadow-sm"></div>
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <span>Class 11</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/40">
            <span className="text-white">Overview</span>
            <span className="hover:text-white cursor-pointer transition-colors">Learn</span>
            <span className="hover:text-white cursor-pointer transition-colors">Challenges</span>
            <span className="hover:text-white cursor-pointer transition-colors">Study Groups</span>
            <span className="hover:text-white cursor-pointer transition-colors">Achievements</span>
          </div>

          <div className="flex items-center gap-4 text-white/60">
            <Search className="w-5 h-5 hover:text-white cursor-pointer" />
            <div className="relative">
              <Bell className="w-5 h-5 hover:text-white cursor-pointer" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#060027]"></div>
            </div>
            <Settings className="w-5 h-5 hover:text-white cursor-pointer" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 bg-[#060027] text-white">
          <div className="col-profile lg:col-span-7 flex flex-col gap-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-bold">Ashmit Kumar</h3>
                <p className="text-white/50 text-sm">Bangalore, India</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:gap-x-12">
              <StatItem icon={<Link className="w-4 h-4 text-white/80" />} label="Coin Balance" value="100" />
              <StatItem icon={<Flame className="w-4 h-4 text-white/80" />} label="Current Streak" value="7 days" />
              <StatItem icon={<Timer className="w-4 h-4 text-white/80" />} label="Topics Studied" value="24" />
              <StatItem icon={<TrendingUp className="w-4 h-4 text-white/80" />} label="Avg Score" value="78%" />
            </div>
          </div>

          <div className="col-activity lg:col-span-5 flex flex-col justify-end">
            <h4 className="text-lg font-medium mb-6">Activity</h4>
            <div className="flex items-end justify-between h-32 gap-4 px-2">
               <ActivityLine day="Mon" height="40%" />
               <ActivityLine day="Tue" height="25%" />
               <ActivityLine day="Wed" height="60%" />
               <ActivityLine day="Thu" height="90%" active />
               <ActivityLine day="Fri" height="50%" />
               <ActivityLine day="Sat" height="70%" />
               <ActivityLine day="Sun" height="30%" />
            </div>
          </div>
        </div>

        <div className="bg-[#FFFDF5] p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 text-navy border-t border-white/5">
          
          <div className="bottom-card lg:col-span-8">
             <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold">Quick Access</h4>
                <button className="text-xs font-bold border border-navy/10 px-3 py-1.5 rounded-full hover:bg-navy/5 flex items-center gap-1">
                  View More →
                </button>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CourseCard title="Accountancy" date="9 Jan, 22" progress="w-3/4" />
                <CourseCard title="Accountancy" date="9 Jan, 22" progress="w-1/2" />
             </div>
          </div>

          <div className="bottom-card lg:col-span-4">
            <h4 className="text-xl font-bold mb-6">Subject Mastery</h4>
            <div className="bg-[#F8F7F0] rounded-xl p-6 h-56 flex items-end relative border border-navy/5">
                <div className="flex flex-col-reverse justify-between h-[80%] text-[10px] text-navy/40 font-medium pr-4 border-r border-navy/5 absolute left-4 bottom-6">
                    <span>50</span><span>60</span><span>70</span><span>80</span><span>90</span><span>100</span>
                </div>

                <div className="flex-1 flex items-end justify-center gap-6 pl-10 h-[80%]">
                    <div className="mastery-bar w-12 md:w-16 bg-[red] rounded-t-lg h-[80%] relative shadow-sm"></div>
                    <div className="mastery-bar w-12 md:w-16 bg-[red] rounded-t-lg h-[60%] relative shadow-sm"></div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function StatItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="stat-item flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-white/40 text-xs font-medium mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-white tracking-wide">{value}</p>
      </div>
    </div>
  );
}

function ActivityLine({ day, height, active = false }: { day: string, height: string, active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 flex-1 h-full justify-end group">
      <div 
        className={`activity-bar-line w-[2px] rounded-full transition-colors duration-500 group-hover:bg-accent ${active ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white/20'}`} 
        style={{ height }} 
      ></div>
      <span className={`text-[10px] uppercase tracking-wider font-medium ${active ? 'text-white' : 'text-white/30'}`}>
        {day}
      </span>
    </div>
  );
}

function CourseCard({ title, date, progress }: { title: string, date: string, progress: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-navy/5 hover:border-navy/10 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col justify-between">
       <div>
         <div className="w-10 h-10 rounded-full bg-gray-200 mb-4"></div>
         <h5 className="font-bold text-navy text-sm mb-1">{title}</h5>
         <p className="text-xs text-navy/40 mb-6 font-medium">{date}</p>
       </div>
       <div className="h-1 w-full bg-navy/5 rounded-full overflow-hidden">
          <div className={`h-full bg-accent ${progress} rounded-full`}></div>
       </div>
    </div>
  );
}