import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { allSkills, experienceLevels } from '@/data/opportunities';
import { Users, Mail, Lock, User, ArrowRight, Loader2, X } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    experience: '' as 'beginner' | 'intermediate' | 'advanced' | 'expert' | '',
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const interests = ['Web Development', 'AI/ML', 'Mobile Apps', 'Data Science', 'Game Development', 'Startups', 'Research', 'Open Source'];

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.experience) {
      toast({
        title: 'Please select your experience level',
        variant: 'destructive',
      });
      return;
    }

    if (selectedSkills.length === 0) {
      toast({
        title: 'Please select at least one skill',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const success = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        skills: selectedSkills,
        experience: formData.experience as 'beginner' | 'intermediate' | 'advanced' | 'expert',
        interests: selectedInterests,
      });

      if (success) {
        toast({
          title: 'Welcome to TeamMates.X!',
          description: 'Your account has been created successfully.',
        });
        navigate('/opportunities');
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
            Join the Community
          </h2>
          <p className="text-primary-foreground/80">
            Create your profile, showcase your skills, and start connecting with teams that match your expertise.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-lg py-8">
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
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>
                Tell us about yourself to get matched with the right teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => setFormData({ ...formData, experience: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <Label>Skills (select at least one)</Label>
                  <div className="flex flex-wrap gap-2 p-4 border border-border rounded-lg bg-secondary/30 max-h-32 overflow-y-auto">
                    {allSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? 'accent' : 'skill'}
                        className="cursor-pointer transition-all hover:scale-105"
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {skill}
                        {selectedSkills.includes(skill) && (
                          <X className="h-3 w-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <Label>Interests (optional)</Label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant={selectedInterests.includes(interest) ? 'accent' : 'outline'}
                        className="cursor-pointer transition-all hover:scale-105"
                        onClick={() => handleInterestToggle(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-accent hover:underline font-medium">
                  Log in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
