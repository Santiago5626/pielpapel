import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingBag, Heart, ChevronLeft, Info, Check } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useState } from 'react';
import { motion } from 'motion/react';

interface ProductPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductPage({ products, onAddToCart }: ProductPageProps) {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 text-center">
        <p className="mb-4">Producto no encontrado</p>
        <Link to="/catalogo" className="text-[--color-primary] hover:underline">
          Volver a productos
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm">
        <Link to="/" className="hover:text-[--color-primary]">
          Inicio
        </Link>
        <span>/</span>
        <Link to="/catalogo" className="hover:text-[--color-primary]">
          Productos
        </Link>
        <span>/</span>
        <span className="text-[--color-text-light]">{product.name}</span>
      </nav>

      <Link
        to="/catalogo"
        className="inline-flex items-center gap-2 mb-6 text-[--color-primary] hover:gap-3 transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
        Volver a productos
      </Link>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="aspect-square rounded-2xl overflow-hidden bg-[--color-accent]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-[--color-text-light] mb-2 tracking-wide uppercase">
            {product.brand}
          </p>
          <h1 className="mb-4">{product.name}</h1>
          <p className="text-3xl text-[--color-primary] mb-6">${product.price.toLocaleString('es-CO')}</p>

          <div className="mb-6 pb-6 border-b border-[--color-border]">
            <p className="mb-4">{product.description}</p>
            <div className="flex flex-wrap gap-2">
              {product.function.map((func) => (
                <span
                  key={func}
                  className="px-3 py-1 bg-[--color-accent] text-sm rounded-full"
                >
                  {func}
                </span>
              ))}
            </div>
          </div>

          {/* Stock Info */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>
                  {product.stock < 10
                    ? `Solo quedan ${product.stock} unidades`
                    : 'En stock'}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Agotado</span>
              </div>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center border border-[--color-border] rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-[--color-accent] transition-colors"
              >
                -
              </button>
              <span className="px-6 py-3 border-x border-[--color-border]">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 hover:bg-[--color-accent] transition-colors"
              >
                +
              </button>
            </div>
            <motion.button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 px-6 py-3 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                isAdding
                  ? 'bg-green-500 text-white'
                  : 'bg-[--color-primary] text-white hover:bg-[--color-primary-dark]'
              }`}
            >
              {isAdding ? (
                <>
                  <Check className="w-5 h-5" />
                  ¡Agregado!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Añadir al carrito
                </>
              )}
            </motion.button>
          </div>

          <button className="w-full px-6 py-3 border border-[--color-border] rounded-lg hover:bg-[--color-accent] transition-colors flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" />
            Añadir a favoritos
          </button>

          {/* Info Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Todos nuestros productos son importados directamente desde Corea del Sur y cumplen
              con los estándares de calidad internacionales.
            </p>
          </div>
        </div>
      </div>

      {/* Details Tabs */}
      <div className="mb-16">
        <div className="border border-[--color-border] rounded-lg overflow-hidden">
          <details className="group" open>
            <summary className="px-6 py-4 cursor-pointer hover:bg-[--color-accent] transition-colors">
              <h3 className="inline">Beneficios</h3>
            </summary>
            <div className="px-6 pb-4 border-t border-[--color-border]">
              <ul className="space-y-2 mt-4">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[--color-primary] mt-1">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <details className="group">
            <summary className="px-6 py-4 cursor-pointer hover:bg-[--color-accent] transition-colors border-t border-[--color-border]">
              <h3 className="inline">Ingredientes</h3>
            </summary>
            <div className="px-6 pb-4 border-t border-[--color-border]">
              <ul className="space-y-1 mt-4">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm">
                    • {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </details>

          <details className="group">
            <summary className="px-6 py-4 cursor-pointer hover:bg-[--color-accent] transition-colors border-t border-[--color-border]">
              <h3 className="inline">Modo de Uso</h3>
            </summary>
            <div className="px-6 pb-4 border-t border-[--color-border]">
              <p className="mt-4">{product.usage}</p>
            </div>
          </details>

          <details className="group">
            <summary className="px-6 py-4 cursor-pointer hover:bg-[--color-accent] transition-colors border-t border-[--color-border]">
              <h3 className="inline">Tipo de Piel</h3>
            </summary>
            <div className="px-6 pb-4 border-t border-[--color-border]">
              <div className="flex flex-wrap gap-2 mt-4">
                {product.skinType.map((type) => (
                  <span key={type} className="px-3 py-1 bg-[--color-accent] text-sm rounded-full">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="mb-6">También te puede interesar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}