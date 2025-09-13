import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code, FileText, Users, Coins, Gift, Plus } from 'lucide-react';
import ContractInteraction from '@/components/ContractInteraction';

const contributionTypes = [
  {
    icon: Code,
    title: 'Code Contribution',
    description: 'Submit code, fix bugs, optimize performance',
    baseReward: '50-500',
    multiplier: '2x',
    color: 'text-blue-400',
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Write technical docs, user guides, tutorials',
    baseReward: '20-200',
    multiplier: '1.5x',
    color: 'text-green-400',
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Help new users, answer questions, community management',
    baseReward: '10-100',
    multiplier: '1.2x',
    color: 'text-purple-400',
  },
  {
    icon: Coins,
    title: 'Liquidity Provision',
    description: 'Provide liquidity, stake tokens, market making',
    baseReward: '30-300',
    multiplier: '1.8x',
    color: 'text-yellow-400',
  },
];

const recentContributions = [
  {
    id: 1,
    type: 'Code Contribution',
    title: 'Optimize smart contract gas consumption',
    contributor: 'You',
    reward: '+285',
    status: 'Confirmed',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'Documentation',
    title: 'FHE technical documentation',
    contributor: 'Archmage Solaris',
    reward: '+150',
    status: 'Under Review',
    time: '5 hours ago',
  },
  {
    id: 3,
    type: 'Community Support',
    title: 'New user guidance session',
    contributor: 'Sir Valenheart',
    reward: '+75',
    status: 'Confirmed',
    time: '1 day ago',
  },
];

const Contribute = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-fantasy text-magical mb-4">Contribute & Earn Reputation</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contribute to the DAO in various ways and earn encrypted reputation rewards. All contributions are protected with FHE technology for privacy.
          </p>
        </div>

        {/* Contract Interaction */}
        <div className="mb-8">
          <ContractInteraction />
        </div>

        {/* Current Progress */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="font-serif text-magical">Monthly Progress</CardTitle>
            <CardDescription>Your contribution statistics and reputation gains this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-magical mb-1">12</div>
                <div className="text-sm text-muted-foreground">Contributions</div>
                <Progress value={75} className="mt-2" />
              </div>
              <div>
                <div className="text-2xl font-bold text-magical mb-1">+847</div>
                <div className="text-sm text-muted-foreground">Reputation Earned</div>
                <Progress value={60} className="mt-2" />
              </div>
              <div>
                <div className="text-2xl font-bold text-magical mb-1">Epic</div>
                <div className="text-sm text-muted-foreground">Current Rank</div>
                <Progress value={40} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contribution Types */}
        <div className="mb-8">
          <h2 className="text-2xl font-serif text-magical mb-6">Contribution Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contributionTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="bg-card/30 backdrop-blur-sm border-border/50 hover:shadow-magical transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-background/50 ${type.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="font-serif">{type.title}</CardTitle>
                          <CardDescription>{type.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="group-hover:border-magical transition-colors">
                        {type.multiplier}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Base Reward: {type.baseReward} Reputation
                      </div>
                      <Button size="sm" variant="outline" className="group-hover:border-magical transition-colors">
                        <Plus className="w-4 h-4 mr-1" />
                        Submit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-serif text-magical mb-6">Recent Contributions</h2>
          <div className="space-y-4">
            {recentContributions.map((contribution) => (
              <Card key={contribution.id} className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Gift className="w-8 h-8 text-magical" />
                      <div>
                        <div className="font-serif text-magical">{contribution.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {contribution.type} • {contribution.contributor} • {contribution.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={contribution.status === 'Confirmed' ? 'default' : 'secondary'}
                        className={contribution.status === 'Confirmed' ? 'bg-magical' : ''}
                      >
                        {contribution.status}
                      </Badge>
                      <div className="text-lg font-bold text-magical">
                        {contribution.reward}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contribute;