import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Cpu, Database, Activity, ThermometerSnowflake, Layers, ChevronDown } from 'lucide-react';

// --- CINEMATIC MOTION HOOKS ---
const useScrollFade = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

// --- COMPONENTS ---

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
  const { ref, isVisible } = useScrollFade();
  
  // Refined duration to 1500ms for a slower, calmer, more editorial fade
  const baseClasses = "transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]";
  const opacity = isVisible ? "opacity-100" : "opacity-0";
  
  // Softened the translation distance for a more subtle reveal
  let transform = "";
  if (direction === "up") transform = isVisible ? "translate-y-0" : "translate-y-8";
  if (direction === "left") transform = isVisible ? "translate-x-0" : "-translate-x-8";
  if (direction === "right") transform = isVisible ? "translate-x-0" : "translate-x-8";
  if (direction === "none") transform = "";

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${opacity} ${transform} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 ${
      scrolled ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-[#151515] py-4' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-[90%] md:max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-white text-[10px] tracking-[0.3em] font-medium uppercase">fathan.</span>
          <span className="text-[#A1A1AA] text-[8px] tracking-[0.2em] uppercase mt-1">Studies</span>
        </div>
        
        <div className="hidden md:flex gap-12 text-[10px] tracking-[0.2em] text-[#A1A1AA] uppercase font-medium items-center">
          <a href="#profile" className="hover:text-white transition-colors duration-500">About</a>
          
          <div 
            className="relative h-full py-4 -my-4 flex items-center group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="hover:text-white transition-colors duration-500 flex items-center gap-2 uppercase tracking-[0.2em]">
              Directory <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-[#0A0A0A] border border-[#151515] p-6 grid grid-cols-2 gap-6 transition-all duration-700 origin-top ${
              dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'
            }`}>
              <div className="space-y-4 flex flex-col justify-center border-r border-[#151515]">
                 <a href="#profile" className="text-[#777] hover:text-white text-[9px] tracking-widest uppercase transition-colors duration-300">Introduction</a>
                 <a href="#projects" className="text-[#777] hover:text-white text-[9px] tracking-widest uppercase transition-colors duration-300">Selected Works</a>
                 <a href="#research" className="text-[#777] hover:text-white text-[9px] tracking-widest uppercase transition-colors duration-300">Technical Research</a>
              </div>
              <div className="relative h-28 bg-[#111] overflow-hidden group/img">
                 <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400" alt="Directory Reference" className="w-full h-full object-cover grayscale contrast-125 opacity-40 mix-blend-luminosity group-hover/img:opacity-70 transition-opacity duration-1000" />
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] opacity-20 pointer-events-none"></div>
                 <div className="absolute bottom-2 left-2 text-[8px] text-white uppercase tracking-widest font-mono">Index // 2025</div>
              </div>
            </div>
          </div>

          <a href="#contact" className="hover:text-white transition-colors duration-500">Contact</a>
        </div>

        <button className="md:hidden text-white">
          <Layers className="w-5 h-5 stroke-[1]" />
        </button>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-end pb-24 md:pb-32">
      {/* Subtle line motion for an architectural feel */}
      <div className="absolute left-[15%] top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-50"></div>
      <div className="absolute right-[25%] top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30"></div>

      <div className="absolute inset-0 pointer-events-none opacity-60 z-0 mix-blend-luminosity">
        <div className="relative w-full h-full pb-[56.25%] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <iframe 
            src="https://player.vimeo.com/video/1190913752?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
            className="absolute top-0 left-0 w-full h-full filter contrast-[1.1] grayscale brightness-[1.2]"
            title="Hero Background Sequence"
          ></iframe>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/20 to-[#050505] z-10 pointer-events-none"></div>

      <div className="relative z-20 max-w-[90%] md:max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8">
          <FadeIn delay={200}>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-[#A1A1AA]"></span>
              <p className="text-[#A1A1AA] text-[10px] tracking-[0.4em] uppercase font-medium">01 — Foundation</p>
            </div>
          </FadeIn>
          
          <FadeIn delay={400}>
            <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold text-white tracking-tighter leading-[0.9] uppercase">
              The Hidden <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#555]">Architecture</span> <br />
              Of Reality.
            </h1>
          </FadeIn>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-end pb-2">
          <FadeIn delay={600}>
            <p className="text-[#A1A1AA] text-sm md:text-base font-light leading-relaxed mb-10">
              Beyond the code lies the physical constraint of industry. 
              Understanding the molecular integrity and physical foundations 
              of computation is the only way to architect the future.
            </p>
            <a href="#projects" className="inline-flex items-center gap-4 border border-[#333] hover:border-white/60 text-white px-8 py-4 text-[10px] tracking-[0.2em] uppercase transition-all duration-1000 group bg-[#050505]/50 backdrop-blur-md">
              View Case Studies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-700 ease-out stroke-[1]" />
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const EditorialIntro = () => {
  return (
    <section id="profile" className="py-32 md:py-48 bg-white text-[#050505] selection:bg-[#050505] selection:text-white">
      <div className="max-w-[90%] md:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        <div className="lg:col-span-5 relative">
          <FadeIn direction="right">
            <div className="relative group p-4 border border-gray-200 bg-[#FAFAFA]">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#050505] opacity-30"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#050505] opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#050505] opacity-30"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#050505] opacity-30"></div>
              
              <div className="overflow-hidden relative">
                <img 
                  src="https://i.ibb.co.com/Vp55GXh8/erasebg-transformed.jpg" 
                  alt="Fathan Mulia Fahriza" 
                  className="w-full h-auto aspect-[4/5] object-cover grayscale contrast-[1.05] brightness-[0.9] transform group-hover:scale-[1.02] transition-transform duration-[3000ms] ease-out"
                />
                <div className="absolute inset-0 bg-[#050505]/5 mix-blend-multiply transition-opacity duration-1000 group-hover:opacity-0"></div>
              </div>
            </div>
            
            <div className="absolute -right-4 -bottom-8 md:-right-12 md:-bottom-12 bg-[#050505] text-white p-6 md:p-8 z-20 shadow-2xl">
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2 text-[#A1A1AA]">Introduction</p>
              <h3 className="text-xl md:text-2xl font-light tracking-tight mb-4">Fathan Mulia Fahriza</h3>
              <p className="text-xs font-light text-gray-400 leading-relaxed">
                Software Engineering Student<br/>
                Researching computational systems, material<br/>constraints, and technological infrastructure.
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center pt-12 lg:pt-0">
          <FadeIn delay={200}>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[#050505] text-[10px] tracking-[0.4em] uppercase font-medium">02 — Introduction</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.1] mb-12">
              While most see the surface, I analyze the physical foundations that hold it together.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base text-[#444] font-light leading-relaxed">
              <p>
                My work focuses on the intersection of Material Science and Digital Engineering. 
                I study the physical constraints—from the lattice structures of semiconductors 
                to the thermal conductivity of advanced industrial alloys.
              </p>
              <p>
                Every great innovation starts with a single atom. To engineer the future, we must 
                first understand the limits of physical reality. Precision is a foundational requirement.
              </p>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};

const SystemStudies = () => {
  const studies = [
    {
      id: "01",
      icon: <Cpu className="w-6 h-6 stroke-[1]" />,
      title: "Semiconductor Physics",
      desc: "Analyzing lattice structures, physical limits of NAND, and the material science dictating processing capability."
    },
    {
      id: "02",
      icon: <Activity className="w-6 h-6 stroke-[1]" />,
      title: "Signal Integrity",
      desc: "High-speed transmission constraints, electromagnetic interference, and routing logic in complex boards."
    },
    {
      id: "03",
      icon: <ThermometerSnowflake className="w-6 h-6 stroke-[1]" />,
      title: "Thermal Dynamics",
      desc: "Heat dissipation models, material conductivity limits, and sustaining performance under extreme computational load."
    },
    {
      id: "04",
      icon: <Database className="w-6 h-6 stroke-[1]" />,
      title: "Storage Physics",
      desc: "Quantum tunneling in flash memory and the physical reality of permanent data retention."
    }
  ];

  return (
    <section id="research" className="py-32 md:py-48 bg-[#050505] text-white border-t border-[#151515]">
      <div className="max-w-[90%] md:max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 border-b border-[#151515] pb-12">
            <div className="max-w-3xl">
              <p className="text-[#A1A1AA] text-[10px] tracking-[0.4em] uppercase mb-8">03 — Research Areas</p>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter uppercase">
                What I Study.
              </h2>
            </div>
            <p className="text-[#A1A1AA] text-sm font-light max-w-sm leading-relaxed">
              An overview of the physical constraints and foundational architectures that dictate digital infrastructure.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#151515]">
          {studies.map((study, idx) => (
            <FadeIn key={study.id} delay={idx * 150} className="bg-[#050505] p-10 hover:bg-[#0A0A0A] transition-colors duration-[1500ms] group h-full flex flex-col">
              <div className="flex justify-between items-start mb-16">
                <div className="text-[#444] group-hover:text-[#888] transition-colors duration-1000">
                  {study.icon}
                </div>
                <span className="text-[10px] tracking-widest text-[#333] group-hover:text-[#A1A1AA] transition-colors duration-1000">
                  {study.id}
                </span>
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-medium tracking-tight mb-4 text-[#E5E5E5]">{study.title}</h3>
                <p className="text-[#A1A1AA] text-xs leading-relaxed font-light">
                  {study.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ThematicTransition = () => {
  return (
    <section className="py-32 md:py-48 bg-[#050505] text-white relative overflow-hidden border-t border-[#151515]">
      {/* Background Cinematic Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.extremetech.com/imagery/content-types/07w7QV3Rp1xwRtHCWLfwjIS/hero-image.fit_lim.size_1600x900.v1707845231.jpg" 
          alt="ASML High NA EUV" 
          className="w-full h-full object-cover grayscale contrast-[1.4] brightness-[0.5] opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none z-0"></div>
      
      <div className="max-w-[90%] md:max-w-4xl mx-auto text-center relative z-10">
        <FadeIn>
          <div className="flex justify-center mb-12">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#444] to-transparent"></div>
          </div>
          
          <p className="text-[#555] text-[10px] tracking-[0.4em] uppercase mb-12 font-medium">04 — Perspective</p>
          
          <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-medium tracking-tighter leading-[1.1] mb-12 text-[#E5E5E5]">
            Innovation is a negotiation <br className="hidden md:block"/> with physical reality.
          </h2>
          
          <p className="text-[#A1A1AA] text-sm md:text-base font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Digital architectures are never truly static; they are continuously adapting. While we build increasingly complex abstractions, every digital environment remains anchored to the structural constraints of thermodynamics, material science, and architectural efficiency.
          </p>
        </FadeIn>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-8 z-10 w-full md:w-auto text-center">
        <p className="text-[#444] text-[8px] tracking-[0.4em] uppercase font-mono opacity-80">ASML High NA EUV, 0.55 Aperture</p>
      </div>
    </section>
  );
};

const MyProjects = () => {
  return (
    <section id="projects" className="bg-[#050505] text-white py-32 md:py-48 selection:bg-white selection:text-black border-t border-[#151515]">
      {/* Editorial Header */}
      <div className="max-w-[90%] md:max-w-7xl mx-auto mb-24">
        <FadeIn>
           <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#151515] pb-12 gap-8">
             <div>
               <p className="text-[#A1A1AA] text-[10px] tracking-[0.4em] uppercase mb-8">05 — Selected Works</p>
               <h3 className="text-4xl md:text-6xl font-medium tracking-tighter uppercase">My Projects.</h3>
             </div>
             <p className="text-[#A1A1AA] text-sm font-light max-w-xs leading-relaxed">
               Structural engineering and digital architecture analysis.
             </p>
           </div>
        </FadeIn>
      </div>

      {/* Grid of Secondary Projects */}
      <div className="max-w-[90%] md:max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-6 group cursor-pointer">
            <FadeIn delay={200}>
              <div className="relative aspect-[16/9] bg-[#0D0D0D] border border-[#151515] mb-8 overflow-hidden">
                 <img 
                   src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=1200" 
                   alt="Thermal Dissipation Array" 
                   className="w-full h-full object-cover grayscale contrast-125 opacity-30 group-hover:opacity-60 group-hover:scale-[1.03] transition-all duration-[2000ms] ease-out" 
                 />
                 <div className="absolute top-6 left-6 text-[9px] font-mono text-[#555] tracking-widest uppercase font-medium">Research Project // 2024</div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-1 h-1 bg-white opacity-50"></div>
                 <h4 className="text-xl font-medium tracking-tight">Thermal Dissipation Array</h4>
              </div>
              <p className="text-[#A1A1AA] text-sm font-light leading-relaxed">Modeling heat extraction dynamics for 3D integrated circuits, ensuring structural reliability under peak load computational cycles.</p>
            </FadeIn>
          </div>
          
          <div className="lg:col-span-6 group cursor-pointer">
            <FadeIn delay={400}>
              <div className="relative aspect-[16/9] bg-[#0D0D0D] border border-[#151515] mb-8 overflow-hidden">
                 <img 
                   src="https://images.unsplash.com/photo-1544256718-3b61023f5451?auto=format&fit=crop&q=80&w=1200" 
                   alt="Backend Infrastructure Architecture" 
                   className="w-full h-full object-cover grayscale contrast-125 opacity-30 group-hover:opacity-60 group-hover:scale-[1.03] transition-all duration-[2000ms] ease-out" 
                 />
                 <div className="absolute top-6 left-6 text-[9px] font-mono text-[#555] tracking-widest uppercase font-medium">Infrastructure Project // 2025</div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-1 h-1 bg-white opacity-50"></div>
                 <h4 className="text-xl font-medium tracking-tight">Infrastructure Architecture</h4>
              </div>
              <p className="text-[#A1A1AA] text-sm font-light leading-relaxed">Scalable data routing architectures designed to bridge software instructions and physical hardware execution environments.</p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

const EditorialStatement = () => {
  return (
    <section className="py-32 md:py-48 bg-white flex items-center justify-center relative overflow-hidden border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <FadeIn>
          <p className="text-[#050505] text-[10px] tracking-[0.4em] uppercase mb-12 font-medium">06 — Manifesto</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-[#050505] tracking-tighter leading-[1.1]">
            Reality runs on <br /> invisible foundations.
          </h2>
          <p className="mt-12 text-[#777] text-sm md:text-base font-light tracking-wide max-w-2xl mx-auto">
            Before intelligence, there is infrastructure. The future is not built in the cloud; it is constrained by physics, thermodynamics, and the absolute limits of material science.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 bg-[#050505] text-white border-t border-[#151515]">
      <div className="max-w-[90%] md:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        <div className="lg:col-span-5">
          <FadeIn>
            <p className="text-[#A1A1AA] text-[10px] tracking-[0.4em] uppercase mb-8">07 — Inquiries</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-8">Start a <br/>Conversation.</h2>
            <p className="text-[#A1A1AA] text-sm font-light leading-relaxed mb-16">
              Reach out to initiate a dialogue regarding structural engineering, material limits, or architectural integration.
            </p>
            
            <div className="space-y-6 font-mono text-xs text-[#A1A1AA]">
              <div className="flex flex-col gap-2 border-b border-[#151515] pb-4">
                <span className="text-[#555] uppercase tracking-widest text-[9px]">Communication</span>
                <a href="mailto:exampligratia@gmail.com" className="text-white hover:text-[#A1A1AA] transition-colors duration-500">exampligratia@gmail.com</a>
              </div>
              <div className="flex flex-col gap-2 border-b border-[#151515] pb-4">
                <span className="text-[#555] uppercase tracking-widest text-[9px]">Direct</span>
                <span className="text-white">+1 (249) 900-2340</span>
              </div>
              <div className="flex flex-col gap-2 pb-4">
                <span className="text-[#555] uppercase tracking-widest text-[9px]">Location</span>
                <span className="text-white">Global / Remote</span>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-7 lg:pl-12">
          <FadeIn delay={200}>
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <label className="absolute -top-3 left-0 text-[9px] text-[#555] uppercase tracking-widest font-mono bg-[#050505] pr-2 transition-colors duration-500 group-focus-within:text-white">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-[#333] text-white py-4 text-sm focus:outline-none focus:border-white/50 transition-colors duration-500 placeholder:text-[#333]"
                  placeholder="Full Name"
                />
              </div>
              
              <div className="relative group">
                <label className="absolute -top-3 left-0 text-[9px] text-[#555] uppercase tracking-widest font-mono bg-[#050505] pr-2 transition-colors duration-500 group-focus-within:text-white">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-[#333] text-white py-4 text-sm focus:outline-none focus:border-white/50 transition-colors duration-500 placeholder:text-[#333]"
                  placeholder="Email Address"
                />
              </div>
              
              <div className="relative group pt-4">
                <label className="absolute top-1 left-0 text-[9px] text-[#555] uppercase tracking-widest font-mono bg-[#050505] pr-2 transition-colors duration-500 group-focus-within:text-white">Message</label>
                <textarea 
                  rows="5" 
                  className="w-full bg-transparent border-b border-[#333] text-white py-4 mt-2 text-sm focus:outline-none focus:border-white/50 transition-colors duration-500 resize-none placeholder:text-[#333]"
                  placeholder="Project details..."
                ></textarea>
              </div>

              <button className="bg-white text-[#050505] px-10 py-4 text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#E5E5E5] transition-colors duration-700 flex items-center gap-4 group">
                Send Message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-700 ease-out stroke-[1]" />
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#050505] py-12 border-t border-[#111] text-center">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-[#555] text-[9px] uppercase tracking-[0.3em] font-mono">
        © {new Date().getFullYear()} fathan.
      </p>
      <div className="flex gap-4 opacity-50">
        <div className="w-1 h-1 bg-[#444] rounded-full"></div>
        <div className="w-1 h-1 bg-[#444] rounded-full"></div>
        <div className="w-1 h-1 bg-[#444] rounded-full"></div>
      </div>
      <p className="text-[#555] text-[9px] uppercase tracking-[0.3em] font-mono">
        Research & Infrastructure
      </p>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] selection:bg-white selection:text-black font-sans antialiased overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <EditorialIntro />
      <SystemStudies />
      <ThematicTransition />
      <MyProjects />
      <EditorialStatement />
      <ContactSection />
      <Footer />
    </div>
  );
}