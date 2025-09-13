import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Vote, Trophy, User, Wallet } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo from '@/assets/logo.svg';

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
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src={Logo} 
              alt="Arcane Repute Vault" 
              className="w-10 h-10 drop-shadow-lg"
            />
            <div className="flex flex-col">
              <span className="font-fantasy text-lg text-magical leading-tight">Arcane Repute</span>
              <span className="font-fantasy text-sm text-magical/70 leading-tight">Vault</span>
            </div>
          </Link>

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