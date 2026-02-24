import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { AnimatePresence, motion } from 'framer-motion';

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen w-full bg-background mesh-gradient relative overflow-hidden">
      {/* Soft Background Glows for Light Theme Depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 dark:bg-violet-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 dark:bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Background Grid Overlay */}
      <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-[0.03] dark:opacity-[0.02]" />

      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 left-0 z-50 md:hidden"
            >
              <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col min-w-0 relative z-10">
        <TopBar onMenuToggle={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1 p-4 pb-20 md:p-6 md:pb-6 overflow-y-auto scrollbar-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
