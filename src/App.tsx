import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CardSkeleton } from "@/components/ui/SkeletonLoader";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Explore = lazy(() => import("./pages/Explore"));
const TeacherProfilePage = lazy(() => import("./pages/TeacherProfilePage"));
const LiveFeed = lazy(() => import("./pages/LiveFeed"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="space-y-4 p-6">
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import AuthPage from "@/pages/AuthPage";

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(240 6% 7%)',
              border: '1px solid hsl(240 4% 16%)',
              color: 'hsl(0 0% 95%)',
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/" element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
              <Route path="/explore" element={<Suspense fallback={<PageLoader />}><Explore /></Suspense>} />
              <Route path="/teacher/:id" element={<Suspense fallback={<PageLoader />}><TeacherProfilePage /></Suspense>} />
              <Route path="/feed" element={<Suspense fallback={<PageLoader />}><LiveFeed /></Suspense>} />
              <Route path="/bookmarks" element={<Suspense fallback={<PageLoader />}><Bookmarks /></Suspense>} />
            </Route>
            <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
