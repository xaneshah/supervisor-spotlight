import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Brain, Code, Zap, ArrowRight, Loader2,
    Terminal, Shield, Globe, BarChart3,
    Settings, Building2, Cpu, Factory
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFilterStore } from '@/stores/useFilterStore';
import { getDepartmentCounts } from '@/services/teacherService';
import { useState, useEffect } from 'react';

const departments = [
    {
        id: 'ai',
        name: 'Artificial Intelligence',
        icon: Brain,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
        gradient: 'from-purple-500/20 to-blue-500/20',
    },
    {
        id: 'cs',
        name: 'Computer Science',
        icon: Code,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/20',
        gradient: 'from-cyan-500/20 to-teal-500/20',
    },
    {
        id: 'ee',
        name: 'Electrical Engineering',
        icon: Zap,
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        gradient: 'from-amber-500/20 to-orange-500/20',
    },
    {
        id: 'se',
        name: 'Software Engineering',
        icon: Terminal,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        gradient: 'from-blue-500/20 to-indigo-500/20',
    },
    {
        id: 'cysec',
        name: 'Cyber Security',
        icon: Shield,
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/20',
        gradient: 'from-red-500/20 to-pink-500/20',
    },
    {
        id: 'it',
        name: 'Information Tech',
        icon: Globe,
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/20',
        gradient: 'from-indigo-500/20 to-blue-500/20',
    },
    {
        id: 'ds',
        name: 'Data Science',
        icon: BarChart3,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        gradient: 'from-emerald-500/20 to-teal-500/20',
    },
    {
        id: 'me',
        name: 'Mechanical Eng',
        icon: Settings,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20',
        gradient: 'from-orange-500/20 to-red-500/20',
    },
    {
        id: 'ce',
        name: 'Civil Engineering',
        icon: Building2,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/20',
        gradient: 'from-yellow-500/20 to-amber-500/20',
    },
    {
        id: 'cen',
        name: 'Computer Eng',
        icon: Cpu,
        color: 'text-teal-400',
        bg: 'bg-teal-500/10',
        border: 'border-teal-500/20',
        gradient: 'from-teal-500/20 to-cyan-500/20',
    },
    {
        id: 'ie',
        name: 'Industrial Eng',
        icon: Factory,
        color: 'text-rose-400',
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/20',
        gradient: 'from-rose-500/20 to-orange-500/20',
    }
] as const;

export function DepartmentTiles() {
    const setDepartment = useFilterStore((state) => state.setDepartment);
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDepartmentCounts().then(c => {
            setCounts(c);
            setLoading(false);
        });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {departments.map((dept, i) => (
                <motion.div
                    key={dept.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="h-full"
                >
                    <Link
                        to="/explore"
                        onClick={() => setDepartment(dept.id)}
                        className={cn(
                            "group relative flex h-full items-center justify-between overflow-hidden rounded-xl border p-4 transition-all hover:scale-[1.02] hover:shadow-lg",
                            "bg-white/5 dark:bg-black/20 backdrop-blur-md",
                            dept.border
                        )}
                    >
                        <div className={cn(
                            "absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-r",
                            dept.gradient
                        )} />

                        <div className="relative flex items-center gap-4">
                            <div className={cn("rounded-lg p-2.5", dept.bg)}>
                                <dept.icon className={cn("h-6 w-6", dept.color)} />
                            </div>
                            <div>
                                <h3 className="font-display font-semibold text-foreground">
                                    {dept.name}
                                </h3>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    {loading ? <Loader2 size={10} className="animate-spin" /> : counts[dept.id]} Faculty
                                </p>
                            </div>
                        </div>

                        <div className="relative rounded-full bg-white/5 p-2 text-muted-foreground transition-colors group-hover:bg-white/10 group-hover:text-foreground">
                            <ArrowRight size={16} />
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
