import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { opportunities } from '@/data/opportunities';
import { 
  User, Mail, Briefcase, Code, Heart, Users, Plus, 
  Edit2, ArrowRight, Sparkles, Trophy 
} from 'lucide-react';

const experienceLabels = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced', expert: 'Expert' };

export default function Profile() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <Card className="max-w-md w-full text-center">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">View Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Log in to view and manage your profile, skills, and team memberships.
              </p>
              <Link to="/login">
                <Button className="w-full" size="lg">Log in</Button>
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

  const joinedOpportunities = opportunities.filter(opp => user.joinedTeams.includes(opp.id));
  const createdOpportunities = opportunities.filter(opp => user.createdOpportunities.includes(opp.id));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Profile Header */}
          <Card className="mb-8 overflow-hidden">
            <div className="h-32 relative" style={{ background: 'var(--gradient-hero)' }}>
              <div className="absolute -bottom-12 left-8">
                <div className="w-24 h-24 rounded-2xl bg-card border-4 border-card flex items-center justify-center shadow-medium">
                  <span className="text-4xl font-bold text-accent">
                    {user.name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
            <CardContent className="pt-16 pb-6 px-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-1">{user.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  {user.bio && (
                    <p className="text-muted-foreground max-w-lg">{user.bio}</p>
                  )}
                </div>
                <Button variant="outline" className="gap-2 shrink-0">
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Info */}
            <div className="space-y-6">
              {/* Experience */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-accent" />
                    Experience Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="accent" className="text-sm">
                    {experienceLabels[user.experience]}
                  </Badge>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Code className="h-4 w-4 text-accent" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                      <Badge key={skill} variant="skill">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Interests */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Heart className="h-4 w-4 text-accent" />
                    Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest) => (
                      <Badge key={interest} variant="outline">{interest}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Activity */}
            <div className="md:col-span-2 space-y-6">
              {/* Created Opportunities */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      Created Opportunities
                    </CardTitle>
                    <Link to="/create">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Plus className="h-4 w-4" />
                        Create New
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {createdOpportunities.length > 0 ? (
                    <div className="space-y-3">
                      {createdOpportunities.map((opp) => (
                        <Link key={opp.id} to={`/opportunity/${opp.id}`}>
                          <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                            <div>
                              <p className="font-medium text-foreground">{opp.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {opp.currentMembers}/{opp.teamSize} members • {opp.domain}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="mb-4">You haven't created any opportunities yet.</p>
                      <Link to="/create">
                        <Button variant="accent">Create Your First Team</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Joined Teams */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    Joined Teams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {joinedOpportunities.length > 0 ? (
                    <div className="space-y-3">
                      {joinedOpportunities.map((opp) => (
                        <Link key={opp.id} to={`/opportunity/${opp.id}`}>
                          <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                            <div>
                              <p className="font-medium text-foreground">{opp.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Led by {opp.createdBy.name} • {opp.domain}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="mb-4">You haven't joined any teams yet.</p>
                      <Link to="/opportunities">
                        <Button variant="accent">Browse Opportunities</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
