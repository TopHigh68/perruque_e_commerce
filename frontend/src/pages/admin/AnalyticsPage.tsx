import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  DollarSign,
  Calendar,
  Eye,
  Heart,
  Package
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    growth: number;
  };
  orders: {
    current: number;
    previous: number;
    growth: number;
  };
  customers: {
    current: number;
    previous: number;
    growth: number;
  };
  avgOrderValue: {
    current: number;
    previous: number;
    growth: number;
  };
}

const mockAnalytics: AnalyticsData = {
  revenue: {
    current: 2450000,
    previous: 2100000,
    growth: 16.7
  },
  orders: {
    current: 45,
    previous: 38,
    growth: 18.4
  },
  customers: {
    current: 32,
    previous: 28,
    growth: 14.3
  },
  avgOrderValue: {
    current: 544444,
    previous: 552632,
    growth: -1.5
  }
};

const topProducts = [
  { name: 'Lisse Soyeux Noir', sales: 12, revenue: 3532200 },
  { name: 'Boucles Auburn Glamour', sales: 8, revenue: 2774960 },
  { name: 'Afro Naturel Queen', sales: 10, revenue: 3139900 },
  { name: 'Ondulations Blond Miel', sales: 6, revenue: 2356380 }
];

const recentActivity = [
  { type: 'order', message: 'Nouvelle commande de Marie Dubois', time: '2h' },
  { type: 'customer', message: 'Nouveau client inscrit: Sophie Martin', time: '4h' },
  { type: 'product', message: 'Stock faible: Bob Classique Noir (3 restants)', time: '6h' },
  { type: 'order', message: 'Commande livrée à Fatou Diallo', time: '1j' }
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} FCFA`;
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? TrendingUp : TrendingDown;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return ShoppingBag;
      case 'customer': return Users;
      case 'product': return Package;
      default: return Eye;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-serif text-3xl font-medium">Statistiques & Analytics</h1>
            <p className="text-muted-foreground">Analysez les performances de votre boutique</p>
          </div>
          <select
            className="px-4 py-2 border border-border rounded-lg bg-background"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">1 an</option>
          </select>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="luxury-card bg-card p-6 rounded-xl border border-border/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${getGrowthColor(mockAnalytics.revenue.growth)}`}>
                {React.createElement(getGrowthIcon(mockAnalytics.revenue.growth), { className: "h-4 w-4" })}
                {Math.abs(mockAnalytics.revenue.growth)}%
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Chiffre d'Affaires</p>
              <p className="text-2xl font-semibold">{formatCurrency(mockAnalytics.revenue.current)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                vs {formatCurrency(mockAnalytics.revenue.previous)} période précédente
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="luxury-card bg-card p-6 rounded-xl border border-border/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${getGrowthColor(mockAnalytics.orders.growth)}`}>
                {React.createElement(getGrowthIcon(mockAnalytics.orders.growth), { className: "h-4 w-4" })}
                {Math.abs(mockAnalytics.orders.growth)}%
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Commandes</p>
              <p className="text-2xl font-semibold">{mockAnalytics.orders.current}</p>
              <p className="text-xs text-muted-foreground mt-1">
                vs {mockAnalytics.orders.previous} période précédente
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="luxury-card bg-card p-6 rounded-xl border border-border/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${getGrowthColor(mockAnalytics.customers.growth)}`}>
                {React.createElement(getGrowthIcon(mockAnalytics.customers.growth), { className: "h-4 w-4" })}
                {Math.abs(mockAnalytics.customers.growth)}%
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nouveaux Clients</p>
              <p className="text-2xl font-semibold">{mockAnalytics.customers.current}</p>
              <p className="text-xs text-muted-foreground mt-1">
                vs {mockAnalytics.customers.previous} période précédente
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="luxury-card bg-card p-6 rounded-xl border border-border/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gold/20">
                <BarChart3 className="h-6 w-6 text-gold-dark" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${getGrowthColor(mockAnalytics.avgOrderValue.growth)}`}>
                {React.createElement(getGrowthIcon(mockAnalytics.avgOrderValue.growth), { className: "h-4 w-4" })}
                {Math.abs(mockAnalytics.avgOrderValue.growth)}%
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Panier Moyen</p>
              <p className="text-2xl font-semibold">{formatCurrency(mockAnalytics.avgOrderValue.current)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                vs {formatCurrency(mockAnalytics.avgOrderValue.previous)} période précédente
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Produits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="luxury-card bg-card p-6 rounded-xl border border-border/50"
          >
            <h2 className="font-serif text-xl font-medium mb-6">Produits les Plus Vendus</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-sm font-semibold text-gold-dark">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} ventes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gold-dark">
                      {formatCurrency(product.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activité Récente */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="luxury-card bg-card p-6 rounded-xl border border-border/50"
          >
            <h2 className="font-serif text-xl font-medium mb-6">Activité Récente</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary/50">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">Il y a {activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Graphique simulé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="luxury-card bg-card p-6 rounded-xl border border-border/50"
        >
          <h2 className="font-serif text-xl font-medium mb-6">Évolution des Ventes</h2>
          <div className="h-64 flex items-end justify-between gap-2 bg-secondary/20 rounded-lg p-4">
            {[65, 45, 78, 52, 89, 67, 94, 73, 85, 91, 76, 88].map((height, index) => (
              <div
                key={index}
                className="bg-gold/70 rounded-t flex-1 transition-all hover:bg-gold"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Jan</span>
            <span>Fév</span>
            <span>Mar</span>
            <span>Avr</span>
            <span>Mai</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aoû</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Déc</span>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}