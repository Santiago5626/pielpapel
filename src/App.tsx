import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { CartSidebar } from './components/CartSidebar';
import { LoadingAnimation } from './components/LoadingAnimation';
import { FloatingHelpButton } from './components/FloatingHelpButton';
import { PromoBanner } from './components/PromoBanner';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { products } from './data/products';
import { Product, CartItem } from './types';
import { Toaster, toast } from "sonner";
import './styles/globals.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        toast.success('Producto actualizado', {
          description: `${product.name} - Cantidad: ${existingItem.quantity + 1}`,
          duration: 2000,
        });
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success('¡Agregado al carrito!', {
        description: product.name,
        duration: 2000,
        action: {
          label: 'Ver carrito',
          onClick: () => setIsCartOpen(true),
        },
      });
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <PromoBanner />
        <Header
          cartCount={cartCount}
          onSearchClick={() => setIsSearchOpen(true)}
          onCartClick={() => setIsCartOpen(true)}
        />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<HomePage products={products} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/catalogo"
              element={<CatalogPage products={products} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/producto/:id"
              element={<ProductPage products={products} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/checkout"
              element={<CheckoutPage items={cartItems} onClearCart={handleClearCart} />}
            />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/favoritos" element={<ProfilePage />} />
            <Route path="/sobre-nosotros" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/politicas/*" element={<div className="max-w-4xl mx-auto px-6 py-12"><h1 className="mb-4">Política</h1><p>Contenido de la política...</p></div>} />
          </Routes>
        </main>

        <Footer />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={products}
        />

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />

        <FloatingHelpButton visible={!isCartOpen} />

        <Toaster
          position="bottom-right"
          richColors
          toastOptions={{
            style: {
              background: 'white',
              border: '1px solid #F0F0F0',
            },
          }}
        />
      </div>
    </Router>
  );
}