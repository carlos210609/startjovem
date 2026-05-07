import { motion } from 'motion/react';
import { Sparkles, ExternalLink, Search, Filter, ShieldCheck, Zap } from 'lucide-react';
import Navbar from '@/src/components/Navbar';
import { TOOLS } from '@/src/lib/constants';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

export default function ToolsBank() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');

  const categories = ['Todas', ...Array.from(new Set(TOOLS.map(t => t.category)))];

  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                         tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'Todas' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      <header className="pt-40 pb-20 px-8 text-center bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-50 rounded-full blur-[120px] opacity-30" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold mb-6 italic">
            <Zap className="w-3 h-3" />
            <span>ARSENAL DE GUERRA DIGITAL</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy-dark mb-6 tracking-tight">
            Seu Banco de <span className="text-emerald-600">Ferramentas</span>.
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            As melhores armas para construir seu império. Filtradas, testadas e aprovadas pela nossa comunidade.
          </p>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-8 mt-12">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
          <div className="flex items-center gap-2 p-1 bg-white rounded-full border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                  activeCategory === cat 
                    ? "bg-navy-dark text-white shadow-lg" 
                    : "text-slate-400 hover:text-navy-dark hover:bg-slate-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar ferramenta..."
              className="w-full pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-full text-sm focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white p-8 rounded-[40px] border border-slate-100 hover:border-emerald-200 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                  <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain" />
                </div>
                {tool.badge && (
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                    {tool.badge}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-navy-dark mb-2 group-hover:text-emerald-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 h-12 overflow-hidden">
                {tool.description}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {tool.category}
                </span>
                <a 
                  href={tool.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-navy-dark font-bold text-sm hover:text-emerald-600 transition-colors"
                >
                  Acessar
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[48px] border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium italic">Nenhuma ferramenta encontrada para "{search}"</p>
          </div>
        )}
      </main>
    </div>
  );
}
