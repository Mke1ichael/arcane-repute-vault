import scrollBanner from '@/assets/scroll-banner.jpg';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

const ScrollBanner = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Scroll Background */}
      <div 
        className="h-32 md:h-40 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${scrollBanner})` }}
      >
        {/* Magical overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
        
        {/* Glowing effects */}
        <div className="absolute inset-0 bg-glow-gradient opacity-30 animate-glow" />
        
        {/* Wallet Connect Button */}
        <div className="absolute top-4 right-4 z-10">
          <Button 
            variant="secondary" 
            className="bg-card/80 backdrop-blur-sm border-magical/50 hover:bg-card/90 hover:border-magical text-magical hover:text-magical font-serif"
          >
            <Wallet className="w-4 h-4 mr-2" />
            连接钱包
          </Button>
        </div>

        {/* Main title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-fantasy text-magical animate-magical-pulse text-center px-4">
            FHE Secured Reputation
          </h1>
        </div>
        
        {/* Decorative borders */}
        <div className="absolute top-2 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-60" />
        <div className="absolute bottom-2 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-60" />
      </div>
    </header>
  );
};

export default ScrollBanner;