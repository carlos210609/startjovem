import Navbar from '@/src/components/Navbar';
import Community from '@/src/components/Community';
import { motion } from 'motion/react';
import { MessageSquare, Users, Sparkles } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      <header className="pt-40 pb-20 px-8 text-center bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 opacity-50" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-6 italic">
            <Users className="w-3 h-3" />
            <span>ECOSSISTEMA VIVO</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy-dark mb-6 tracking-tight">
            Conversas que criam Valor.
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Faça perguntas, compartilhe vitórias e encontre parceiros de negócio. A maior rede de jovens empreendedores do país está aqui.
          </p>
        </motion.div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-[-40px]">
        <div className="relative z-20">
          <Community />
        </div>
      </main>
      
      <div className="mt-20 text-center px-8">
        <div className="inline-flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest bg-white px-6 py-3 rounded-full border border-slate-100 shadow-sm">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span>Fim do feed por hoje. Volte mais tarde!</span>
        </div>
      </div>
    </div>
  );
}
