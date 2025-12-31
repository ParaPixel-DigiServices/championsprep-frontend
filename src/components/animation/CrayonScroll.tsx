import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface CrayonScrollProps {
  startTriggerRef: React.RefObject<HTMLDivElement>;
  onReady?: () => void;
}

export default function CrayonScroll({ startTriggerRef, onReady }: CrayonScrollProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const circleGroupRef = useRef<SVGGElement>(null);
  
  const [pathD, setPathD] = useState("");
  const [docHeight, setDocHeight] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const updateMetrics = () => {
      if (startTriggerRef.current) {
        const el = startTriggerRef.current;
        const rect = el.getBoundingClientRect();
        const fullHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight
        );
        setDocHeight(fullHeight);

        const startX = rect.left + rect.width / 2;
        const startY = (rect.top + rect.height / 2 + window.scrollY) - 4; 

        const waveHeight = 300; 
        const waveWidth = 80;  
        
        const availableHeight = fullHeight - startY;
        const numWaves = Math.ceil(availableHeight / waveHeight);

        let d = `M ${startX} ${startY}`;
        
        d += ` Q ${startX + 50} ${startY + 100} ${startX} ${startY + 200}`;

        let currentY = startY + 200;
        
        for (let i = 0; i < numWaves; i++) {
           const isEven = i % 2 === 0;
           const controlX = isEven ? startX - waveWidth : startX + waveWidth;
           const targetY = currentY + waveHeight;

           d += ` C ${controlX} ${currentY + (waveHeight / 3)}, 
                     ${controlX} ${currentY + (waveHeight * 2 / 3)}, 
                     ${startX} ${targetY}`;
           
           currentY = targetY;
        }

        d += ` L ${startX} ${fullHeight}`;
        
        setPathD(d);
        setIsReady(true);
      }
    };

    const timeout = setTimeout(updateMetrics, 500); 
    window.addEventListener('resize', updateMetrics);
    return () => {
      window.removeEventListener('resize', updateMetrics);
      clearTimeout(timeout);
    };
  }, [startTriggerRef]);

  useEffect(() => {
    if (!pathD || !pathRef.current || !circleRef.current || !isReady) return;

    if (onReady) onReady();

    const ctx = gsap.context(() => {
      const pathLength = pathRef.current!.getTotalLength();

      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 1 
      });
      
      gsap.set(circleGroupRef.current, { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body", 
          start: "top top",
          end: "bottom bottom", 
          scrub: 2, 
        }
      });

      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
      }, 0);

      tl.to(circleGroupRef.current, {
        motionPath: {
          path: pathRef.current!,
          align: pathRef.current!,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
      }, 0);

    }, svgRef);

    return () => ctx.revert();
  }, [pathD, isReady]);

  return (
    <div 
        className="absolute top-0 left-0 w-full z-[20] pointer-events-none" 
        style={{ height: docHeight || '100%' }}
    >
      <svg 
        ref={svgRef}
        width="100%"
        height="100%"
        className="overflow-visible"
        style={{ visibility: isReady ? 'visible' : 'hidden' }}
      >
        <defs>
          <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset in="blur" dx="0" dy="4" result="offsetBlur" />
            <feFlood floodColor="rgba(0,0,0,0.1)" result="colorBlur" />
            <feComposite in="colorBlur" in2="offsetBlur" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="#6D54FF" 
          strokeWidth="40"
          strokeLinecap="round"
          className="opacity-0"
        />

        <g 
            ref={circleGroupRef} 
            filter="url(#drop-shadow)" 
        >
            <circle
            ref={circleRef}
            r="24" 
            fill="#6D54FF"
            />
        </g>
      </svg>
    </div>
  );
}