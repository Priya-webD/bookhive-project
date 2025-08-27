import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart, Trophy, LogOut, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Home", icon: Home },
    { path: "/analytics", label: "Analytics", icon: BarChart },
    { path: "/rewards", label: "Rewards", icon: Trophy },
    { path: "/profile", label: "Profile", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b shadow-brand sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">BH</span>
            </div>
            <span className="text-xl font-bold text-primary">Bookhive</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button
                  variant={isActive(path) ? "hero" : "ghost"}
                  className="flex items-center space-x-2"
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/auth">
              <Button variant="outline" size="sm">
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t animate-slide-in">
            <div className="py-4 space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link key={path} to={path} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant={isActive(path) ? "hero" : "ghost"}
                    className="w-full justify-start space-x-2"
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </Button>
                </Link>
              ))}
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start space-x-2">
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;