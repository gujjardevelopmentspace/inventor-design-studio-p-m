import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Search, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUserInitials, formatUserRole } from '../utils/safeStringUtils';

export const MobileOptimized = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigation = useCallback((href: string) => {
    if (isNavigating) return; // Prevent multiple rapid navigations
    
    setIsNavigating(true);
    setIsMobileMenuOpen(false);
    
    // Use navigate instead of Link to prevent page skipping
    navigate(href);
    
    // Reset navigation state after a short delay
    setTimeout(() => {
      setIsNavigating(false);
    }, 300);
  }, [navigate, isNavigating]);


  if (!isMobile) return null;

  return (
    <>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50">
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-card border-r border-border">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <img 
                    src="/ids-logo.png" 
                    alt="Logo" 
                    className="w-10 h-10 object-contain"
                  />
                  <div>
                    <h1 className="font-bold text-foreground">INVENTOR Design Studio</h1>
                    <p className="text-xs text-muted-foreground">Software Development House</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* User Info */}
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {getUserInitials(user?.name)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{user?.name || 'User'}</div>
                    <div className="text-sm text-muted-foreground">{formatUserRole(user?.role)}</div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {mobileNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href)}
                      disabled={isNavigating}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors w-full text-left mobile-nav-fix ${
                        isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      } ${isNavigating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

    </>
  );
};
