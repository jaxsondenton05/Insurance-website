import React, { useEffect, useState } from "react";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  Timestamp 
} from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { db, auth } from "../lib/firebase";
import { FileText, LogOut, ChevronRight, Mail, Phone, MapPin, Calendar, Clock, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  coverageTypes: string[];
  fileName: string | null;
  createdAt: Timestamp;
  status: string;
}

const ALLOWED_EMAILS = ["jaxson@crgia.com", "jaxson.denton05@gmail.com"];

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [filter, setFilter] = useState("all");

  const isAdmin = user && user.email && ALLOWED_EMAILS.includes(user.email.toLowerCase());

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      console.log("Auth state changed:", u?.email);
      setUser(u);
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    setError(null);
    const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const docs: Quote[] = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() } as Quote);
        });
        setQuotes(docs);
      },
      (err) => {
        console.error("Firestore error:", err);
        setError("Failed to load quotes. Check your database permissions.");
      }
    );

    return () => unsubscribe();
  }, [isAdmin]);

  const [loginInProgress, setLoginInProgress] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoginInProgress(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Login successful:", result.user.email);
    } catch (err: any) {
      console.error("Login failed", err);
      // Special check for blocked popups
      if (err.code === 'auth/popup-blocked') {
        setError("Popup was blocked by your browser. Please allow popups for this site.");
      } else {
        setError(err.message || "Login failed");
      }
    } finally {
      setLoginInProgress(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-clay border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-12 border border-neutral-200 text-center">
          <FileText className="w-12 h-12 text-clay mx-auto mb-6" />
          <h1 className="font-display text-2xl font-bold mb-4 uppercase italic">Admin Portal</h1>
          <p className="text-neutral-500 mb-8 font-light italic">
            Please sign in with jaxson@crgia.com to access the quoting system.
          </p>
          <button 
            onClick={handleLogin}
            disabled={loginInProgress}
            className="w-full bg-obsidian text-white py-4 px-8 font-bold hover:bg-clay disabled:bg-neutral-300 transition-colors uppercase tracking-widest text-sm italic"
          >
            {loginInProgress ? "Logging in..." : "Login with Google"}
          </button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 text-xs italic border border-red-100">
              {error}
            </div>
          )}

          {user && !isAdmin && (
            <div className="mt-6 text-red-500 text-sm italic">
              Access denied. You are logged in as <span className="font-bold underline">{user.email}</span>.
              <p className="mt-2 text-[10px] text-neutral-400">This email is not in the allowed administrator list.</p>
              <button onClick={handleLogout} className="block mx-auto mt-4 underline font-bold uppercase tracking-widest text-[10px]">Logout & Try Another Account</button>
            </div>
          )}
          
          {!user && !loginInProgress && !error && (
            <p className="mt-6 text-[10px] text-neutral-400 uppercase tracking-widest">
              Secured with Firebase Authentication
            </p>
          )}
        </div>
      </div>
    );
  }

  const filteredQuotes = filter === "all" ? quotes : quotes.filter(q => q.status === filter);

  return (
    <div className="min-h-screen bg-bone flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-neutral-200 flex flex-col">
        <div className="p-8 border-b border-neutral-200">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-xl font-bold uppercase italic tracking-wider">Dashboard</h1>
            <button onClick={handleLogout} className="text-neutral-400 hover:text-clay transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-1">
            <button 
              onClick={() => setFilter("all")}
              className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors border ${filter === 'all' ? 'bg-bone border-clay/20 text-clay' : 'bg-transparent border-transparent text-neutral-500 hover:bg-bone/50'}`}
            >
              All Quotes ({quotes.length})
            </button>
            <button 
              onClick={() => setFilter("new")}
              className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors border ${filter === 'new' ? 'bg-bone border-clay/20 text-clay' : 'bg-transparent border-transparent text-neutral-500 hover:bg-bone/50'}`}
            >
              New Requests ({quotes.filter(q => q.status === 'new').length})
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredQuotes.map((quote) => (
            <button
              key={quote.id}
              onClick={() => setSelectedQuote(quote)}
              className={`w-full p-6 text-left border-b border-neutral-100 transition-colors ${selectedQuote?.id === quote.id ? 'bg-white shadow-[inset_4px_0_0_0_#9D5139]' : 'hover:bg-white/50'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-display font-bold text-obsidian uppercase tracking-tight truncate mr-2">
                  {quote.name}
                </span>
                <span className={`text-[10px] px-2 py-0.5 border uppercase font-bold tracking-widest ${quote.status === 'new' ? 'bg-clay/10 text-clay border-clay/20' : 'bg-neutral-100 text-neutral-500 border-neutral-200'}`}>
                  {quote.status}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mb-2 truncate italic">{quote.email}</p>
              <div className="flex items-center text-[10px] text-neutral-500 font-mono">
                <Clock className="w-3 h-3 mr-1" />
                {quote.createdAt?.toDate().toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-bone/50">
        <header className="h-20 bg-white border-b border-neutral-200 px-12 flex items-center justify-between">
          <div className="flex items-center text-neutral-400 text-sm">
            <span>Quotes</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-obsidian font-medium">{selectedQuote ? selectedQuote.name : 'Select a quote'}</span>
          </div>
        </header>

        <div className="flex-1 p-12 overflow-y-auto">
          <AnimatePresence mode="wait">
            {selectedQuote ? (
              <motion.div
                key={selectedQuote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl space-y-8"
              >
                <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-2 space-y-8">
                    <section className="bg-white p-10 border border-neutral-200 shadow-sm">
                      <h2 className="text-xs font-bold uppercase tracking-widest text-clay mb-8 font-sans">Contact Information</h2>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="flex items-center text-neutral-500 group">
                            <Mail className="w-4 h-4 mr-3 text-neutral-300 group-hover:text-clay transition-colors" />
                            <a href={`mailto:${selectedQuote.email}`} className="text-sm font-medium hover:text-clay underline decoration-neutral-200 underline-offset-4">{selectedQuote.email}</a>
                          </div>
                          <div className="flex items-center text-neutral-500">
                            <Phone className="w-4 h-4 mr-3 text-neutral-300" />
                            <span className="text-sm font-medium">{selectedQuote.phone}</span>
                          </div>
                        </div>
                        <div className="flex items-start text-neutral-500">
                          <MapPin className="w-4 h-4 mr-3 mt-0.5 text-neutral-300" />
                          <span className="text-sm font-medium leading-relaxed">{selectedQuote.address}</span>
                        </div>
                      </div>
                    </section>

                    <section className="bg-white p-10 border border-neutral-200 shadow-sm">
                      <h2 className="text-xs font-bold uppercase tracking-widest text-clay mb-8 font-sans">Requested Coverage</h2>
                      <div className="flex flex-wrap gap-2">
                        {selectedQuote.coverageTypes.map((type, i) => (
                          <span key={i} className="px-4 py-2 bg-bone text-xs font-bold uppercase tracking-tight text-obsidian border border-neutral-100">
                            {type}
                          </span>
                        ))}
                      </div>
                    </section>

                    {selectedQuote.fileName && (
                      <section className="bg-white p-10 border border-neutral-200 shadow-sm">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-clay mb-8 font-sans">Attached Documents</h2>
                        <div className="flex items-center p-4 bg-bone border border-neutral-100">
                          <FileText className="w-8 h-8 text-neutral-300 mr-4" />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider">{selectedQuote.fileName}</p>
                            <p className="text-[10px] text-neutral-400 italic">Policy Declarations Page</p>
                          </div>
                        </div>
                      </section>
                    )}
                  </div>

                  <div className="space-y-8">
                    <section className="bg-white p-10 border border-neutral-200 shadow-sm">
                      <h2 className="text-xs font-bold uppercase tracking-widest text-clay mb-6 font-sans">Details</h2>
                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-neutral-400 mb-1">Submitted On</p>
                          <div className="flex items-center text-xs font-medium text-obsidian">
                            <Calendar className="w-3.5 h-3.5 mr-2 text-neutral-300" />
                            {selectedQuote.createdAt?.toDate().toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-neutral-400 mb-1">Lead ID</p>
                          <p className="text-[10px] font-mono text-neutral-500 break-all">{selectedQuote.id}</p>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-neutral-400">
                <FileText className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-light italic">Select a quote request from the left to view details</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
