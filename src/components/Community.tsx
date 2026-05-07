import { useState, useEffect, FormEvent } from 'react';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '@/src/lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Heart, Send, LogIn, User as UserIcon, LogOut } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useNavigate } from 'react-router-dom';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface Post {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  likesCount: number;
  createdAt: any;
}

export default function Community() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Sync user profile
        const userRef = doc(db, 'users', user.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            await setDoc(userRef, {
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              createdAt: serverTimestamp(),
            });
          }
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      }
      setLoading(false);
    });

    const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setPosts(postsData);
    }, (error) => {
      // Don't crash the whole app if posts fail to load (e.g. permission issues)
      console.warn('Firestore Posts Error: ', error.message);
      // Only throw if user is signed in but still gets error
      if (auth.currentUser) {
        handleFirestoreError(error, OperationType.LIST, 'posts');
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribePosts();
    };
  }, []);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => auth.signOut();

  const handleSubmitPost = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !user) return;

    const path = 'posts';
    try {
      await addDoc(collection(db, path), {
        content: newPost,
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous',
        authorPhoto: user.photoURL || '',
        likesCount: 0,
        createdAt: serverTimestamp(),
      });
      setNewPost('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) return;
    const path = `posts/${postId}`;
    try {
      await updateDoc(doc(db, 'posts', postId), {
        likesCount: increment(1)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  return (
    <section id="community" className="mt-40 px-4 md:px-8 max-w-[1000px] mx-auto py-20 bg-white rounded-[48px] border border-slate-100 shadow-2xl relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="font-display text-4xl font-bold text-navy-dark tracking-tight mb-2">Comunidade Start Jovem</h2>
          <p className="text-slate-500">Conecte-se, compartilhe ideias e cresça com outros empreendedores.</p>
        </div>
        
        <div>
          {user ? (
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-full border border-slate-100">
              <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full" />
              <span className="text-xs font-bold text-navy-dark hidden sm:block">{user.displayName}</span>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-red-500"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 bg-navy-dark text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl shadow-navy-dark/10 hover:scale-105 transition-transform"
            >
              <LogIn className="w-4 h-4" />
              Entrar com Google
            </button>
          )}
        </div>
      </div>

      {user ? (
        <form onSubmit={handleSubmitPost} className="mb-12">
          <div className="relative">
            <textarea 
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="O que você está construindo hoje?"
              className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none min-h-[120px]"
            />
            <button 
              type="submit"
              disabled={!newPost.trim()}
              className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-2xl shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:grayscale transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-slate-50 rounded-[32px] p-10 text-center mb-12 border border-dashed border-slate-200">
          <UserIcon className="w-10 h-10 text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-navy-dark mb-2">Participe da conversa</h3>
          <p className="text-slate-500 text-sm mb-6">Faça login para postar e interagir com a comunidade.</p>
          <button 
            onClick={handleLogin}
            className="text-blue-600 font-bold hover:underline"
          >
            Entrar agora
          </button>
        </div>
      )}

      <div className="space-y-6">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <img src={post.authorPhoto || ''} alt="" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                <div>
                  <h4 className="text-sm font-bold text-navy-dark">{post.authorName}</h4>
                  <span className="text-[10px] text-slate-400">
                    {post.createdAt?.toDate().toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <p className="text-slate-700 leading-relaxed mb-6 whitespace-pre-wrap">{post.content}</p>
              
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-slate-500 hover:text-pink-500 transition-colors group"
                >
                  <div className="p-2 rounded-full group-hover:bg-pink-50 transition-colors">
                    <Heart className={cn("w-4 h-4", post.likesCount > 0 && "fill-pink-500 text-pink-500")} />
                  </div>
                  <span className="text-xs font-bold">{post.likesCount}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors group">
                  <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold">Comentar</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
