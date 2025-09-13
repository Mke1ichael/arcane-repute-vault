import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Vote, Trophy, User, Wallet } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Reputation Dashboard' },
    { path: '/governance', icon: Vote, label: 'DAO Governance' },
    { path: '/contribute', icon: Trophy, label: 'Contribute & Earn' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-magical-gradient rounded-full animate-glow" />
            <span className="font-fantasy text-xl text-magical">FHE DAO</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`${
                      isActive 
                        ? "bg-magical text-primary-foreground" 
                        : "text-muted-foreground hover:text-magical"
                    } font-serif`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Wallet Connect */}
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;