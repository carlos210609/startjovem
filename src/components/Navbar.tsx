import { motion } from 'motion/react';
import { 
  LogIn, 
  LogOut, 
  User as UserIcon,
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  Home,
  Zap
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '@/src/lib/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const navLinks = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, protected: true },
    { name: 'Ferramentas', href: '/tools', icon: Zap },
    { name: 'Comunidade', href: '/community', icon: MessageSquare },
    { name: 'Blog', href: '/blog', icon: BookOpen },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center bg-white/80 backdrop-blur-2xl px-3 py-2 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200/50"
      >
        <Link to="/" className="w-9 h-9 rounded-full bg-[#0a1b33] flex items-center justify-center text-white mr-4 shrink-0 transition-transform hover:scale-110">
          <span className="text-lg font-bold">S</span>
        </Link>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => {
            if (link.protected && !user) return null;
            const isActive = location.pathname === link.href;
            return (
              <Link 
                key={link.name} 
                to={link.href}
                className={cn(
                  "px-4 py-2 text-[12px] font-bold transition-all rounded-full flex items-center gap-2 whitespace-nowrap",
                  isActive 
                    ? "bg-[#0a1b33] text-white" 
                    : "text-slate-500 hover:text-[#0a1b33] hover:bg-slate-50"
                )}
              >
                <link.icon className="w-3.5 h-3.5" />
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="w-px h-6 bg-slate-200 mx-3 shrink-0"></div>

        {user ? (
          <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-full border border-slate-100 ml-auto">
            <img src={user.photoURL || ''} alt="" className="w-7 h-7 rounded-full shadow-sm" />
            <button 
              onClick={handleLogout}
              className="p-1.5 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-red-500"
              title="Sair"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')}
            className="bg-navy-dark ml-auto px-5 py-2 rounded-full text-[12px] font-bold text-white shadow-lg shadow-navy-dark/10 hover:scale-105 transition-all flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Entrar
          </button>
        )}
      </motion.div>
    </nav>
  );
}
