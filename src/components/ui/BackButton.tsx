import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BackButtonProps {
    className?: string;
    label?: string;
}

export function BackButton({ className, label = 'Back' }: BackButtonProps) {
    const navigate = useNavigate();

    return (
        <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
                "group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4 scale-100 hover:scale-105 active:scale-95",
                className
            )}
            onClick={() => navigate(-1)}
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors">
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            </div>
            {label}
        </motion.button>
    );
}
