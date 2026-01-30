import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  ShoppingBag, 
  AlertTriangle, 
  TrendingUp,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';

interface Wig {
  id: number;
  name: string;
  price: number;
  priceRange: 'abordable' | 'standard' | 'premium' | 'luxe';
  hairType: string;
  style: string;
  length: string;
  stock: number;
  isVisible: boolean;
  image: string;
  createdAt: string;
}

const mockWigs: Wig[] = [
  {
    id: 1,
    name: 'Lisse Soyeux Noir',
    price: 294350,
    priceRange: 'premium',
    hairType: 'Cheveux Humains',
    style: 'Lisse',
    length: '45cm',
    stock: 12,
    isVisible: true,
    image: '/assets/wig-product-1.jpg',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Boucles Auburn Glamour',
    price: 346870,
    priceRange: 'luxe',
    hairType: 'Cheveux Humains',
    style: 'Bouclé',
    length: '40cm',
    stock: 0,
    isVisible: true,
    image: '/assets/wig-product-2.jpg',
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    name: 'Bob Classique Noir',
    price: 123895,
    priceRange: 'standard',
    hairType: 'Synthétique',
    style: 'Lisse',
    length: '30cm',
    stock: 25,
    isVisible: false,
    image: '/assets/wig-product-3.jpg',
    createdAt: '2024-01-13'
  }
];

export default function AdminDashboard() {
  const [wigs, setWigs] = useState<Wig[]>(mockWigs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRange, setFilterRange] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const stats = {
    totalWigs: wigs.length,
    activeProducts: wigs.filter(w => w.isVisible).length,
    outOfStock: wigs.filter(w => w.stock === 0).length,
    totalValue: wigs.reduce((sum, w) => sum + (w.price * w.stock), 0)
  };

  const filteredWigs = wigs.filter(wig => {
    const matchesSearch = wig.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRange === 'all' || wig.priceRange === filterRange;
    return matchesSearch && matchesFilter;
  });

  const toggleVisibility = (id: number) => {
    setWigs(prev => prev.map(wig => 
      wig.id === id ? { ...wig, isVisible: !wig.isVisible } : wig
    ));
  };

  const deleteWig = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette perruque ?')) {
      setWigs(prev => prev.filter(wig => wig.id !== id));
    }
  };

  const getPriceRangeColor = (range: string) => {
    switch (range) {
      case 'abordable': return 'bg-green-100 text-green-800';
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'luxe': return 'bg-gold/20 text-gold-dark';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-serif text-3xl font-medium">Tableau de Bord</h1>
            <p className="text-muted-foreground">Gérez votre boutique de perruques</p>
          </div>
          <Button 
            onClick={() => navigate('/admin/wigs/new')}
            className="bg-gold hover:bg-gold/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Perruque
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="luxury-card bg-card p-6 rounded-xl border border-border/50"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Perruques</p>
                <p className="text-2xl font-semibold">{stats.totalWigs}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="luxury-card bg-card p-6 rounded-xl border border-border/50"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Produits Actifs</p>
                <p className="text-2xl font-semibold">{stats.activeProducts}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="luxury-card bg-card p-6 rounded-xl border border-border/50"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rupture de Stock</p>
                <p className="text-2xl font-semibold">{stats.outOfStock}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="luxury-card bg-card p-6 rounded-xl border border-border/50"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gold/20">
                <TrendingUp className="h-6 w-6 text-gold-dark" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valeur Stock</p>
                <p className="text-2xl font-semibold">{stats.totalValue.toLocaleString()} FCFA</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gestion des Perruques */}
        <div className="luxury-card bg-card rounded-xl border border-border/50">
          <div className="p-6 border-b border-border/50">
            <h2 className="font-serif text-xl font-medium mb-4">Gestion des Perruques</h2>
            
            {/* Filtres et Recherche */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une perruque..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-border rounded-lg bg-background"
                value={filterRange}
                onChange={(e) => setFilterRange(e.target.value)}
              >
                <option value="all">Toutes les gammes</option>
                <option value="abordable">Abordable</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
                <option value="luxe">Luxe</option>
              </select>
            </div>
          </div>

          {/* Liste des Perruques */}
          <div className="p-6">
            <div className="space-y-4">
              {filteredWigs.map((wig) => (
                <motion.div
                  key={wig.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-4 p-4 border border-border/50 rounded-lg hover:bg-secondary/30 transition-colors"
                >
                  <img
                    src={wig.image}
                    alt={wig.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{wig.name}</h3>
                      <Badge className={getPriceRangeColor(wig.priceRange)}>
                        {wig.priceRange}
                      </Badge>
                      {wig.stock === 0 && (
                        <Badge variant="destructive">Rupture</Badge>
                      )}
                      {!wig.isVisible && (
                        <Badge variant="secondary">Masqué</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {wig.hairType} • {wig.style} • {wig.length} • Stock: {wig.stock}
                    </div>
                    <div className="font-semibold text-gold-dark">
                      {wig.price.toLocaleString()} FCFA
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleVisibility(wig.id)}
                    >
                      {wig.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/wigs/${wig.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteWig(wig.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}