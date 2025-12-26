import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { allSkills, domains, experienceLevels } from '@/data/opportunities';
import { Lightbulb, X, Plus, ArrowRight, Loader2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CreateOpportunity() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: '',
    type: '',
    minExperience: '',
    teamSize: '',
    deadline: '',
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills(prev => [...prev, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast({
        title: 'Please log in',
        description: 'You need to be logged in to create an opportunity.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    if (selectedSkills.length === 0) {
      toast({
        title: 'Please add required skills',
        description: 'Add at least one skill requirement for your team.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: 'Opportunity created!',
      description: 'Your opportunity has been posted successfully.',
    });

    navigate('/opportunities');
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <Card className="max-w-md w-full text-center">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Create Your Team</CardTitle>
              <CardDescription>
                Log in to start posting opportunities and building your dream team.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/login">
                <Button className="w-full" size="lg">Log in to Continue</Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-accent hover:underline">Sign up</Link>
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create an Opportunity</h1>
            <p className="text-muted-foreground">
              Post a new opportunity and find the perfect teammates for your project.
            </p>
          </div>

          <Card className="shadow-medium">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Opportunity Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., AI-Powered Study Assistant Hackathon"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    <Lightbulb className="h-3 w-3 inline mr-1" />
                    Make it descriptive and catchy to attract the right candidates.
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project, goals, and what you're looking for in teammates..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                    required
                  />
                </div>

                {/* Type & Domain */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Opportunity Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hackathon">Hackathon</SelectItem>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Domain *</Label>
                    <Select
                      value={formData.domain}
                      onValueChange={(value) => setFormData({ ...formData, domain: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select domain" />
                      </SelectTrigger>
                      <SelectContent>
                        {domains.filter(d => d !== 'All').map((domain) => (
                          <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Experience & Team Size */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Minimum Experience *</Label>
                    <Select
                      value={formData.minExperience}
                      onValueChange={(value) => setFormData({ ...formData, minExperience: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Team Size Needed *</Label>
                    <Input
                      id="teamSize"
                      type="number"
                      min="1"
                      max="20"
                      placeholder="e.g., 4"
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline (optional)</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>

                {/* Required Skills */}
                <div className="space-y-3">
                  <Label>Required Skills *</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a custom skill..."
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addCustomSkill();
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addCustomSkill}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Selected Skills */}
                  {selectedSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 bg-secondary/50 rounded-lg">
                      {selectedSkills.map((skill) => (
                        <Badge key={skill} variant="accent" className="gap-1">
                          {skill}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => handleSkillToggle(skill)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Suggested Skills */}
                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground">Suggested skills:</span>
                    <div className="flex flex-wrap gap-2">
                      {allSkills.filter(s => !selectedSkills.includes(s)).slice(0, 12).map((skill) => (
                        <Badge
                          key={skill}
                          variant="skill"
                          className="cursor-pointer hover:bg-accent/10"
                          onClick={() => handleSkillToggle(skill)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-border">
                  <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Create Opportunity
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
