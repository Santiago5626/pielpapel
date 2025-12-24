import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export function CartSidebar({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartSidebarProps) {
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[--color-border]">
              <h3>Carrito de Compras</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[--color-accent] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-[--color-text-light] mb-4" />
                  <p className="mb-2">Tu carrito está vacío</p>
                  <p className="text-sm">
                    Añade productos para comenzar tu compra
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 pb-4 border-b border-[--color-border]"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-xs text-[--color-text-light] mb-1">
                          {item.product.brand}
                        </p>
                        <h4 className="text-sm mb-2">{item.product.name}</h4>
                        <p className="text-[--color-primary] mb-2">
                          ${item.product.price.toLocaleString('es-CO')}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="p-1 hover:bg-[--color-accent] rounded transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-[--color-accent] rounded transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-sm text-[--color-text-light] hover:text-[--color-primary] transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[--color-border] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="text-xl">${total.toLocaleString('es-CO')}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[--color-primary] text-white rounded-lg hover:bg-[--color-primary-dark] transition-colors"
                >
                  Proceder al pago
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 border border-[--color-border] rounded-lg hover:bg-[--color-accent] transition-colors"
                >
                  Continuar comprando
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}