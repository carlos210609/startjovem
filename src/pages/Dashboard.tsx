import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '@/src/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { motion } from 'motion/react';
import Navbar from '@/src/components/Navbar';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Settings, 
  Zap, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  LayoutDashboard,
  Plus,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        setUser(user);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) return null;

  const stats = [
    { label: 'Projetos Ativos', value: '0', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Conexões', value: '42', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'XP Acumulado', value: '1.2k', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  const tools = [
    { name: 'Gerador de Nomes', status: 'Ativo', icon: Sparkles },
    { name: 'Validador de Ideias', status: 'Beta', icon: ShieldCheck },
    { name: 'Canvas Estratégico', status: 'Ativo', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-8 pt-32">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
                Painel do Empreendedor
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                <Calendar className="w-3.5 h-3.5" />
                {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold text-navy-dark tracking-tight">
              Olá, {user?.displayName?.split(' ')[0]} 👋
            </h1>
            <p className="text-slate-500 mt-2">Aqui está o que está acontecendo com o seu progresso hoje.</p>
          </div>
          
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Settings className="w-4 h-4" />
            Configurações
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm"
            >
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">{stat.label}</p>
              <h3 className="text-4xl font-bold text-navy-dark">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Activity Area */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8">
                <BarChart3 className="w-24 h-24 text-slate-50 opacity-50" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-navy-dark mb-6">Seus Projetos</h3>
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-[32px] p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
                    <Plus className="w-8 h-8 text-slate-300" />
                  </div>
                  <h4 className="font-bold text-navy-dark mb-2">Nenhum projeto iniciado</h4>
                  <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto">Comece agora a transformar sua ideia em realidade usando nossas metodologias.</p>
                  <button className="bg-navy-dark text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-navy-dark/10 hover:scale-105 transition-transform">
                    Criar meu Primeiro Projeto
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <section className="bg-navy-dark rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6">Power Tools</h3>
                <div className="space-y-4">
                  {['Gerador de Pitch', 'Validador de Ideias', 'Calculadora de ROI'].map((tool, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors cursor-pointer">
                      <span className="text-sm font-semibold">{tool}</span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-full text-sm transition-all">
                  Ver todas as ferramentas
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            <section className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-navy-dark mb-6 flex items-center justify-between">
                Missões Diárias
                <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">+50 XP</span>
              </h3>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded-lg accent-blue-600" />
                  <span className="text-sm font-medium text-slate-600">Ler o Guia de Início Rápido</span>
                </label>
                <label className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded-lg accent-blue-600" />
                  <span className="text-sm font-medium text-slate-600">Fazer seu primeiro post</span>
                </label>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
