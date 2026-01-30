import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

export function CartSidebar() {
  const { state, removeItem, updateQuantity, closeCart, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-[60]"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[60] flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-serif text-xl font-semibold">
                Panier ({totalItems})
              </h2>
              <button
                onClick={() => {
                  console.log('Close button clicked');
                  closeCart();
                }}
                className="rounded-full cursor-pointer hover:bg-gray-100 p-2 transition-colors"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Votre panier est vide</h3>
                  <p className="text-gray-500 mb-6">
                    Ajoutez des produits pour commencer vos achats
                  </p>
                  <Button onClick={closeCart} className="bg-[#e1b052] hover:bg-[#d89c2b]">
                    Continuer les achats
                  </Button>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        {item.color && (
                          <p className="text-xs text-gray-500">Couleur: {item.color}</p>
                        )}
                        {item.length && (
                          <p className="text-xs text-gray-500">Longueur: {item.length}</p>
                        )}
                        <p className="font-semibold text-[#e1b052] mt-1">
                          {item.price.toLocaleString()} FCFA
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-1 bg-white rounded-full border">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 rounded-full"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 rounded-full"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t p-6 bg-white">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-xl text-[#e1b052]">
                      {totalPrice.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="space-y-3">
                    <Button className="w-full cursor-pointer bg-[#e1b052] hover:bg-[#d89c2b] text-white" asChild>
                      <Link to="/checkout">
                        Passer la Commande
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full cursor-pointer" onClick={closeCart}>
                      Continuer les Achats
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}