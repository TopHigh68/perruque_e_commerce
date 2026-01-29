import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, Truck, Eye, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: string;
}

const mockOrders: Order[] = [
  {
    id: 'CMD-001',
    customerName: 'Marie Dubois',
    customerEmail: 'marie.dubois@email.com',
    customerPhone: '+33 6 12 34 56 78',
    items: [
      { name: 'Lisse Soyeux Noir', quantity: 1, price: 294350 }
    ],
    total: 294350,
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
    shippingAddress: '123 Rue de la Paix, 75001 Paris'
  },
  {
    id: 'CMD-002',
    customerName: 'Sophie Martin',
    customerEmail: 'sophie.martin@email.com',
    customerPhone: '+33 6 98 76 54 32',
    items: [
      { name: 'Boucles Auburn Glamour', quantity: 1, price: 346870 },
      { name: 'Bob Classique Noir', quantity: 1, price: 123895 }
    ],
    total: 470765,
    status: 'confirmed',
    createdAt: '2024-01-14T14:20:00Z',
    shippingAddress: '456 Avenue des Champs, 69000 Lyon'
  },
  {
    id: 'CMD-003',
    customerName: 'Fatou Diallo',
    customerEmail: 'fatou.diallo@email.com',
    customerPhone: '+221 77 123 45 67',
    items: [
      { name: 'Afro Naturel Queen', quantity: 2, price: 313990 }
    ],
    total: 627980,
    status: 'delivered',
    createdAt: '2024-01-10T09:15:00Z',
    shippingAddress: 'Dakar, Sénégal'
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'confirmed': return CheckCircle;
      case 'shipped': return Truck;
      case 'delivered': return Package;
      default: return Clock;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      default: return status;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus as any } : order
    ));
  };

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-medium">Gestion des Commandes</h1>
          <p className="text-muted-foreground">Suivez et gérez toutes les commandes</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-semibold">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En attente</p>
                <p className="text-2xl font-semibold">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Confirmées</p>
                <p className="text-2xl font-semibold">{stats.confirmed}</p>
              </div>
            </div>
          </div>

          <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Livrées</p>
                <p className="text-2xl font-semibold">{stats.delivered}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-border rounded-lg bg-background"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmées</option>
              <option value="shipped">Expédiées</option>
              <option value="delivered">Livrées</option>
            </select>
          </div>
        </div>

        {/* Liste des commandes */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.status);
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="luxury-card bg-card p-6 rounded-xl border border-border/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{order.id}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {getStatusLabel(order.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-gold-dark">
                      {order.total.toLocaleString()} FCFA
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Informations Client</h4>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">{order.customerName}</p>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {order.customerEmail}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {order.customerPhone}
                      </div>
                      <p className="text-muted-foreground mt-2">
                        <strong>Adresse:</strong> {order.shippingAddress}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Articles commandés</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span className="font-medium">
                            {(item.price * item.quantity).toLocaleString()} FCFA
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border/50">
                  {order.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, 'confirmed')}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Confirmer
                    </Button>
                  )}
                  {order.status === 'confirmed' && (
                    <Button
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, 'shipped')}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Marquer comme expédiée
                    </Button>
                  )}
                  {order.status === 'shipped' && (
                    <Button
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Marquer comme livrée
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Détails
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}