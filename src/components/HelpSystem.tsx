import { useState } from 'react';
import { HelpCircle, Search, X, BookOpen, Video, MessageCircle, Lightbulb, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const HelpSystem = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20'
    },
    {
      id: 'navigation',
      title: 'Navigation',
      icon: <Search className="w-5 h-5" />,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20'
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20'
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20'
    }
  ];

  const helpArticles = [
    {
      id: 1,
      title: 'How to navigate the dashboard',
      category: 'navigation',
      content: 'Learn how to use the sidebar, search functionality, and quick actions.',
      difficulty: 'Beginner',
      readTime: '2 min'
    },
    {
      id: 2,
      title: 'Creating and managing projects',
      category: 'getting-started',
      content: 'Step-by-step guide to create your first project and manage it effectively.',
      difficulty: 'Beginner',
      readTime: '5 min'
    },
    {
      id: 3,
      title: 'Team collaboration features',
      category: 'collaboration',
      content: 'Discover how to work with your team using real-time features.',
      difficulty: 'Intermediate',
      readTime: '3 min'
    },
    {
      id: 4,
      title: 'Understanding your role and permissions',
      category: 'getting-started',
      content: `As a ${user?.role?.replace('_', ' ').toLowerCase() || 'user'}, learn what you can access and do.`,
      difficulty: 'Beginner',
      readTime: '2 min'
    },
    {
      id: 5,
      title: 'Real-time notifications setup',
      category: 'collaboration',
      content: 'Configure notifications to stay updated with project changes.',
      difficulty: 'Beginner',
      readTime: '3 min'
    },
    {
      id: 6,
      title: 'Troubleshooting login issues',
      category: 'troubleshooting',
      content: 'Common login problems and how to resolve them.',
      difficulty: 'Beginner',
      readTime: '2 min'
    },
    {
      id: 7,
      title: 'Mobile app usage',
      category: 'navigation',
      content: 'How to use the dashboard on mobile devices.',
      difficulty: 'Beginner',
      readTime: '3 min'
    },
    {
      id: 8,
      title: 'Advanced analytics guide',
      category: 'getting-started',
      content: 'Make the most of the enhanced dashboard and analytics features.',
      difficulty: 'Advanced',
      readTime: '8 min'
    }
  ];

  const quickActions = [
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: <MessageCircle className="w-5 h-5" />,
      action: () => alert('Opening support chat...')
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides',
      icon: <Video className="w-5 h-5" />,
      action: () => alert('Opening video tutorials...')
    },
    {
      title: 'Feature Request',
      description: 'Suggest new features',
      icon: <Lightbulb className="w-5 h-5" />,
      action: () => alert('Opening feature request form...')
    }
  ];

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-950/20 dark:text-gray-400';
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 w-12 h-12 lg:w-14 lg:h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40 group"
      >
        <HelpCircle className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col touch-pan-y">
        <div className="flex flex-col lg:flex-row flex-1 min-h-0">
          {/* Sidebar */}
          <div className="w-full lg:w-80 bg-muted/30 border-r border-border p-4 lg:p-6 overflow-y-auto flex-shrink-0 max-h-[50vh] lg:max-h-none scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 touch-pan-y overscroll-contain">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h2 className="text-lg lg:text-xl font-bold text-foreground">Help Center</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Search */}
            <div className="mb-4 lg:mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary text-sm lg:text-base"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-4 lg:mb-6">
              <h3 className="font-semibold text-foreground mb-3 text-sm lg:text-base">Categories</h3>
              <div className="space-y-1 lg:space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left p-2 lg:p-3 rounded-lg transition-colors text-sm lg:text-base ${
                    selectedCategory === 'all' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted'
                  }`}
                >
                  All Articles ({helpArticles.length})
                </button>
                {helpCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-2 lg:p-3 rounded-lg transition-colors flex items-center gap-2 lg:gap-3 text-sm lg:text-base ${
                      selectedCategory === category.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span className={category.color}>{category.icon}</span>
                    {category.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 text-sm lg:text-base">Quick Actions</h3>
              <div className="space-y-1 lg:space-y-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="w-full text-left p-2 lg:p-3 rounded-lg hover:bg-muted transition-colors flex items-center gap-2 lg:gap-3"
                  >
                    <span className="text-muted-foreground">{action.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-6 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 touch-pan-y overscroll-contain">
            <div className="mb-4 lg:mb-6">
              <h3 className="text-base lg:text-lg font-semibold text-foreground mb-2">
                {selectedCategory === 'all' ? 'All Articles' : helpCategories.find(c => c.id === selectedCategory)?.title}
              </h3>
              <p className="text-muted-foreground text-sm lg:text-base">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="space-y-3 lg:space-y-4">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-3 lg:p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                    <h4 className="font-medium text-foreground text-sm lg:text-base">{article.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                        {article.difficulty}
                      </span>
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    </div>
                  </div>
                  <p className="text-xs lg:text-sm text-muted-foreground mb-3">{article.content}</p>
                  <div className="flex items-center gap-2">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      Read Article
                    </button>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-8 lg:py-12">
                <Search className="w-10 h-10 lg:w-12 lg:h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-base lg:text-lg font-semibold text-foreground mb-2">No articles found</h3>
                <p className="text-muted-foreground text-sm lg:text-base">
                  Try adjusting your search terms or browse different categories.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
