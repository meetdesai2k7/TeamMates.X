import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { opportunities, domains, experienceLevels } from '@/data/opportunities';
import { Search, Filter, X, Sparkles } from 'lucide-react';

export default function Opportunities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.requiredSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDomain = selectedDomain === 'All' || opp.domain === selectedDomain;
      const matchesExperience = selectedExperience === 'all' || opp.minExperience === selectedExperience;
      const matchesType = selectedType === 'all' || opp.type === selectedType;

      return matchesSearch && matchesDomain && matchesExperience && matchesType;
    });
  }, [searchQuery, selectedDomain, selectedExperience, selectedType]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDomain('All');
    setSelectedExperience('all');
    setSelectedType('all');
  };

  const hasActiveFilters = searchQuery || selectedDomain !== 'All' || selectedExperience !== 'all' || selectedType !== 'all';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-card py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-accent" />
                <span className="text-accent font-medium text-sm">Discover Opportunities</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Find Your Next Team
              </h1>
              <p className="text-lg text-muted-foreground">
                Browse open opportunities and join teams that match your skills and interests.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border bg-card/50 py-4 sticky top-16 z-40 backdrop-blur-lg">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, skills, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Toggle (Mobile) */}
              <Button
                variant="outline"
                className="lg:hidden gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && <Badge variant="accent" className="ml-1 h-5 w-5 p-0 justify-center">!</Badge>}
              </Button>

              {/* Desktop Filters */}
              <div className={`flex flex-col sm:flex-row gap-3 ${showFilters ? 'flex' : 'hidden lg:flex'}`}>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => (
                      <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-36">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredOpportunities.length}</span> opportunities
              </p>
            </div>

            {filteredOpportunities.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpportunities.map((opportunity, i) => (
                  <div key={opportunity.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                    <OpportunityCard opportunity={opportunity} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No opportunities found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
