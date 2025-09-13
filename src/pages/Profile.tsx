import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield, TrendingUp, Award, Clock, Eye, EyeOff } from 'lucide-react';
import avatarWizard from '@/assets/avatar-wizard.jpg';

const reputationHistory = [
  { month: 'Jan', reputation: 2340 },
  { month: 'Feb', reputation: 3120 },
  { month: 'Mar', reputation: 4580 },
  { month: 'Apr', reputation: 6230 },
  { month: 'May', reputation: 7891 },
  { month: 'Jun', reputation: 8945 },
];

const achievements = [
  { title: 'Code Master', description: 'Submitted 100 code contributions', icon: '💻', earned: true },
  { title: 'Documentation Expert', description: 'Wrote 50 technical documents', icon: '📚', earned: true },
  { title: 'Community Leader', description: 'Helped 500 new users', icon: '👥', earned: false },
  { title: 'Liquidity King', description: 'Provided 1M+ liquidity', icon: '💰', earned: true },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24 border-2 border-magical animate-glow">
                  <AvatarImage src={avatarWizard} alt="Profile" />
                  <AvatarFallback>MW</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-fantasy text-magical">Moonwhisper</h1>
                    <Badge variant="secondary" className="bg-mythril/20 text-mythril border-mythril/50">
                      Epic Rank
                    </Badge>
                    <Shield className="w-6 h-6 text-magical" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div>
                      <div className="text-2xl font-bold text-magical mb-1">
                        <span className="inline-flex items-center">
                          <EyeOff className="w-5 h-5 mr-2" />
                          [Encrypted]
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">Current Reputation</div>
                      <div className="text-xs text-magical mt-1">FHE 256-bit Encryption</div>
                    </div>
                    
                    <div>
                      <div className="text-2xl font-bold text-magical mb-1">#24</div>
                      <div className="text-sm text-muted-foreground">Global Ranking</div>
                      <div className="flex items-center text-xs text-green-400 mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +3 this week
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-2xl font-bold text-magical mb-1">147</div>
                      <div className="text-sm text-muted-foreground">Contributions</div>
                      <div className="text-xs text-muted-foreground mt-1">6 months total</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Button variant="outline" className="mb-2">
                    <Eye className="w-4 h-4 mr-2" />
                    View Public Profile
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    Joined: January 2024
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Reputation Trend */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="font-serif text-magical">Reputation Trend</CardTitle>
                <CardDescription>Reputation changes over the past 6 months (encrypted display)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reputationHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground w-12">{item.month}</div>
                      <div className="flex-1 mx-4">
                        <Progress 
                          value={Math.min((item.reputation / 10000) * 100, 100)} 
                          className="h-2"
                        />
                      </div>
                      <div className="text-sm font-mono text-magical">
                        [***{item.reputation.toString().slice(-3)}]
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-card/30 rounded-lg border border-border/50">
                  <div className="flex items-center text-sm text-magical mb-2">
                    <Shield className="w-4 h-4 mr-2" />
                    FHE Privacy Protection
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your specific reputation scores are protected using homomorphic encryption technology. Only trends and relative rankings are visible.
                    This ensures your privacy while maintaining system transparency.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="font-serif text-magical">Recent Activity</CardTitle>
                <CardDescription>Your recent contributions and reputation gains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Smart Contract Code Review', reward: '+150', time: '2 hours ago' },
                    { action: 'New User Guidance Session', reward: '+75', time: '1 day ago' },
                    { action: 'FHE Documentation Optimization', reward: '+200', time: '3 days ago' },
                    { action: 'Liquidity Pool Maintenance', reward: '+120', time: '5 days ago' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-card/30 rounded-lg border border-border/50">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="font-serif text-sm">{activity.action}</div>
                          <div className="text-xs text-muted-foreground">{activity.time}</div>
                        </div>
                      </div>
                      <div className="text-magical font-bold">{activity.reward}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Level Progress */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="font-serif text-magical">Level Progress</CardTitle>
                <CardDescription>Reputation needed to reach the next level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-fantasy text-mythril mb-2">Epic</div>
                  <Progress value={65} className="mb-2" />
                  <div className="text-sm text-muted-foreground">
                    65% to Legendary
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Level</span>
                    <span className="text-mythril">Epic (5000+)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Level</span>
                    <span className="text-magical">Legendary (10000+)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reputation Needed</span>
                    <span className="text-magical">[Encrypted]</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="font-serif text-magical">Achievement Badges</CardTitle>
                <CardDescription>Special recognition and honors you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                        achievement.earned 
                          ? 'bg-card/50 border-magical/50 shadow-glow' 
                          : 'bg-card/20 border-border/30 opacity-50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <div className="text-xs font-serif text-magical mb-1">
                        {achievement.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.description}
                      </div>
                      {achievement.earned && (
                        <Badge variant="secondary" className="mt-2 bg-magical/20 text-magical text-xs">
                          Earned
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;