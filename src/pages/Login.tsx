import { motion } from 'motion/react';
import { LogIn, ArrowLeft } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/src/lib/firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_024928_1efd0b0d-6c02-45a8-8847-1030900c4f63.mp4" type="video/mp4" />
        </video>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[40px] shadow-2xl shadow-blue-500/10 p-10 relative z-10 border border-slate-100"
      >
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 text-slate-400 hover:text-navy-dark transition-colors mb-8 text-sm font-bold"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar para o Início
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-navy-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl text-white font-bold text-2xl">
            S
          </div>
          <h1 className="font-display text-3xl font-bold text-navy-dark mb-3">Bem-vindo à Start Jovem</h1>
          <p className="text-slate-500">Conecte-se para acessar o hub de ferramentas e a comunidade.</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-blue-200 transition-all shadow-sm"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Entrar com Google
        </motion.button>

        <div className="mt-10 pt-10 border-t border-slate-50 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
            Acelerando a nova geração
          </p>
        </div>
      </motion.div>
    </div>
  );
}
