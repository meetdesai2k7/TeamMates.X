import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Users, Search, CheckCircle, ArrowRight, Sparkles, 
  Target, Zap, Shield, Code, Rocket, GraduationCap, Microscope 
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/90 text-sm mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span>Where talent meets opportunity</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 leading-tight animate-slide-up">
              Find the Right Team.
              <br />
              <span className="text-gradient">Build the Right Future.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Connect with skilled teammates for hackathons, startups, and research projects. 
              Join teams based on your skills and experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/opportunities">
                <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2">
                  <Search className="h-5 w-5" />
                  Explore Opportunities
                </Button>
              </Link>
              <Link to="/create">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto gap-2">
                  <Users className="h-5 w-5" />
                  Create Opportunity
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Problem Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">The Problem</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
              Finding the Right Team is Hard
            </h2>
            <p className="text-lg text-muted-foreground">
              Whether you're building a startup or joining a hackathon, finding teammates with the right skills and experience is challenging.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">For Team Leaders</h3>
              <p className="text-muted-foreground">
                Struggling to find teammates with specific skills? Tired of sifting through unqualified applications? 
                Need people who actually match your requirements?
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-warning" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">For Individuals</h3>
              <p className="text-muted-foreground">
                Have skills but can't find the right opportunities? Unsure if you're qualified to apply? 
                Want to join teams that value what you bring?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">The Solution</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
              Smart Team Formation
            </h2>
            <p className="text-lg text-muted-foreground">
              TeamMates.X uses eligibility-based matching to connect the right people with the right opportunities.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Eligibility-Based',
                description: 'Only see opportunities you qualify for. Leaders only receive applications from eligible candidates.',
              },
              {
                icon: Zap,
                title: 'Skill Matching',
                description: 'Automatically compare your skills with requirements. Know instantly if you\'re a good fit.',
              },
              {
                icon: CheckCircle,
                title: 'Verified Teams',
                description: 'Build teams with confidence. Every member meets the requirements you set.',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border shadow-soft card-hover">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
              Three Simple Steps
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Create Your Profile', desc: 'Add your skills, experience level, and interests.' },
              { step: '02', title: 'Browse Opportunities', desc: 'Find teams that match your skills and goals.' },
              { step: '03', title: 'Join or Create', desc: 'Apply to eligible opportunities or create your own team.' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-7xl font-extrabold text-accent/10 absolute -top-4 -left-2">{item.step}</div>
                <div className="pt-12 pl-4">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Use Cases</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
              Perfect For Every Builder
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: 'Hackathons', desc: 'Build winning teams for competitions' },
              { icon: Rocket, title: 'Startups', desc: 'Find co-founders and early team members' },
              { icon: Microscope, title: 'Research', desc: 'Collaborate on academic projects' },
              { icon: GraduationCap, title: 'Learning', desc: 'Join study groups and build projects' },
            ].map((useCase, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border shadow-soft text-center card-hover">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                  <useCase.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-3xl p-12 md:p-16 text-center relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Find Your Dream Team?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                Join hundreds of students, developers, and entrepreneurs building amazing projects together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2">
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/opportunities">
                  <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                    Browse Opportunities
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
