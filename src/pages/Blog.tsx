import { motion } from 'motion/react';
import { Sparkles, Zap, ArrowLeft, Clock, Bookmark } from 'lucide-react';
import Navbar from '@/src/components/Navbar';
import { Link } from 'react-router-dom';
import { ARTICLES } from '@/src/lib/constants';

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      <header className="pt-40 pb-20 px-8 text-center bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6">
            <Sparkles className="w-3 h-3" />
            <span>ARTIGOS & GUIAS</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy-dark mb-6 tracking-tight">
            Conhecimento que escala.
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Aprenda com quem já está no campo de batalha. Guias práticos sobre marketing, tecnologia e mentalidade empreendedora.
          </p>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article, i) => (
            <motion.article 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col h-full"
            >
              <div className="h-60 overflow-hidden relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-navy-dark uppercase tracking-widest shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-4">
                  <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {article.readTime}</span>
                  <span className="flex items-center gap-1.5 text-blue-500"><Zap className="w-3 h-3" /> Nível Bronze</span>
                </div>
                
                <h2 className="text-2xl font-bold text-navy-dark mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                  <button className="flex items-center gap-2 text-navy-dark font-bold text-sm hover:text-blue-600 transition-colors">
                    Ler artigo completo
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                  <button className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  );
}
