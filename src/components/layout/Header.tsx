import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Menu, X, User, LogOut, Plus } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/opportunities', label: 'Opportunities' },
    { path: '/create', label: 'Create Team', requiresAuth: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <Users className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-foreground">
            TeamMates<span className="text-accent">.X</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            if (link.requiresAuth && !isAuthenticated) return null;
            return (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={isActive(link.path) ? 'secondary' : 'ghost'}
                  size="sm"
                  className="font-medium"
                >
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  {user?.name?.split(' ')[0]}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button variant="accent" size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              if (link.requiresAuth && !isAuthenticated) return null;
              return (
                <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={isActive(link.path) ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                  >
                    {link.label}
                  </Button>
                </Link>
              );
            })}
            <div className="h-px bg-border my-2" />
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => { logout(); setMobileMenuOpen(false); }} className="justify-start gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">Log in</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="accent" className="w-full">Sign up</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
