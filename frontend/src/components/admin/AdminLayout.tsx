import { type ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Users,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  {
    name: 'Tableau de Bord',
    path: '/admin/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Perruques',
    path: '/admin/wigs',
    icon: Package
  },
  {
    name: 'Commandes',
    path: '/admin/orders',
    icon: ShoppingCart
  },
  {
    name: 'Clients',
    path: '/admin/customers',
    icon: Users
  },
  {
    name: 'Messages',
    path: '/admin/messages',
    icon: MessageSquare
  },
  {
    name: 'Statistiques',
    path: '/admin/analytics',
    icon: BarChart3
  },
  {
    name: 'Paramètres',
    path: '/admin/settings',
    icon: Settings
  }
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Desktop */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border/50 z-40 hidden lg:block">
        <div className="p-6">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-semibold">
              Admin <span className="text-gradient-gold">LuxeWig</span>
            </span>
          </Link>
        </div>

        <nav className="px-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path === '/admin/wigs' && location.pathname.startsWith('/admin/wigs'));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive 
                    ? 'bg-gold/10 text-gold-dark border border-gold/20' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Sidebar Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="absolute left-0 top-0 h-full w-64 bg-card border-r border-border/50"
          >
            <div className="p-6 flex items-center justify-between">
              <Link to="/admin/dashboard" className="flex items-center gap-2">
                <span className="font-serif text-xl font-semibold">
                  Admin <span className="text-gradient-gold">LuxeWig</span>
                </span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="px-4 space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                      isActive 
                        ? 'bg-gold/10 text-gold-dark border border-gold/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Déconnexion
              </Button>
            </div>
          </motion.aside>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-card border-b border-border/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Connecté en tant qu'administrateur
              </div>
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-sm font-medium text-gold-dark">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}