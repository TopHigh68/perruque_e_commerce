import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Phone, Clock, CheckCircle, Reply, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  subject: string;
  message: string;
  status: 'new' | 'replied' | 'closed';
  priority: 'low' | 'medium' | 'high';
  source: 'contact-form' | 'whatsapp' | 'email';
  createdAt: string;
  reply?: string;
  repliedAt?: string;
}

const mockMessages: Message[] = [
  {
    id: 'MSG-001',
    customerName: 'Marie Dubois',
    customerEmail: 'marie.dubois@email.com',
    customerPhone: '+33 6 12 34 56 78',
    subject: 'Question sur les perruques en cheveux humains',
    message: 'Bonjour, je souhaiterais savoir si vos perruques en cheveux humains peuvent être colorées et stylées comme de vrais cheveux ?',
    status: 'new',
    priority: 'medium',
    source: 'contact-form',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'MSG-002',
    customerName: 'Sophie Martin',
    customerEmail: 'sophie.martin@email.com',
    subject: 'Problème avec ma commande',
    message: 'Ma commande CMD-002 n\'est toujours pas arrivée. Pouvez-vous me donner des nouvelles ?',
    status: 'replied',
    priority: 'high',
    source: 'whatsapp',
    createdAt: '2024-01-14T14:20:00Z',
    reply: 'Bonjour Sophie, votre commande a été expédiée hier. Vous devriez la recevoir sous 2-3 jours ouvrés.',
    repliedAt: '2024-01-14T16:45:00Z'
  },
  {
    id: 'MSG-003',
    customerName: 'Fatou Diallo',
    customerEmail: 'fatou.diallo@email.com',
    customerPhone: '+221 77 123 45 67',
    subject: 'Demande de conseil personnalisé',
    message: 'Je cherche une perruque pour un événement spécial. Pouvez-vous me conseiller selon ma morphologie ?',
    status: 'closed',
    priority: 'low',
    source: 'email',
    createdAt: '2024-01-10T09:15:00Z',
    reply: 'Merci pour votre message. Nous vous avons envoyé un guide personnalisé par email.',
    repliedAt: '2024-01-10T11:30:00Z'
  }
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'whatsapp': return Phone;
      case 'email': return Mail;
      case 'contact-form': return MessageSquare;
      default: return MessageSquare;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'whatsapp': return 'WhatsApp';
      case 'email': return 'Email';
      case 'contact-form': return 'Formulaire';
      default: return source;
    }
  };

  const handleReply = (messageId: string) => {
    if (!replyText.trim()) return;

    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            status: 'replied' as const,
            reply: replyText,
            repliedAt: new Date().toISOString()
          }
        : msg
    ));
    
    setReplyText('');
    setSelectedMessage(null);
  };

  const updateMessageStatus = (messageId: string, newStatus: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status: newStatus as any } : msg
    ));
  };

  const deleteMessage = (messageId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }
  };

  const filteredMessages = statusFilter === 'all' 
    ? messages 
    : messages.filter(msg => msg.status === statusFilter);

  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    replied: messages.filter(m => m.status === 'replied').length,
    closed: messages.filter(m => m.status === 'closed').length
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-medium">Messages & Contacts</h1>
          <p className="text-muted-foreground">Gérez les messages clients et demandes de contact</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-semibold">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nouveaux</p>
                <p className="text-2xl font-semibold">{stats.new}</p>
              </div>
            </div>
          </div>

          <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Répondus</p>
                <p className="text-2xl font-semibold">{stats.replied}</p>
              </div>
            </div>
          </div>

          <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gray-100">
                <MessageSquare className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fermés</p>
                <p className="text-2xl font-semibold">{stats.closed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
          <select
            className="px-4 py-2 border border-border rounded-lg bg-background"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les messages</option>
            <option value="new">Nouveaux</option>
            <option value="replied">Répondus</option>
            <option value="closed">Fermés</option>
          </select>
        </div>

        {/* Liste des messages */}
        <div className="space-y-4">
          {filteredMessages.map((message) => {
            const SourceIcon = getSourceIcon(message.source);
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="luxury-card bg-card p-6 rounded-xl border border-border/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="text-sm font-semibold text-gold-dark">
                        {message.customerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{message.customerName}</h3>
                        <Badge className={getStatusColor(message.status)}>
                          {message.status === 'new' ? 'Nouveau' : 
                           message.status === 'replied' ? 'Répondu' : 'Fermé'}
                        </Badge>
                        <Badge className={getPriorityColor(message.priority)}>
                          {message.priority === 'high' ? 'Urgent' :
                           message.priority === 'medium' ? 'Moyen' : 'Faible'}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <SourceIcon className="h-3 w-3" />
                          {getSourceLabel(message.source)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{message.customerEmail}</p>
                      {message.customerPhone && (
                        <p className="text-sm text-muted-foreground">{message.customerPhone}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(message.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">{message.subject}</h4>
                  <p className="text-muted-foreground">{message.message}</p>
                </div>

                {message.reply && (
                  <div className="bg-secondary/30 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Reply className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">Votre réponse</span>
                      <span className="text-xs text-muted-foreground">
                        {message.repliedAt && new Date(message.repliedAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-sm">{message.reply}</p>
                  </div>
                )}

                {selectedMessage?.id === message.id && message.status === 'new' && (
                  <div className="border-t border-border/50 pt-4 mt-4">
                    <Textarea
                      placeholder="Tapez votre réponse..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={3}
                      className="mb-3"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleReply(message.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                        disabled={!replyText.trim()}
                      >
                        Envoyer la réponse
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedMessage(null)}
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border/50">
                  {message.status === 'new' && (
                    <Button
                      size="sm"
                      onClick={() => setSelectedMessage(message)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Reply className="h-4 w-4 mr-2" />
                      Répondre
                    </Button>
                  )}
                  {message.status === 'replied' && (
                    <Button
                      size="sm"
                      onClick={() => updateMessageStatus(message.id, 'closed')}
                      variant="outline"
                    >
                      Fermer
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteMessage(message.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-20">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground mb-2">
              Aucun message trouvé
            </p>
            <p className="text-muted-foreground">
              Les nouveaux messages apparaîtront ici
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}