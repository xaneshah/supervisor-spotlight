import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Brain, CheckCircle2, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { getAllTeachers } from '@/services/teacherService';
import { useNavigate } from 'react-router-dom';
import type { Teacher } from '@/types';

export function MentorMatcher() {
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState<Teacher | null>(null);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllTeachers().then(setTeachers);
    }, []);

    const handleScan = () => {
        if (teachers.length === 0) return;
        setScanning(true);
        setResult(null);

        // Simulate "AI Scanning"
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * teachers.length);
            setResult(teachers[randomIndex]);
            setScanning(false);
        }, 2500);
    };

    return (
        <GlassCard className="p-6 h-full relative overflow-hidden group border-primary/20" hover={false}>
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Brain size={80} className="text-primary" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Sparkles size={18} className="text-primary animate-pulse" />
                    </div>
                    <div>
                        <h3 className="font-display font-bold text-foreground">Mentor Matcher</h3>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">AI Powered Suggestion</p>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center py-4">
                    <AnimatePresence mode="wait">
                        {scanning ? (
                            <motion.div
                                key="scanning"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center gap-4 py-6"
                            >
                                <div className="relative h-24 w-24">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                        className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Search className="text-primary animate-bounce" size={32} />
                                    </div>
                                    <motion.div
                                        initial={{ y: -50, opacity: 0 }}
                                        animate={{ y: 50, opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="absolute inset-x-0 h-0.5 bg-primary shadow-[0_0_15px_hsl(var(--primary))] z-20"
                                    />
                                </div>
                                <p className="text-sm font-medium text-primary animate-pulse">Analyzing supervisor compatibility...</p>
                            </motion.div>
                        ) : result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full space-y-4"
                            >
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                                        {(result?.name || 'U')[0].toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm">{result?.name || 'Unknown Teacher'}</h4>
                                        <p className="text-xs text-muted-foreground">{result?.subject || 'General'}</p>
                                    </div>
                                    <CheckCircle2 className="text-primary" size={20} />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => navigate(`/teacher/${result.id}`)}
                                        className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
                                    >
                                        View Profile
                                    </button>
                                    <button
                                        onClick={handleScan}
                                        className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-bold hover:bg-secondary/80 transition-colors flex items-center justify-center gap-1"
                                    >
                                        <RefreshCw size={12} /> Retry
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center space-y-4"
                            >
                                <div className="p-4 rounded-full bg-secondary/30 mx-auto w-fit">
                                    <Brain className="text-muted-foreground" size={32} />
                                </div>
                                <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                                    Let AI find the perfect supervisor match for your specific research goals.
                                </p>
                                <button
                                    onClick={handleScan}
                                    className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
                                >
                                    Start Scanning
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </GlassCard>
    );
}
