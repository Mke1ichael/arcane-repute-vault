import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Vote, Clock, Users, CheckCircle } from 'lucide-react';

const mockProposals = [
  {
    id: 1,
    title: 'Proposal #42: Increase Liquidity Mining Rewards',
    description: 'Increase liquidity mining APY from 12% to 18% to attract more liquidity providers',
    status: 'active',
    timeLeft: '2 days 14 hours',
    votesFor: 8247,
    votesAgainst: 1523,
    requiredReputation: 500,
  },
  {
    id: 2,
    title: 'Proposal #41: Add Cross-Chain Bridge Integration',
    description: 'Integrate cross-chain bridges for Arbitrum and Polygon networks to improve asset liquidity',
    status: 'passed',
    timeLeft: 'Ended',
    votesFor: 12456,
    votesAgainst: 3211,
    requiredReputation: 800,
  },
  {
    id: 3,
    title: 'Proposal #40: Community Governance Token Distribution',
    description: 'Distribute 100,000 governance tokens to active contributors as incentives',
    status: 'pending',
    timeLeft: 'Starts in 3 days',
    votesFor: 0,
    votesAgainst: 0,
    requiredReputation: 300,
  },
];

const Governance = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-fantasy text-magical mb-4">DAO Governance Center</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Participate in DAO governance using your encrypted reputation. Voting power is calculated based on your contribution history and reputation score.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <Vote className="w-8 h-8 text-magical mx-auto mb-2" />
              <div className="text-2xl font-bold text-magical">23</div>
              <div className="text-sm text-muted-foreground">Active Proposals</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-magical mx-auto mb-2" />
              <div className="text-2xl font-bold text-magical">1,247</div>
              <div className="text-sm text-muted-foreground">Participating Users</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-magical mx-auto mb-2" />
              <div className="text-2xl font-bold text-magical">89%</div>
              <div className="text-sm text-muted-foreground">Pass Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Proposals */}
        <div className="space-y-6">
          {mockProposals.map((proposal) => (
            <Card key={proposal.id} className="bg-card/30 backdrop-blur-sm border-border/50 hover:shadow-magical transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-serif text-lg text-magical mb-2">
                      {proposal.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {proposal.description}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={
                      proposal.status === 'active' ? 'default' : 
                      proposal.status === 'passed' ? 'secondary' : 
                      'outline'
                    }
                    className="ml-4"
                  >
                    {proposal.status === 'active' ? 'Voting' : 
                     proposal.status === 'passed' ? 'Passed' : 
                     'Pending'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {proposal.timeLeft}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Min Reputation Required: {proposal.requiredReputation}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      For: {proposal.votesFor.toLocaleString()} | Against: {proposal.votesAgainst.toLocaleString()}
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-magical h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                {proposal.status === 'active' && (
                  <div className="flex gap-3">
                    <Button variant="default" className="bg-magical hover:bg-magical/90">
                      Support Proposal
                    </Button>
                    <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                      Oppose Proposal
                    </Button>
                    <Button variant="ghost" className="text-muted-foreground">
                      View Details
                    </Button>
                  </div>
                )}
                
                {proposal.status === 'pending' && (
                  <Button variant="outline" disabled>
                    Waiting for Voting to Start
                  </Button>
                )}
                
                {proposal.status === 'passed' && (
                  <Button variant="secondary" className="bg-secondary/50">
                    View Execution Status
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Governance;