import { useState } from 'react';
import { CartItem } from '../types';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';

interface CheckoutPageProps {
  items: CartItem[];
  onClearCart: () => void;
}

export function CheckoutPage({ items, onClearCart }: CheckoutPageProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'España',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 200000 ? 0 : 15000;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      setTimeout(() => {
        onClearCart();
        navigate('/');
      }, 3000);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="mb-4 text-lg">Tu carrito está vacío</p>
        <button
          onClick={() => window.location.href = '/catalogo'}
          className="px-6 py-3 bg-[--color-primary] text-white rounded-lg hover:bg-[--color-primary-dark] transition-colors"
        >
          Ir a productos
        </button>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="mb-4">¡Pedido realizado con éxito!</h2>
        <p className="mb-8">
          Recibirás un correo de confirmación con los detalles de tu pedido.
        </p>
        <p className="text-sm text-[--color-text-light]">
          Redirigiendo a la página principal...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <h1 className="mb-8">Finalizar Compra</h1>

      {/* Progress Steps */}
      <div className="mb-12 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-[--color-primary] text-white' : 'bg-gray-200'
            }`}
          >
            <Truck className="w-5 h-5" />
          </div>
          <span className={step >= 1 ? 'text-[--color-primary]' : 'text-gray-400'}>
            Envío
          </span>
        </div>
        <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-[--color-primary]' : 'bg-gray-200'}`}></div>
        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-[--color-primary] text-white' : 'bg-gray-200'
            }`}
          >
            <CreditCard className="w-5 h-5" />
          </div>
          <span className={step >= 2 ? 'text-[--color-primary]' : 'text-gray-400'}>Pago</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div>
                  <h3 className="mb-4">Información de contacto</h3>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                  />
                </div>

                <div>
                  <h3 className="mb-4">Dirección de envío</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                    />
                    <input
                      type="text"
                      placeholder="Dirección"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Ciudad"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                      />
                      <input
                        type="text"
                        placeholder="Código postal"
                        value={formData.postalCode}
                        onChange={(e) =>
                          setFormData({ ...formData, postalCode: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                      />
                    </div>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                    >
                      <option>España</option>
                      <option>Portugal</option>
                      <option>Francia</option>
                      <option>Italia</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <div>
                <h3 className="mb-4">Información de pago</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Número de tarjeta"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    required
                    maxLength={19}
                    className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                  />
                  <input
                    type="text"
                    placeholder="Nombre en la tarjeta"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      required
                      maxLength={5}
                      className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      required
                      maxLength={3}
                      className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 border border-[--color-border] rounded-lg hover:bg-[--color-accent] transition-colors"
                >
                  Volver
                </button>
              )}
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-[--color-primary] text-white rounded-lg hover:bg-[--color-primary-dark] transition-colors"
              >
                {step === 1 ? 'Continuar al pago' : 'Confirmar pedido'}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-[--color-accent] rounded-lg p-6 sticky top-24">
            <h3 className="mb-4">Resumen del pedido</h3>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm mb-1">{item.product.name}</p>
                    <p className="text-xs text-[--color-text-light]">
                      Cantidad: {item.quantity}
                    </p>
                    <p className="text-sm text-[--color-primary]">
                      ${(item.product.price * item.quantity).toLocaleString('es-CO')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-[--color-border]">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Envío</span>
                <span>{shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString('es-CO')}`}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[--color-border]">
                <span>Total</span>
                <span className="text-xl text-[--color-primary]">${total.toLocaleString('es-CO')}</span>
              </div>
            </div>

            {subtotal < 200000 && (
              <p className="mt-4 text-xs text-center text-[--color-text-light]">
                Envío gratis en pedidos superiores a $200.000
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}