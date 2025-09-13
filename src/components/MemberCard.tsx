import { Shield, Star, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

interface MemberCardProps {
  name: string;
  avatar: string;
  reputation: number;
  rank: string;
  isEncrypted: boolean;
  className?: string;
  style?: CSSProperties;
}

const MemberCard = ({ name, avatar, reputation, rank, isEncrypted, className, style }: MemberCardProps) => {
  const getRankIcon = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'legendary':
        return <Crown className="w-5 h-5 text-secondary" />;
      case 'epic':
        return <Star className="w-5 h-5 text-accent" />;
      default:
        return <Shield className="w-5 h-5 text-primary" />;
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'legendary':
        return 'text-secondary';
      case 'epic':
        return 'text-accent';
      default:
        return 'text-primary';
    }
  };

  return (
    <div 
      className={cn(
        "relative group",
        "bg-card border border-border rounded-lg p-6",
        "shadow-magical hover:shadow-glow transition-all duration-300",
        "hover:scale-105 hover:border-primary/50",
        "animate-float",
        className
      )}
      style={style}
    >
      {/* Magical glow effect */}
      <div className="absolute inset-0 bg-glow-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />
      
      {/* Avatar */}
      <div className="relative mb-4">
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors duration-300">
          <img 
            src={avatar} 
            alt={`${name}'s avatar`} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Rank indicator */}
        <div className="absolute -top-1 -right-1 bg-card rounded-full p-2 border border-border">
          {getRankIcon(rank)}
        </div>
      </div>

      {/* Member Info */}
      <div className="text-center space-y-2">
        <h3 className="font-serif font-semibold text-lg text-card-foreground">
          {name}
        </h3>
        
        <div className={cn("text-sm font-medium", getRankColor(rank))}>
          {rank} Member
        </div>

        {/* Reputation Score */}
        <div className="bg-muted rounded-md p-3 relative overflow-hidden">
          {isEncrypted && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 animate-magical-pulse" />
          )}
          <div className="relative">
            <div className="text-xs text-muted-foreground mb-1">
              {isEncrypted ? '🔒 Encrypted Score' : 'Reputation Score'}
            </div>
            <div className="text-2xl font-bold text-magical">
              {isEncrypted ? '••••' : reputation}
            </div>
          </div>
        </div>

        {/* FHE Badge */}
        {isEncrypted && (
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
            <Shield className="w-3 h-3" />
            FHE Protected
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberCard;