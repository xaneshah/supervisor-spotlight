import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Confetti() {
    const [pieces, setPieces] = useState<any[]>([]);

    useEffect(() => {
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
        const p = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: -20,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            delay: Math.random() * 2,
            duration: Math.random() * 2 + 1,
            rotation: Math.random() * 360,
        }));
        setPieces(p);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {pieces.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ x: `${p.x}vw`, y: '-10vh', rotate: 0 }}
                    animate={{ x: `${p.x + (Math.random() * 20 - 10)}vw`, y: '110vh', rotate: p.rotation * 4 }}
                    transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
                    style={{
                        position: 'absolute',
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    }}
                />
            ))}
        </div>
    );
}
