import { Bell, ChevronDown, LogOut, CheckCircle, AlertTriangle, Info, Clock, X, Menu, User } from "lucide-react";
import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Onboarding } from "./Onboarding";
import { HelpSystem } from "./HelpSystem";
import { MobileOptimized } from "./MobileOptimized";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info' | 'pending';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, organization, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'success',
      title: 'Work Order Approved',
      message: 'Work Order #WO-001 has been approved successfully',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'Sand inventory is running low. Current stock: 15%',
      time: '15 min ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Document Uploaded',
      message: 'Project blueprint v2.3 has been uploaded to Documents',
      time: '1 hour ago',
      read: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notification-dropdown') && !target.closest('.notification-button')) {
        setShowNotifications(false);
      }
      if (!target.closest('.user-menu-dropdown') && !target.closest('.user-menu-button')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  const location = useLocation();
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Check if user needs onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    if (!hasCompletedOnboarding && user) {
      setShowOnboarding(true);
    }
  }, [user]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Modern Sidebar - Desktop & Mobile */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 bg-sidebar border-r border-sidebar-border flex flex-col
        transform transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-2xl lg:shadow-none
      `}>
        {/* Enhanced Logo Section */}
        <div className="relative overflow-hidden p-6 border-b border-sidebar-border bg-gradient-to-br from-sidebar-background via-sidebar-background to-primary/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
          
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-white to-white/90 rounded-3xl flex items-center justify-center shadow-2xl border border-border/20 p-2 group hover:scale-110 transition-transform duration-200">
                  <img 
                    src="/ids-logo.png" 
                    alt="INVENTOR Design Studio Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to text logo if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden flex items-center gap-1 text-black font-bold text-sm">
                    <div className="relative">
                      <span>i</span>
                      <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    </div>
                    <span>d</span>
                    <span className="text-gray-600">s</span>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-ids-cyan/30 to-ids-cyan/10 rounded-full flex items-center justify-center border border-ids-cyan/20">
                  <div className="w-2 h-2 bg-ids-cyan rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-sidebar-foreground bg-gradient-to-r from-sidebar-foreground via-primary to-ids-cyan bg-clip-text text-transparent">
                  INVENTOR Design Studio
                </h1>
                <p className="text-sm text-muted-foreground">Software Development House</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-500 font-medium">All systems operational</span>
                </div>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-sidebar-foreground" />
            </button>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
          {/* Dashboard Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Overview
            </h3>
            <div className="space-y-1">
              <NavItem icon="dashboard" label="Home" href="/" />
              <NavItem icon="dashboard" label="Analytics" href="/dashboard1" />
              <NavItem icon="dashboard" label="Enhanced Dashboard" href="/enhanced-dashboard" />
              <NavItem icon="chart" label="Live Graphs" href="/live-graphs" />
              <NavItem icon="query" label="Query Dashboard" href="/query-dashboard" />
            </div>
          </div>

          {/* Project Management Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Projects
            </h3>
            <div className="space-y-1">
              <NavItem icon="projects" label="All Projects" href="/projects" />
              <NavItem icon="site" label="Client Work" href="/sites" />
              <NavItem icon="work-order" label="Work Orders" href="/work-order" />
              <NavItem icon="approved-work" label="Completed Work" href="/approved-work-order" />
              <NavItem icon="planning" label="Planning" href="/planning" />
            </div>
          </div>

          {/* Team & Collaboration Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Team
            </h3>
            <div className="space-y-1">
              <NavItem icon="users" label="Our Team" href="/staff" />
              <NavItem icon="user-overview" label="Team Overview" href="/user-overview" />
              <NavItem icon="performance" label="How We're Doing" href="/users-performance" />
              <NavItem icon="user-management" label="User Management" href="/user-management" />
              <NavItem icon="user" label="My Profile" href="/user-profile" />
            </div>
          </div>

          {/* Reviews & Approvals Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Reviews & Approvals
            </h3>
            <div className="space-y-1">
              <NavItem icon="approvals" label="Review Process" href="/approvals-flow" />
              <NavItem icon="inspection" label="Inspection Requests" href="/inspection-requests" />
              <NavItem icon="ir-approvals" label="IR Approvals" href="/ir-approvals" />
              <NavItem icon="ipcs" label="IPCs" href="/ipcs" />
              <NavItem icon="ipc-approvals" label="IPC Approvals" href="/ipc-approvals" />
              <NavItem icon="pending" label="My Pending Actions" href="/my-pending-actions" />
            </div>
          </div>

          {/* Business Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Business
            </h3>
            <div className="space-y-1">
              <NavItem icon="bids" label="Bids" href="/bids" />
              <NavItem icon="proposal" label="Proposals" href="/bid-proposal" />
              <NavItem icon="proposal-reviews" label="Proposal Reviews" href="/bid-proposal-approvals" />
            </div>
          </div>

          {/* Resources Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Resources
            </h3>
            <div className="space-y-1">
              <NavItem icon="documents" label="Documents" href="/documents" />
              <NavItem icon="drawings" label="Drawings" href="/drawing-management" />
              <NavItem icon="materials" label="Materials" href="/materials-section" />
              <NavItem icon="assets" label="Assets" href="/assets-management" />
              <NavItem icon="inventory" label="Inventory" href="/inventory-dashboard" />
              <NavItem icon="items" label="Items" href="/items" />
            </div>
          </div>

          {/* Analytics Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Analytics
            </h3>
            <div className="space-y-1">
              <NavItem icon="live-data" label="Live Data" href="/live-graphs" />
              <NavItem icon="reports" label="Reports" href="/reports" />
              <NavItem icon="data-explorer" label="Data Explorer" href="/query-dashboard" />
            </div>
          </div>

          {/* Safety & Quality Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Safety & Quality
            </h3>
            <div className="space-y-1">
              <NavItem icon="hse" label="HSE Environment" href="/hse-environment" />
              <NavItem icon="lab-tests" label="Lab Tests" href="/lab-tests" />
            </div>
          </div>

          {/* Enterprise Features Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Enterprise
            </h3>
            <div className="space-y-1">
              <NavItem icon="building" label="Organizations" href="/organization-management" />
              <NavItem icon="users" label="Real-time Collaboration" href="/real-time-collaboration" />
              <NavItem icon="bell" label="Advanced Notifications" href="/advanced-notifications" />
            </div>
          </div>

          {/* Settings Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              System
            </h3>
            <div className="space-y-1">
              <NavItem icon="settings" label="Settings" href="/settings" />
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:ml-0 overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden lg:flex bg-background border-b border-border p-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-foreground">Dashboard</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Notifications Button */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-muted rounded-lg transition-colors notification-button"
              >
                <Bell className="w-5 h-5 text-foreground" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
            </div>
            
            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors user-menu-button"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-foreground">{user?.name || 'Demo User'}</div>
                  <div className="text-xs text-muted-foreground">{user?.email || 'demo@inventor.com'}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
              
              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-2xl z-50 user-menu-dropdown">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user?.name || 'Demo User'}</div>
                        <div className="text-sm text-muted-foreground">{user?.email || 'demo@inventor.com'}</div>
                        <div className="text-xs text-muted-foreground">{organization?.name || 'INVENTOR Design Studio'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <Link
                      to="/user-profile"
                      className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">My Profile</span>
                    </Link>
                    
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                      <span className="text-sm">Settings</span>
                    </Link>
                    
                    <div className="border-t border-border my-2"></div>
                    
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden bg-background border-b border-border p-4 flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <img 
              src="/ids-logo.png" 
              alt="Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-foreground">IDS</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-foreground" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <User className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Mobile User Menu Dropdown */}
        {showUserMenu && (
          <div className="lg:hidden absolute top-16 right-4 w-64 bg-card border border-border rounded-xl shadow-2xl z-50">
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{user?.name || 'Demo User'}</div>
                  <div className="text-sm text-muted-foreground">{user?.email || 'demo@inventor.com'}</div>
                  <div className="text-xs text-muted-foreground">{organization?.name || 'INVENTOR Design Studio'}</div>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              <Link
                to="/user-profile"
                className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">My Profile</span>
              </Link>
              
              <Link
                to="/settings"
                className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <span className="text-sm">Settings</span>
              </Link>
              
              <div className="border-t border-border my-2"></div>
              
              <button
                onClick={() => {
                  logout();
                  setShowUserMenu(false);
                }}
                className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors w-full text-left"
              >
                <LogOut className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div 
            data-notification-dropdown
            className="absolute top-16 right-4 w-80 bg-card border border-border rounded-xl shadow-2xl z-50 max-h-96 overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No notifications</p>
                  <p className="text-xs text-muted-foreground mt-1">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-primary/5' : ''
                      }`}
                      onClick={() => {
                        // Mark as read
                        setNotifications(prev => 
                          prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
                        );
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.type === 'success' ? 'bg-green-500/20 text-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' :
                          notification.type === 'info' ? 'bg-blue-500/20 text-blue-500' :
                          'bg-gray-500/20 text-gray-500'
                        }`}>
                          {notification.type === 'success' && <CheckCircle className="w-4 h-4" />}
                          {notification.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                          {notification.type === 'info' && <Info className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-foreground">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <div className="p-3 border-t border-border">
                <button
                  onClick={() => {
                    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                  }}
                  className="w-full text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Mobile Optimized Component */}
      <MobileOptimized />

      {/* Onboarding Modal */}
      {showOnboarding && (
        <Onboarding onComplete={() => setShowOnboarding(false)} />
      )}

      {/* Help System */}
      <HelpSystem />
    </div>
  );
};

// NavItem component for navigation
const NavItem = ({ icon, label, href }: { icon: string; label: string; href: string }) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  
  return (
    <Link
      to={href}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
        ${isActive 
          ? 'bg-primary/20 text-primary border border-primary/30 shadow-lg' 
          : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
        }
        active:scale-95
      `}
    >
      <NavIcon icon={icon} className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

