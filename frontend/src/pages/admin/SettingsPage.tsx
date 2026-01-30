import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Store, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Save,
  Eye,
  EyeOff,
  Globe,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';

interface BusinessSettings {
  businessName: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  website: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

interface PaymentSettings {
  methods: {
    bankTransfer: boolean;
    mobileMoney: boolean;
    cash: boolean;
    paypal: boolean;
  };
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  mobileMoneyNumbers: {
    orangeMoney: string;
    mtnMoney: string;
    waveMoney: string;
  };
}

const initialBusinessSettings: BusinessSettings = {
  businessName: 'LuxeWig',
  description: 'Boutique de perruques premium et accessoires capillaires de luxe',
  email: 'contact@luxewig.com',
  phone: '+33 1 23 45 67 89',
  whatsapp: '+33 6 12 34 56 78',
  address: '123 Avenue des Champs-Élysées, 75008 Paris, France',
  website: 'https://luxewig.com',
  socialMedia: {
    facebook: 'https://facebook.com/luxewig',
    instagram: 'https://instagram.com/luxewig',
    twitter: 'https://twitter.com/luxewig'
  }
};

const initialPaymentSettings: PaymentSettings = {
  methods: {
    bankTransfer: true,
    mobileMoney: true,
    cash: true,
    paypal: false
  },
  bankDetails: {
    bankName: 'Banque Populaire',
    accountNumber: 'FR76 1234 5678 9012 3456 789',
    accountName: 'LuxeWig SARL'
  },
  mobileMoneyNumbers: {
    orangeMoney: '+221 77 123 45 67',
    mtnMoney: '+221 76 987 65 43',
    waveMoney: '+221 78 456 78 90'
  }
};

export default function SettingsPage() {
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>(initialBusinessSettings);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(initialPaymentSettings);
  const [activeTab, setActiveTab] = useState('business');
  const [isLoading, setIsLoading] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleSaveBusinessSettings = async () => {
    setIsLoading(true);
    // Simulation de sauvegarde
    setTimeout(() => {
      console.log('Paramètres business sauvegardés:', businessSettings);
      setIsLoading(false);
      alert('Paramètres sauvegardés avec succès !');
    }, 1000);
  };

  const handleSavePaymentSettings = async () => {
    setIsLoading(true);
    // Simulation de sauvegarde
    setTimeout(() => {
      console.log('Paramètres paiement sauvegardés:', paymentSettings);
      setIsLoading(false);
      alert('Paramètres de paiement sauvegardés avec succès !');
    }, 1000);
  };

  const tabs = [
    { id: 'business', label: 'Informations Business', icon: Store },
    { id: 'payment', label: 'Moyens de Paiement', icon: CreditCard }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-3xl font-medium">Paramètres</h1>
          <p className="text-muted-foreground">Configurez les paramètres de votre boutique</p>
        </div>

        {/* Onglets */}
        <div className="flex gap-4 border-b border-border/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-gold text-gold-dark'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'business' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Informations générales */}
            <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
              <h2 className="font-serif text-xl font-medium mb-6">Informations Générales</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom de l'entreprise</label>
                  <Input
                    value={businessSettings.businessName}
                    onChange={(e) => setBusinessSettings(prev => ({ ...prev, businessName: e.target.value }))}
                    placeholder="LuxeWig"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Site web</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      value={businessSettings.website}
                      onChange={(e) => setBusinessSettings(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://luxewig.com"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={businessSettings.description}
                    onChange={(e) => setBusinessSettings(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Description de votre boutique..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
              <h2 className="font-serif text-xl font-medium mb-6">Informations de Contact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      type="email"
                      value={businessSettings.email}
                      onChange={(e) => setBusinessSettings(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="contact@luxewig.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      value={businessSettings.phone}
                      onChange={(e) => setBusinessSettings(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">WhatsApp</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      value={businessSettings.whatsapp}
                      onChange={(e) => setBusinessSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Adresse</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      value={businessSettings.address}
                      onChange={(e) => setBusinessSettings(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="123 Avenue des Champs-Élysées..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
              <h2 className="font-serif text-xl font-medium mb-6">Réseaux Sociaux</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Facebook</label>
                  <Input
                    value={businessSettings.socialMedia.facebook}
                    onChange={(e) => setBusinessSettings(prev => ({ 
                      ...prev, 
                      socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                    }))}
                    placeholder="https://facebook.com/luxewig"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Instagram</label>
                  <Input
                    value={businessSettings.socialMedia.instagram}
                    onChange={(e) => setBusinessSettings(prev => ({ 
                      ...prev, 
                      socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                    }))}
                    placeholder="https://instagram.com/luxewig"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Twitter</label>
                  <Input
                    value={businessSettings.socialMedia.twitter}
                    onChange={(e) => setBusinessSettings(prev => ({ 
                      ...prev, 
                      socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                    }))}
                    placeholder="https://twitter.com/luxewig"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSaveBusinessSettings}
                disabled={isLoading}
                className="bg-gold hover:bg-gold/90 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </div>
          </motion.div>
        )}

        {activeTab === 'payment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Moyens de paiement */}
            <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
              <h2 className="font-serif text-xl font-medium mb-6">Moyens de Paiement Acceptés</h2>
              
              <div className="space-y-4">
                {Object.entries(paymentSettings.methods).map(([method, enabled]) => {
                  const labels = {
                    bankTransfer: 'Virement bancaire',
                    mobileMoney: 'Mobile Money',
                    cash: 'Paiement à la livraison',
                    paypal: 'PayPal'
                  };
                  
                  return (
                    <div key={method} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={method}
                        checked={enabled}
                        onChange={(e) => setPaymentSettings(prev => ({
                          ...prev,
                          methods: { ...prev.methods, [method]: e.target.checked }
                        }))}
                        className="w-4 h-4 text-gold focus:ring-gold border-border rounded"
                      />
                      <label htmlFor={method} className="text-sm font-medium">
                        {labels[method as keyof typeof labels]}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Détails bancaires */}
            {paymentSettings.methods.bankTransfer && (
              <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl font-medium">Détails Bancaires</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBankDetails(!showBankDetails)}
                  >
                    {showBankDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom de la banque</label>
                    <Input
                      value={paymentSettings.bankDetails.bankName}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        bankDetails: { ...prev.bankDetails, bankName: e.target.value }
                      }))}
                      placeholder="Banque Populaire"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom du compte</label>
                    <Input
                      value={paymentSettings.bankDetails.accountName}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        bankDetails: { ...prev.bankDetails, accountName: e.target.value }
                      }))}
                      placeholder="LuxeWig SARL"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium">Numéro de compte</label>
                    <Input
                      type={showBankDetails ? 'text' : 'password'}
                      value={paymentSettings.bankDetails.accountNumber}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        bankDetails: { ...prev.bankDetails, accountNumber: e.target.value }
                      }))}
                      placeholder="FR76 1234 5678 9012 3456 789"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Money */}
            {paymentSettings.methods.mobileMoney && (
              <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
                <h2 className="font-serif text-xl font-medium mb-6">Numéros Mobile Money</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Orange Money</label>
                    <Input
                      value={paymentSettings.mobileMoneyNumbers.orangeMoney}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        mobileMoneyNumbers: { ...prev.mobileMoneyNumbers, orangeMoney: e.target.value }
                      }))}
                      placeholder="+221 77 123 45 67"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">MTN Money</label>
                    <Input
                      value={paymentSettings.mobileMoneyNumbers.mtnMoney}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        mobileMoneyNumbers: { ...prev.mobileMoneyNumbers, mtnMoney: e.target.value }
                      }))}
                      placeholder="+221 76 987 65 43"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Wave Money</label>
                    <Input
                      value={paymentSettings.mobileMoneyNumbers.waveMoney}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        mobileMoneyNumbers: { ...prev.mobileMoneyNumbers, waveMoney: e.target.value }
                      }))}
                      placeholder="+221 78 456 78 90"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button
                onClick={handleSavePaymentSettings}
                disabled={isLoading}
                className="bg-gold hover:bg-gold/90 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
}