import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Code, Users, Zap, X, Send, Phone, MapPin } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      // Redirect will be handled by the auth context
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Thank you for your interest! We'll contact you within 24 hours.");
      setShowContactModal(false);
      setContactForm({ name: "", email: "", company: "", message: "" });
      setIsSubmittingContact(false);
    }, 1500);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-ids-cyan/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-ids-cyan/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Enhanced Logo and Header */}
        <div className="text-center mb-8">
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-primary/10 rounded-3xl flex items-center justify-center shadow-2xl border border-primary/20">
              <img 
                src="/ids-logo.png" 
                alt="INVENTOR Design Studio Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-ids-cyan/30 to-ids-cyan/10 rounded-full flex items-center justify-center border border-ids-cyan/20">
              <Zap className="w-4 h-4 text-ids-cyan" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-foreground via-primary to-ids-cyan bg-clip-text text-transparent">
            INVENTOR Design Studio
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-4">Software Development House</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-500 font-medium">All systems operational</span>
          </div>
        </div>

        {/* Enhanced Login Form */}
        <div className="relative overflow-hidden bg-gradient-to-br from-card/95 via-card/80 to-muted/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-border/30 hover:border-primary/20 transition-all duration-300 hover:scale-[1.01]">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          
          <div className="relative">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Welcome Back!</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">Ready to get back to work? Let's sign you in</p>
                </div>
              </div>
            </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Enhanced Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-3">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-input/50 to-input/30 border border-border/50 rounded-2xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-input transition-all duration-300 hover:border-primary/30"
                  placeholder="developer@inventerdesign.com"
                  required
                />
              </div>
            </div>

            {/* Enhanced Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-3">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-14 py-4 bg-gradient-to-r from-input/50 to-input/30 border border-border/50 rounded-2xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-input transition-all duration-300 hover:border-primary/30"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-200 p-1 rounded-lg hover:bg-primary/10"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            {/* Enhanced Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 px-6 rounded-2xl font-semibold hover:from-primary/90 hover:to-primary/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Let's Go</span>
                </>
              )}
            </button>
          </form>

          {/* Enhanced Demo Credentials */}
          <div className="mt-8 relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-xl flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                Quick Demo Access
              </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setEmail('admin@inventerdesign.com');
                  setPassword('admin123');
                }}
                className="group relative overflow-hidden p-4 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <span className="text-lg">👑</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">Administrator</div>
                    <div className="text-xs text-muted-foreground">Full system access</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  setEmail('manager@inventerdesign.com');
                  setPassword('manager123');
                }}
                className="group relative overflow-hidden p-4 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <span className="text-lg">📊</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">Project Manager</div>
                    <div className="text-xs text-muted-foreground">Team & project oversight</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  setEmail('engineer@inventerdesign.com');
                  setPassword('engineer123');
                }}
                className="group relative overflow-hidden p-4 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <span className="text-lg">⚙️</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">Engineer</div>
                    <div className="text-xs text-muted-foreground">Technical access</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  setEmail('client@inventerdesign.com');
                  setPassword('client123');
                }}
                className="group relative overflow-hidden p-4 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <span className="text-lg">👤</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">Client</div>
                    <div className="text-xs text-muted-foreground">Project visibility</div>
                  </div>
                </div>
              </button>
            </div>
            <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 text-center">
              Click any role above to auto-fill credentials
            </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              New to the team?{" "}
              <button 
                onClick={() => setShowContactModal(true)}
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                Get in touch with us
              </button>
            </p>
          </div>
        </div>

          {/* Features */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-card border border-border rounded-lg">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="text-sm font-medium text-foreground">Team Management</h3>
            <p className="text-xs text-muted-foreground">Manage your development team</p>
          </div>
          <div className="text-center p-4 bg-card border border-border rounded-lg">
            <Code className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="text-sm font-medium text-foreground">Code Repository</h3>
            <p className="text-xs text-muted-foreground">Track and manage code</p>
          </div>
          <div className="text-center p-4 bg-card border border-border rounded-lg">
            <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="text-sm font-medium text-foreground">Live Analytics</h3>
            <p className="text-xs text-muted-foreground">Real-time project insights</p>
          </div>
        </div>
      </div>
      </div>

      {/* Contact Admin Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Contact Admin</h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>admin@inventerdesign.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Software Development House</span>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={contactForm.company}
                  onChange={handleContactChange}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  placeholder="Tell us about your project requirements..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingContact}
                className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmittingContact ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Request
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                We'll review your request and create an account for you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
