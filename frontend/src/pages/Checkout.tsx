import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Lock, Check, User, MapPin, CreditCard as CardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FixedHeader } from '@/components/layout/FixedHeader';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { isValidPhoneNumber, isPossiblePhoneNumber } from 'libphonenumber-js';

const Checkout = () => {
  const { state, totalPrice } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    mobileNumber: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Données de commande:', formData);
    alert('Commande soumise avec succès !');
  };

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [attemptedNext, setAttemptedNext] = useState(false);

  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.firstName) newErrors.firstName = 'Ce champ est requis';
    if (!formData.lastName) newErrors.lastName = 'Ce champ est requis';
    if (!formData.email) newErrors.email = 'Ce champ est requis';
    if (!formData.phone) newErrors.phone = 'Ce champ est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1) {
      setAttemptedNext(true);
      if (!validateStep1()) return;
      setAttemptedNext(false);
    }
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const shippingCost = 5000;
  const finalTotal = totalPrice + shippingCost;

  const steps = [
    { number: 1, title: 'Informations', icon: User },
    { number: 2, title: 'Livraison', icon: MapPin },
    { number: 3, title: 'Paiement', icon: CardIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <FixedHeader />
      
      <main className="pt-24 pb-12">
        <div className="container-luxury">
          {/* Header */}
          <div className="mb-8">
            <Link to="/shop" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la boutique
            </Link>
            <h1 className="font-serif text-3xl font-medium">Finaliser la commande</h1>
          </div>

          {/* Steps Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.number 
                        ? 'bg-gold border-gold text-white' 
                        : 'border-gray-300 text-gray-400'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      currentStep >= step.number ? 'text-gold' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        currentStep > step.number ? 'bg-gold' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Étape 1: Informations personnelles */}
                {currentStep === 1 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="font-serif text-xl font-medium mb-6">Informations personnelles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Prénom *</label>
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Votre prénom"
                          required
                          className={`h-12 ${errors.firstName ? 'border-red-500' : ''}`}
                        />
                        {attemptedNext && errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Nom *</label>
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Votre nom"
                          required
                          className={`h-12 ${errors.lastName ? 'border-red-500' : ''}`}
                        />
                        {attemptedNext && errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="vous@exemple.com"
                          required
                          className={`h-12 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {attemptedNext && errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Téléphone *</label>
                        <PhoneInput
                          country={'bj'}
                          value={formData.phone}
                          disableDropdown={false}
                          onChange={(phone) => {
                            // Bloquer à exactement 11 caractères
                            if (phone.length <= 11) {
                              setFormData({ ...formData, phone });
                            }
                          }}
                          isValid={(value) => {
                            try {
                              // Utiliser isPossiblePhoneNumber pour une validation plus souple
                              // et isValidPhoneNumber pour une validation stricte
                              return isPossiblePhoneNumber('+' + value, 'BJ') && 
                                     isValidPhoneNumber('+' + value, 'BJ');
                            } catch {
                              return false;
                            }
                          }}
                          inputStyle={{
                            height: '48px',
                            width: '100%',
                            fontSize: '14px',
                            border: errors.phone ? '1px solid #ef4444' : '1px solid #d1d5db',
                            borderRadius: '6px'
                          }}
                          buttonStyle={{
                            border: errors.phone ? '1px solid #ef4444' : '1px solid #d1d5db',
                            borderRadius: '6px 0 0 6px'
                          }}
                          containerStyle={{
                            width: '100%'
                          }}
                        />
                        {attemptedNext && errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <Button type="button" onClick={nextStep} className="cursor-pointer bg-[#e1b052] hover:bg-[#d89c2b]">
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}

                {/* Étape 2: Adresse de livraison */}
                {currentStep === 2 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="font-serif text-xl font-medium mb-6">Adresse de livraison</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Adresse complète *</label>
                        <Input
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="123 Rue de la Paix, Quartier..."
                          required
                          className={`h-12 ${errors.address ? 'border-red-500' : ''}`}
                        />
                        {attemptedNext && errors.address && (
                          <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Ville *</label>
                          <Input
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Cotonou"
                            required
                            className={`h-12 ${errors.city ? 'border-red-500' : ''}`}
                          />
                          {attemptedNext && errors.city && (
                            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Code postal</label>
                          <Input
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="01000"
                            className="h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Pays *</label>
                          <Input
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className={`h-12 ${errors.country ? 'border-red-500' : ''}`}
                          />
                          {attemptedNext && errors.country && (
                            <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Notes (optionnel)</label>
                        <Textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Instructions spéciales pour la livraison..."
                          className="min-h-25"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between mt-6">
                      <Button type="button" variant="outline" onClick={prevStep} className='cursor-pointer'>
                        Précédent
                      </Button>
                      <Button type="button" onClick={nextStep} className=" cursor-pointer bg-[#e1b052] hover:bg-[#d89c2b]">
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}

                {/* Étape 3: Méthode de paiement */}
                {currentStep === 3 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="font-serif text-xl font-medium mb-6">Méthode de paiement</h2>
                    
                    {/* Options de paiement */}
                    <div className="space-y-4 mb-6">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === 'card' ? 'border-gold bg-gold/5' : 'border-gray-200'
                        }`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-gold" />
                          <span className="font-medium">Carte bancaire</span>
                          {paymentMethod === 'card' && <Check className="h-4 w-4 text-gold ml-auto" />}
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          paymentMethod === 'mobile' ? 'border-gold bg-gold/5' : 'border-gray-200'
                        }`}
                        onClick={() => setPaymentMethod('mobile')}
                      >
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-gold" />
                          <span className="font-medium">Mobile Money (MTN, Moov)</span>
                          {paymentMethod === 'mobile' && <Check className="h-4 w-4 text-gold ml-auto" />}
                        </div>
                      </div>
                    </div>

                    {/* Formulaire carte bancaire */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Numéro de carte *</label>
                          <Input
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            required
                            className="h-12"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Date d'expiration *</label>
                            <Input
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              placeholder="MM/AA"
                              required
                              className="h-12"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">CVV *</label>
                            <Input
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              placeholder="123"
                              required
                              className="h-12"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Nom sur la carte *</label>
                          <Input
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            placeholder="Jean Dupont"
                            required
                            className="h-12"
                          />
                        </div>
                      </div>
                    )}

                    {/* Formulaire Mobile Money */}
                    {paymentMethod === 'mobile' && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Numéro de téléphone *</label>
                        <Input
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          placeholder="+229 XX XX XX XX"
                          required
                          className="h-12"
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          Vous recevrez un message pour confirmer le paiement
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={prevStep} className='cursor-pointer'>
                        Précédent
                      </Button>
                      <Button
                        type="submit"
                        className="bg-[#e1b052] cursor-pointer hover:bg-[#d89c2b]"
                        onClick={handleSubmit}
                      >
                        <Lock className="h-4 w-4 mr-2 " />
                        Finaliser la commande
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Résumé de commande */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28">
                <h2 className="font-serif text-xl font-medium mb-6">Résumé de commande</h2>
                
                {/* Articles */}
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">Qté: {item.quantity}</p>
                        <p className="font-semibold text-gold">
                          {(item.price * item.quantity).toLocaleString()} FCFA
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totaux */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{totalPrice.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>{shippingCost.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span className="text-gold">{finalTotal.toLocaleString()} FCFA</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Paiement sécurisé • Vos données sont protégées
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;