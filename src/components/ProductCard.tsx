import { Heart, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

export function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white rounded-lg overflow-hidden border border-[--color-border] hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="px-3 py-1 bg-[--color-primary] text-white text-xs tracking-wide rounded-full">
            Nuevo
          </span>
        )}
        {product.stock < 10 && (
          <span className="px-3 py-1 bg-[--color-secondary] text-white text-xs tracking-wide rounded-full">
            Últimas unidades
          </span>
        )}
      </div>

      {/* Favorite Button */}
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(product.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Añadir a favoritos"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-[--color-primary] text-[--color-primary]' : 'text-[--color-text]'}`}
          />
        </button>
      )}

      <Link to={`/producto/${product.id}`} className="block">
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-[--color-accent]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-[--color-text-light] mb-1 tracking-wide uppercase">
            {product.brand}
          </p>
          <h3 className="mb-2 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
          <p className="text-sm text-[--color-text-light] mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="mb-3">
            <span className="text-xl text-[--color-primary]">
              ${product.price.toLocaleString('es-CO')}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button - Outside Link */}
      <div className="px-4 pb-4">
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 px-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
            isAdding 
              ? 'bg-green-500 text-white' 
              : 'bg-[#FF1493] text-white hover:bg-[#D4116F]'
          }`}
          style={{ fontWeight: 500 }}
        >
          {isAdding ? (
            <>
              <Check className="w-5 h-5" />
              <span>Agregado</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>Agregar al carrito</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}