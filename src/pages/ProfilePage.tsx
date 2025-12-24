import { useState } from 'react';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState('orders');

  // Mock data
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-12-15',
      status: 'Entregado',
      total: 87.50,
      items: 3,
    },
    {
      id: 'ORD-002',
      date: '2024-12-10',
      status: 'En tránsito',
      total: 124.99,
      items: 5,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <h1 className="mb-8">Mi Perfil</h1>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-[--color-border] rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[--color-border]">
              <div className="w-16 h-16 bg-[--color-primary]/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-[--color-primary]" />
              </div>
              <div>
                <h4>María García</h4>
                <p className="text-sm text-[--color-text-light]">maria@email.com</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-[--color-primary] text-white'
                    : 'hover:bg-[--color-accent]'
                }`}
              >
                <Package className="w-5 h-5" />
                Mis pedidos
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'favorites'
                    ? 'bg-[--color-primary] text-white'
                    : 'hover:bg-[--color-accent]'
                }`}
              >
                <Heart className="w-5 h-5" />
                Favoritos
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-[--color-primary] text-white'
                    : 'hover:bg-[--color-accent]'
                }`}
              >
                <Settings className="w-5 h-5" />
                Configuración
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                <LogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div>
              <h2 className="mb-6">Historial de Pedidos</h2>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-[--color-border] rounded-lg p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="mb-1">Pedido #{order.id}</p>
                        <p className="text-sm text-[--color-text-light]">
                          Realizado el {new Date(order.date).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm ${
                          order.status === 'Entregado'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-[--color-border]">
                      <p className="text-sm">
                        {order.items} producto{order.items > 1 ? 's' : ''}
                      </p>
                      <p className="lg text-[--color-primary]">${order.total.toLocaleString('es-CO')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div>
              <h2 className="mb-6">Mis Favoritos</h2>
              <div className="text-center py-8">
                <p className="mb-4">Aún no tienes productos favoritos</p>
                <p className="text-sm text-[--color-text-light]">
                  Explora nuestros productos y añade tus preferidos
                </p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="mb-6">Configuración de Cuenta</h2>
              <div className="bg-white border border-[--color-border] rounded-lg p-6">
                <form className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm">Nombre completo</label>
                    <input
                      type="text"
                      defaultValue="María García"
                      className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Email</label>
                    <input
                      type="email"
                      defaultValue="maria@email.com"
                      className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                    />
                  </div>

                  <div className="pt-6 border-t border-[--color-border]">
                    <h3 className="mb-4">Dirección de Envío</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Calle y número"
                        className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Ciudad"
                          className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                        />
                        <input
                          type="text"
                          placeholder="Código postal"
                          className="w-full px-4 py-3 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[--color-primary] text-white rounded-lg hover:bg-[--color-primary-dark] transition-colors"
                  >
                    Guardar cambios
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}