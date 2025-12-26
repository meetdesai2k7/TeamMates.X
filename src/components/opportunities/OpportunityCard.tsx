import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Opportunity } from '@/data/opportunities';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Calendar, Briefcase, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const experienceOrder = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 };

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { user, isAuthenticated } = useAuth();

  const checkEligibility = () => {
    if (!user) return { eligible: false, matchedSkills: [], missingSkills: opportunity.requiredSkills };
    
    const userExpLevel = experienceOrder[user.experience];
    const requiredExpLevel = experienceOrder[opportunity.minExperience];
    
    if (userExpLevel < requiredExpLevel) {
      return { eligible: false, matchedSkills: [], missingSkills: opportunity.requiredSkills, reason: 'experience' };
    }

    const matchedSkills = opportunity.requiredSkills.filter(skill => 
      user.skills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
    );
    const missingSkills = opportunity.requiredSkills.filter(skill => 
      !user.skills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
    );

    const eligible = matchedSkills.length >= Math.ceil(opportunity.requiredSkills.length / 2);

    return { eligible, matchedSkills, missingSkills };
  };

  const eligibility = checkEligibility();

  const typeColors = {
    hackathon: 'accent',
    startup: 'warning',
    research: 'success',
    project: 'secondary',
  } as const;

  return (
    <Card className="card-hover group overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={typeColors[opportunity.type] as any} className="capitalize">
                {opportunity.type}
              </Badge>
              <Badge variant="outline">{opportunity.domain}</Badge>
            </div>
            <Link to={`/opportunity/${opportunity.id}`}>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                {opportunity.title}
              </h3>
            </Link>
          </div>
          {isAuthenticated && (
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
              eligibility.eligible ? 'eligibility-eligible' : 'eligibility-ineligible'
            }`}>
              {eligibility.eligible ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Eligible
                </>
              ) : (
                <>
                  <XCircle className="h-3.5 w-3.5" />
                  Not Eligible
                </>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {opportunity.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {opportunity.requiredSkills.slice(0, 4).map((skill) => (
            <Badge 
              key={skill} 
              variant={isAuthenticated && eligibility.matchedSkills.includes(skill) ? 'eligible' : 'skill'}
              className="text-xs"
            >
              {skill}
            </Badge>
          ))}
          {opportunity.requiredSkills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{opportunity.requiredSkills.length - 4} more
            </Badge>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            <span>{opportunity.currentMembers}/{opportunity.teamSize}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" />
            <span className="capitalize">{opportunity.minExperience}</span>
          </div>
          {opportunity.deadline && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{new Date(opportunity.deadline).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Action */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">
            by {opportunity.createdBy.name}
          </span>
          <Link to={`/opportunity/${opportunity.id}`}>
            <Button variant="ghost" size="sm" className="gap-1 group/btn">
              View Details
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
