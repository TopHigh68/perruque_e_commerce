import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, MapPin, Calendar, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'inactive';
  registeredAt: string;
}

const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    totalOrders: 3,
    totalSpent: 650000,
    lastOrderDate: '2024-01-15',
    status: 'active',
    registeredAt: '2023-12-01'
  },
  {
    id: 'CUST-002',
    name: 'Sophie Martin',
    email: 'sophie.martin@email.com',
    phone: '+33 6 98 76 54 32',
    location: 'Lyon, France',
    totalOrders: 2,
    totalSpent: 470765,
    lastOrderDate: '2024-01-14',
    status: 'active',
    registeredAt: '2023-11-15'
  },
  {
    id: 'CUST-003',
    name: 'Fatou Diallo',
    email: 'fatou.diallo@email.com',
    phone: '+221 77 123 45 67',
    location: 'Dakar, Sénégal',
    totalOrders: 5,
    totalSpent: 1200000,
    lastOrderDate: '2024-01-10',
    status: 'active',
    registeredAt: '2023-10-20'
  },
  {
    id: 'CUST-004',
    name: 'Aminata Traoré',
    email: 'aminata.traore@email.com',
    phone: '+223 70 12 34 56',
    location: 'Bamako, Mali',
    totalOrders: 1,
    totalSpent: 294350,
    lastOrderDate: '2023-12-20',
    status: 'inactive',
    registeredAt: '2023-12-15'
  }
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0)
  };

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 1000000) return { label: 'VIP', color: 'bg-gold/20 text-gold-dark' };
    if (totalSpent >= 500000) return { label: 'Premium', color: 'bg-purple-100 text-purple-800' };
    if (totalSpent >= 200000) return { label: 'Fidèle', color: 'bg-blue-100 text-blue-800' };
    return { label: 'Nouveau', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-medium">Gestion des Clients</h1>
          <p className="text-muted-foreground">Gérez votre base de clients et leurs informations</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-semibold">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clients Actifs</p>
                <p className="text-2xl font-semibold">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-100">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clients Inactifs</p>
                <p className="text-2xl font-semibold">{stats.inactive}</p>
              </div>
            </div>
          </div>

          <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gold/20">
                <Users className="h-6 w-6 text-gold-dark" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Chiffre d'Affaires</p>
                <p className="text-2xl font-semibold">{stats.totalRevenue.toLocaleString()} FCFA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres et Recherche */}
        <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un client..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-border rounded-lg bg-background"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
            </select>
          </div>
        </div>

        {/* Liste des clients */}
        <div className="space-y-4">
          {filteredCustomers.map((customer) => {
            const tier = getCustomerTier(customer.totalSpent);
            return (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="luxury-card bg-card p-6 rounded-xl border border-border/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="text-lg font-semibold text-gold-dark">
                        {customer.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{customer.name}</h3>
                        <Badge className={tier.color}>
                          {tier.label}
                        </Badge>
                        <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                          {customer.status === 'active' ? 'Actif' : 'Inactif'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{customer.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-gold-dark">
                      {customer.totalSpent.toLocaleString()} FCFA
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {customer.totalOrders} commande{customer.totalOrders > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {customer.phone}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {customer.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Dernière commande: {new Date(customer.lastOrderDate).toLocaleDateString('fr-FR')}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/50">
                  <div className="text-sm text-muted-foreground">
                    Client depuis le {new Date(customer.registeredAt).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Voir Commandes
                    </Button>
                    <Button variant="outline" size="sm">
                      Contacter
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-20">
            <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground mb-2">
              Aucun client trouvé
            </p>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}