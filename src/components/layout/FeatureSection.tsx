import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Search, Bell, Settings, ChevronDown, 
  Link, Flame, Timer, TrendingUp,
  Calculator, PieChart 
} from 'lucide-react';

import studentProfileImg from '../../assets/images/student_profile.png';

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
    <section ref={containerRef} className="relative z-30 py-16 px-5 md:px-12 bg-[#FBF8FF] overflow-hidden perspective-1000">
      
      <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-navy font-sans tracking-tight mb-6 leading-tight">
          Advanced <span className="text-accent">Commerce Learning Dashboard</span>
        </h2>
        <p className="text-lg text-navy/60 font-serif max-w-2xl mx-auto">
          Monitor your <strong>Class 12 board exam preparation</strong> with real-time analytics for <strong>Accountancy, Economics, and BST</strong>.
        </p>
      </div>

      <div 
        ref={dashboardRef}
        className="max-w-6xl mx-auto bg-[#060027] rounded-3xl shadow-2xl overflow-hidden border border-[#060027] ring-4 ring-black/5 transform-gpu"
      >
        
        <div className="dashboard-nav flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#060027]">
          <div className="flex items-center gap-3">
            <img 
              src={studentProfileImg} 
              alt="ChampionsPrep Commerce Student Dashboard" 
              className="w-8 h-8 rounded-md object-cover shadow-sm border border-white/10"
              loading="lazy"
            />
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <span>CBSE Class 12</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/40">
            <span className="text-white">Overview</span>
            <span className="hover:text-white cursor-pointer transition-colors">Syllabus</span>
            <span className="hover:text-white cursor-pointer transition-colors">Board Papers</span>
            <span className="hover:text-white cursor-pointer transition-colors">Study Groups</span>
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
              <img 
                src={studentProfileImg} 
                alt="Commerce Student Profile" 
                className="w-16 h-16 rounded-full object-cover border-2 border-white/10 flex-shrink-0"
              />
              <div>
                <h3 className="text-xl font-bold">Ashmit Kumar</h3>
                <p className="text-white/50 text-sm">Class 12 Commerce</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:gap-x-12">
              <StatItem icon={<Link className="w-4 h-4 text-white/80" />} label="Prep Coins" value="100" />
              <StatItem icon={<Flame className="w-4 h-4 text-white/80" />} label="Daily Streak" value="7 days" />
              <StatItem icon={<Timer className="w-4 h-4 text-white/80" />} label="Accountancy Time" value="24h" />
              <StatItem icon={<TrendingUp className="w-4 h-4 text-white/80" />} label="Avg Mock Score" value="78%" />
            </div>
          </div>

          <div className="col-activity lg:col-span-5 flex flex-col justify-end">
            <h4 className="text-lg font-medium mb-6">Study Activity</h4>
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
                <h4 className="text-xl font-bold">Quick Revision</h4>
                <button className="text-xs font-bold border border-navy/10 px-3 py-1.5 rounded-full hover:bg-navy/5 flex items-center gap-1">
                  All Subjects →
                </button>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CourseCard 
                  title="Accountancy" 
                  date="Last studied: Today" 
                  progress="w-3/4" 
                  icon={<Calculator className="w-5 h-5 text-[#6d28d9]" />} 
                />
                <CourseCard 
                  title="Economics" 
                  date="Last studied: Yesterday" 
                  progress="w-1/2" 
                  icon={<PieChart className="w-5 h-5 text-[#6d28d9]" />} 
                />
             </div>
          </div>

          <div className="bottom-card lg:col-span-4">
            <h4 className="text-xl font-bold mb-6">Subject Mastery</h4>
            <div className="bg-[#F8F7F0] rounded-xl p-6 h-56 flex items-end relative border border-navy/5">
                <div className="flex-1 flex items-end justify-center gap-6 pl-2 h-[80%]">
                    <div className="mastery-bar w-12 md:w-16 bg-[#6d28d9] rounded-t-lg h-[80%] relative shadow-sm"></div>
                    <div className="mastery-bar w-12 md:w-16 bg-[#6d28d9]/60 rounded-t-lg h-[60%] relative shadow-sm"></div>
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

function CourseCard({ title, date, progress, icon }: { title: string, date: string, progress: string, icon: any }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-navy/5 hover:border-navy/10 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col justify-between">
       <div>
         <div className="w-10 h-10 rounded-full bg-[#FFFDF5] border border-navy/5 flex items-center justify-center mb-4">
           {icon}
         </div>
         <h5 className="font-bold text-navy text-sm mb-1">{title}</h5>
         <p className="text-xs text-navy/40 mb-6 font-medium">{date}</p>
       </div>
       <div className="h-1 w-full bg-navy/5 rounded-full overflow-hidden">
         <div className={`h-full bg-accent ${progress} rounded-full`}></div>
       </div>
    </div>
  );
}