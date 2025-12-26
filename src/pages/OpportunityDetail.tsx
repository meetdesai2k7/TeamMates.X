import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { opportunities } from '@/data/opportunities';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, Calendar, Briefcase, ArrowLeft, CheckCircle2, XCircle, 
  Clock, Target, Sparkles, UserPlus, AlertTriangle 
} from 'lucide-react';

const experienceOrder = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 };
const experienceLabels = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced', expert: 'Expert' };

export default function OpportunityDetail() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const opportunity = opportunities.find(opp => opp.id === id);

  if (!opportunity) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Opportunity not found</h1>
            <p className="text-muted-foreground mb-4">The opportunity you're looking for doesn't exist.</p>
            <Link to="/opportunities">
              <Button>Browse Opportunities</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const checkEligibility = () => {
    if (!user) return { eligible: false, matchedSkills: [], missingSkills: opportunity.requiredSkills, experienceMatch: false };
    
    const userExpLevel = experienceOrder[user.experience];
    const requiredExpLevel = experienceOrder[opportunity.minExperience];
    const experienceMatch = userExpLevel >= requiredExpLevel;

    const matchedSkills = opportunity.requiredSkills.filter(skill => 
      user.skills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
    );
    const missingSkills = opportunity.requiredSkills.filter(skill => 
      !user.skills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
    );

    const skillsMatch = matchedSkills.length >= Math.ceil(opportunity.requiredSkills.length / 2);
    const eligible = experienceMatch && skillsMatch;

    return { eligible, matchedSkills, missingSkills, experienceMatch };
  };

  const eligibility = checkEligibility();

  const handleApply = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Please log in',
        description: 'You need to be logged in to apply for opportunities.',
        variant: 'destructive',
      });
      return;
    }

    if (!eligibility.eligible) {
      toast({
        title: 'Not eligible',
        description: 'You don\'t meet the requirements for this opportunity.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Application submitted!',
      description: 'The team leader will review your application.',
    });
  };

  const typeColors = {
    hackathon: 'accent',
    startup: 'warning',
    research: 'success',
    project: 'secondary',
  } as const;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/opportunities" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Opportunities
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant={typeColors[opportunity.type] as any} className="capitalize">
                    {opportunity.type}
                  </Badge>
                  <Badge variant="outline">{opportunity.domain}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {opportunity.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>{opportunity.currentMembers}/{opportunity.teamSize} members</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" />
                    <span className="capitalize">{experienceLabels[opportunity.minExperience]}+</span>
                  </div>
                  {opportunity.deadline && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>Posted {new Date(opportunity.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About This Opportunity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {opportunity.description}
                  </p>
                </CardContent>
              </Card>

              {/* Required Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent" />
                    Required Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.requiredSkills.map((skill) => {
                      const matched = isAuthenticated && eligibility.matchedSkills.includes(skill);
                      return (
                        <Badge
                          key={skill}
                          variant={matched ? 'eligible' : isAuthenticated ? 'ineligible' : 'skill'}
                          className="text-sm py-1 px-3"
                        >
                          {matched && <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />}
                          {isAuthenticated && !matched && <XCircle className="h-3.5 w-3.5 mr-1.5" />}
                          {skill}
                        </Badge>
                      );
                    })}
                  </div>
                  {isAuthenticated && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4 inline mr-1.5 text-accent" />
                      You match {eligibility.matchedSkills.length} of {opportunity.requiredSkills.length} required skills
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Team Leader */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Team Leader</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent font-semibold text-lg">
                        {opportunity.createdBy.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{opportunity.createdBy.name}</p>
                      <p className="text-sm text-muted-foreground">Opportunity Creator</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Eligibility Card */}
              <Card className={`border-2 ${isAuthenticated ? (eligibility.eligible ? 'border-success/50 bg-success/5' : 'border-destructive/50 bg-destructive/5') : 'border-border'}`}>
                <CardContent className="p-6">
                  {isAuthenticated ? (
                    <>
                      <div className={`flex items-center gap-3 mb-4 ${eligibility.eligible ? 'text-success' : 'text-destructive'}`}>
                        {eligibility.eligible ? (
                          <CheckCircle2 className="h-8 w-8" />
                        ) : (
                          <AlertTriangle className="h-8 w-8" />
                        )}
                        <div>
                          <p className="font-semibold text-lg">
                            {eligibility.eligible ? 'You\'re Eligible!' : 'Not Eligible'}
                          </p>
                          <p className="text-sm opacity-80">
                            {eligibility.eligible 
                              ? 'You meet the requirements' 
                              : 'Requirements not met'}
                          </p>
                        </div>
                      </div>

                      {/* Experience Check */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          {eligibility.experienceMatch ? (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          ) : (
                            <XCircle className="h-4 w-4 text-destructive" />
                          )}
                          <span className={eligibility.experienceMatch ? 'text-foreground' : 'text-muted-foreground'}>
                            Experience: {experienceLabels[user?.experience || 'beginner']} 
                            {!eligibility.experienceMatch && ` (needs ${experienceLabels[opportunity.minExperience]}+)`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          {eligibility.matchedSkills.length >= Math.ceil(opportunity.requiredSkills.length / 2) ? (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          ) : (
                            <XCircle className="h-4 w-4 text-destructive" />
                          )}
                          <span>
                            Skills: {eligibility.matchedSkills.length}/{opportunity.requiredSkills.length} matched
                          </span>
                        </div>
                      </div>

                      <Button 
                        className="w-full gap-2" 
                        size="lg"
                        variant={eligibility.eligible ? 'accent' : 'secondary'}
                        disabled={!eligibility.eligible}
                        onClick={handleApply}
                      >
                        <UserPlus className="h-4 w-4" />
                        {eligibility.eligible ? 'Apply to Join' : 'Not Eligible to Apply'}
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-muted-foreground mb-4">
                        Log in to see if you're eligible for this opportunity.
                      </p>
                      <Link to="/login">
                        <Button className="w-full" size="lg">Log in to Apply</Button>
                      </Link>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Team Size</span>
                    <span className="font-medium text-foreground">{opportunity.teamSize} members</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Joined</span>
                    <span className="font-medium text-foreground">{opportunity.currentMembers} members</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Spots Left</span>
                    <span className="font-medium text-accent">{opportunity.teamSize - opportunity.currentMembers}</span>
                  </div>
                  {opportunity.deadline && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Deadline</span>
                      <span className="font-medium text-foreground">
                        {new Date(opportunity.deadline).toLocaleDateString()}
                      </span>
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
