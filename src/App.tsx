/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Globe,
  Plus,
  Rocket
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useEffect, useState, useRef, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Community from '@/src/components/Community';
import Login from '@/src/pages/Login';
import Blog from '@/src/pages/Blog';
import CommunityPage from '@/src/pages/CommunityPage';
import Dashboard from '@/src/pages/Dashboard';
import ToolsBank from '@/src/pages/ToolsBank';
import Navbar from '@/src/components/Navbar';
import { auth } from '@/src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ARTICLES, IDEAS, LOGOS } from '@/src/lib/constants';

const FloatingCard = ({ 
  children, 
  className, 
  delay = 0 
}: { 
  children: ReactNode; 
  className?: string; 
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95, rotate: -5 }}
    animate={{ 
      opacity: 1, 
      y: [0, -10, 0], 
      scale: 1,
      rotate: [-2, 2, -2]
    }}
    transition={{
      opacity: { duration: 0.8, delay },
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay + 0.5
      },
      rotate: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      },
      scale: { duration: 0.8, delay }
    }}
    className={cn(
      "absolute backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl p-4 shadow-xl pointer-events-none z-30",
      className
    )}
  >
    {children}
  </motion.div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tools" element={<ToolsBank />} />
      </Routes>
    </Router>
  );
}

function Landing() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen font-sans selection:bg-blue-100 selection:text-blue-700 overflow-x-hidden pb-32">
      <Navbar />
      
      {/* Background Decorative Particles/Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px]" 
          style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/40 rounded-full blur-[120px]" 
          style={{ transform: `translate(${-mousePos.x * 30}px, ${-mousePos.y * 30}px)` }}
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/p6.png")' }}></div>
      </div>

      <div className="px-4 md:px-6">
        {/* Main Hero Container */}
        <section className="relative w-full max-w-[1450px] mx-auto rounded-[52px] bg-white border border-slate-200/60 shadow-[0_40px_120px_-20px_rgba(15,23,42,0.06)] overflow-hidden min-h-[720px]">
          
          {/* Animated Video Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-40">
             <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-transparent to-slate-50 z-10"></div>
             <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
               <defs>
                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                   <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                 </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#grid)" />
             </svg>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-105 brightness-[0.98] transition-transform duration-[3000ms]"
            >
              <source 
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_024928_1efd0b0d-6c02-45a8-8847-1030900c4f63.mp4" 
                type="video/mp4" 
              />
            </video>
          </div>

          {/* Floating Info Cards */}
          <FloatingCard 
            className="top-24 right-20 hidden lg:flex items-center gap-3 w-64 bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg -rotate-2"
            delay={0.2}
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">+</div>
            <div>
              <p className="text-xs font-bold text-slate-900 tracking-tight">+1200 jovens</p>
              <p className="text-[10px] text-slate-500">Começaram com a Start Jovem</p>
            </div>
          </FloatingCard>

          <FloatingCard 
            className="bottom-40 right-10 hidden xl:flex items-center gap-3 w-64 bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg translate-x-12 rotate-3"
            delay={0.5}
          >
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
               <Zap className="w-5 h-5 text-indigo-600 fill-indigo-600/20" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 tracking-tight">Hub de Ferramentas</p>
              <p className="text-[10px] text-slate-500">Tudo para sua empresa</p>
            </div>
          </FloatingCard>

          {/* Hero Content Area */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 flex flex-col items-start px-8 md:px-20 pt-16 md:pt-24 max-w-[800px]"
          >
            {/* Announcement Badge */}
            <motion.div
              whileHover={{ y: -1 }}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/80 shadow-sm mb-8 cursor-default"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest">
                Start Jovem: Acelerando o seu futuro
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="font-display text-[48px] md:text-[68px] leading-[0.95] tracking-tighter font-bold text-[#0a1b33]">
              Dê o <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 drop-shadow-sm">play</span><br />
              no seu negócio<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 drop-shadow-sm">agora mesmo.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-[17px] text-slate-600 leading-relaxed max-w-[540px] mt-10">
              O ecossistema completo para jovens transformarem criatividade e tecnologia em renda. Aprenda IA, marketing e gestão de forma prática e gratuita.
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/login')}
                className="group flex items-center gap-3 px-8 py-4 bg-[#0a1b33] text-white rounded-full font-semibold shadow-xl shadow-blue-900/10 transition-transform"
              >
                Entrar no Start Hub
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </motion.button>
              
              <motion.button
                whileHover={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/40 backdrop-blur-lg border border-slate-200 text-slate-700 rounded-full font-semibold hover:bg-white/60 transition-colors"
                onClick={() => document.getElementById('hub')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explorar Ideias
              </motion.button>
            </div>
          </motion.div>

          {/* Removal of old floating navbar */}
        </section>

        <div id="ferramentas" className="mt-20 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
          
          <div className="flex animate-marquee whitespace-nowrap gap-8 py-4">
            {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
              <div 
                key={`${logo.name}-${idx}`} 
                className="h-14 w-36 shrink-0 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all font-bold text-slate-400 group overflow-hidden"
              >
                <span className="text-[10px] tracking-widest hidden group-hover:block transition-all">{logo.name.toUpperCase()}</span>
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  className="h-6 max-w-[100px] object-contain group-hover:hidden transition-all" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Start Hub Section */}
      <section id="hub" className="mt-40 px-4 md:px-8 max-w-[1400px] mx-auto py-24 rounded-[64px] bg-slate-50 relative overflow-hidden">
        {/* Background Video Layer for Section */}
        <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4" type="video/mp4" />
          </video>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-center mb-20 px-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 italic">
            <Rocket className="w-3 h-3" />
            <span>START HUB</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-navy-dark leading-tight mb-6 tracking-tight">
            O seu centro de controle<br />empreendedor.
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Turbine sua jornada com ferramentas de ponta, ideias validadas e o conhecimento que as escolas não ensinam.
          </p>
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 px-2 md:px-8">
          {/* Articles Column */}
          <div id="artigos" className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="font-display text-2xl font-bold text-navy-dark flex items-center gap-3">
                Artigos & Guias
                <Sparkles className="w-5 h-5 text-blue-500" />
              </h3>
              <button 
                onClick={() => navigate('/blog')}
                className="text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
              >
                Ver todos
              </button>
            </div>
            <div className="space-y-4">
              {ARTICLES.map((article, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 12 }}
                  className="flex flex-col sm:flex-row gap-5 p-5 rounded-[32px] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-blue-500/5 cursor-pointer group"
                >
                  <div className="overflow-hidden rounded-2xl w-full sm:w-32 h-32 shrink-0">
                    <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-2">{article.category}</span>
                    <h4 className="font-bold text-xl text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{article.title}</h4>
                    <div className="flex items-center gap-3 text-slate-400 text-xs font-semibold">
                      <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {article.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ideas & Tools Column */}
          <div className="space-y-12">
            {/* Ideas Bank */}
            <div id="ideias" className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-navy-dark">Acelerador de Ideias</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {IDEAS.map((idea, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    className="p-6 rounded-[32px] bg-white border border-slate-100 hover:border-blue-200 transition-all cursor-crosshair shadow-sm"
                  >
                    <h4 className="font-bold text-lg text-slate-900 mb-3">{idea.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-50 text-[10px] font-bold text-slate-500 border border-slate-100">Complexidade: {idea.complexity}</span>
                    </div>
                  </motion.div>
                ))}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/blog')}
                  className="p-8 rounded-[32px] bg-navy-dark flex flex-col items-center justify-center text-white text-center cursor-pointer hover:bg-[#0f2a4a] transition-all shadow-xl shadow-navy-dark/10"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest">Descobrir Ideias</span>
                </motion.div>
              </div>
            </div>

            {/* Tools Summary */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="group p-10 rounded-[48px] bg-linear-to-br from-[#0a1b33] via-blue-900 to-indigo-900 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
               <div className="relative z-10">
                 <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                   <Globe className="w-7 h-7 text-blue-300" />
                 </div>
                 <h3 className="text-3xl font-bold mb-4 tracking-tight">Banco de Ferramentas</h3>
                 <p className="text-blue-100/70 text-lg mb-8 max-w-sm leading-relaxed">
                   Acesso VIP a mais de 150 ferramentas escolhidas a dedo para automatizar, escalar e gerenciar seu negócio.
                 </p>
                 <button 
                   onClick={() => navigate('/tools')}
                   className="flex items-center gap-3 bg-white text-[#0a1b33] font-bold py-4 px-8 rounded-full text-sm hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl group-hover:scale-105"
                 >
                   Acessar Banco de Dados
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </button>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Community />

      {/* Additional Interactive Elements */}
      <div className="mt-32 px-8 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6">
            <Rocket className="w-3 h-3" />
            <span>PRONTO PARA DECOLAR</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-dark leading-tight mb-6">
            Transforme sua visão em uma startup de sucesso.
          </h2>
          <p className="text-slate-500 text-lg mb-10">
            A jornada do empreendedor começa com o primeiro passo. Fornecemos as ferramentas, a rede e o conhecimento necessário para você dominar o mercado digital.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
            {[
              { icon: Globe, title: "Foco Global", desc: "Sua ideia não tem fronteiras com as ferramentas certas." },
              { icon: Zap, title: "Aceleração IA", desc: "Utilize inteligência artificial para produzir mais em menos tempo." },
              { icon: Plus, title: "Comunidade", desc: "Conecte-se com outros jovens talentos e co-fundadores." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all outline outline-transparent hover:outline-blue-500/10"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-navy-dark" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-navy-dark">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