// NavIcon component for rendering different icons
const NavIcon = ({ icon, className }: { icon: string; className: string }) => {
  const iconClass = className;
  
  switch (icon) {
    case "dashboard":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      );
    case "projects":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2z" />
          <path d="M8 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2H8V5z" />
        </svg>
      );
    case "site":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
      );
    case "work-order":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      );
    case "approved-work":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
          <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3" />
          <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3" />
        </svg>
      );
    case "planning":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "users":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "user-overview":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "performance":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 20V10" />
          <path d="M12 20V4" />
          <path d="M6 20v-6" />
        </svg>
      );
    case "user-management":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "user":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "chart":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "query":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      );
    case "approvals":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
        </svg>
      );
    case "inspection":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
        </svg>
      );
    case "ir-approvals":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
        </svg>
      );
    case "ipcs":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case "ipc-approvals":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
        </svg>
      );
    case "pending":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    case "bids":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case "proposal":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
        </svg>
      );
    case "proposal-reviews":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
        </svg>
      );
    case "documents":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
        </svg>
      );
    case "drawings":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h18v18H3z" />
          <path d="M9 9h6v6H9z" />
        </svg>
      );
    case "materials":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h18v18H3z" />
          <path d="M9 9h6v6H9z" />
        </svg>
      );
    case "assets":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h18v18H3z" />
          <path d="M9 9h6v6H9z" />
        </svg>
      );
    case "inventory":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h18v18H3z" />
          <path d="M9 9h6v6H9z" />
        </svg>
      );
    case "items":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h18v18H3z" />
          <path d="M9 9h6v6H9z" />
        </svg>
      );
    case "live-data":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "reports":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case "data-explorer":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      );
    case "hse":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case "lab-tests":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
        </svg>
      );
    case "building":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
      );
    case "bell":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case "settings":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    default:
      return null;
  }
};