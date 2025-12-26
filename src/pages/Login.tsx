import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Users, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        navigate('/opportunities');
      } else {
        toast({
          title: 'Login failed',
          description: 'Please check your credentials and try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative" style={{ background: 'var(--gradient-hero)' }}>
        <div className="max-w-md text-center">
          <Link to="/" className="flex items-center gap-3 justify-center mb-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20">
              <Users className="h-8 w-8 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-primary-foreground">
              TeamMates<span className="text-gradient">.X</span>
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Welcome Back
          </h2>
          <p className="text-primary-foreground/80">
            Continue building amazing projects with your team. Log in to access your opportunities and connections.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 justify-center mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              TeamMates<span className="text-accent">.X</span>
            </span>
          </Link>

          <Card className="border-border shadow-medium">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Log in</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Log in
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-accent hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
