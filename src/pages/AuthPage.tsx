import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [isResetMode, setIsResetMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login, signup, resetPassword } = useAuth()!;
    const navigate = useNavigate();

    const isDomainValid = email.toLowerCase().endsWith('@nutech.edu.pk');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!isDomainValid) {
            toast.error("Please use your official university email (@nutech.edu.pk).");
            return;
        }

        setIsLoading(true);

        try {
            if (isResetMode) {
                await resetPassword(email);
                toast.success("Password reset email sent! Check your inbox.");
                setIsResetMode(false);
                setIsLogin(true);
            } else if (isLogin) {
                await login(email, password);
                navigate('/');
            } else {
                await signup(email, password, name);
                toast.success("Account created! Redirecting...");
                navigate('/');
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Action failed");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            {/* Left Side - Branding Hub */}
            <div className="relative hidden w-1/2 flex-col justify-between p-12 text-white lg:flex">
                <div className="absolute inset-0 bg-zinc-900">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="relative z-10 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-indigo-500/20 backdrop-blur border border-indigo-500/30 flex items-center justify-center">
                        <span className="font-bold text-indigo-400">IP</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">ICAT Supervisor</span>
                </div>

                <div className="relative z-10 space-y-6 max-w-lg">
                    <h1 className="text-6xl font-extrabold tracking-tight leading-tight">
                        Find your mentor.<br />
                        <span className="text-indigo-400">Build your future.</span>
                    </h1>
                    <p className="text-lg text-zinc-400">
                        Connect with top faculty, explore research opportunities, and shape your academic journey with the perfect supervisor.
                    </p>
                </div>

                <div className="relative z-10 text-sm text-zinc-500">
                    © 2026 ICAT University. All rights reserved.
                </div>
            </div>

            {/* Right Side - Interactive Form */}
            <div className="flex w-full items-center justify-center lg:w-1/2 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-3xl">
                <div className="w-full max-w-md space-y-8 px-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">
                            {isResetMode ? 'Reset password' : isLogin ? 'Welcome back' : 'Create an account'}
                        </h2>
                        <p className="text-muted-foreground">
                            {isResetMode
                                ? 'Enter your email to receive a reset link'
                                : isLogin
                                    ? 'Enter your credentials to access your dashboard'
                                    : 'Sign up specifically with your @nutech.edu.pk email'}
                        </p>
                    </div>

                    <div className="p-8 border border-white/20 rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!isLogin && !isResetMode && (
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="bg-white/50 dark:bg-zinc-800/50 border-white/10 focus:ring-indigo-500"
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="student@nutech.edu.pk"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={`bg-white/50 dark:bg-zinc-800/50 border-white/10 focus:ring-indigo-500 ${email && !isDomainValid ? 'border-red-500 focus:ring-red-500' : ''}`}
                                />
                                {email && !isDomainValid && (
                                    <p className="text-xs text-red-500">Please use your official university email (@nutech.edu.pk).</p>
                                )}
                            </div>

                            {!isResetMode && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        {isLogin && (
                                            <button
                                                type="button"
                                                onClick={() => setIsResetMode(true)}
                                                className="text-xs text-indigo-500 hover:text-indigo-400"
                                            >
                                                Forgot password?
                                            </button>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="bg-white/50 dark:bg-zinc-800/50 border-white/10 focus:ring-indigo-500 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 h-11"
                                disabled={isLoading || (email.length > 0 && !isDomainValid)}
                            >
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {isResetMode ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Create Account'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            {isResetMode ? (
                                <button
                                    onClick={() => setIsResetMode(false)}
                                    className="font-medium text-indigo-500 hover:text-indigo-400 hover:underline"
                                >
                                    Back to Login
                                </button>
                            ) : (
                                <>
                                    <span className="text-muted-foreground">
                                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                                    </span>
                                    <button
                                        onClick={() => setIsLogin(!isLogin)}
                                        className="font-medium text-indigo-500 hover:text-indigo-400 hover:underline"
                                    >
                                        {isLogin ? 'Sign up' : 'Sign in'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
