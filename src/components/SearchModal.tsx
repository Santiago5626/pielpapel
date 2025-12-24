import { X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export function SearchModal({ isOpen, onClose, products }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = products.filter((product) => {
      const term = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.function.some((f) => f.toLowerCase().includes(term))
      );
    });

    setResults(filtered);
  }, [searchTerm, products]);

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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white max-w-2xl mx-auto mt-20 rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center gap-4 p-6 border-b border-[--color-border]">
            <Search className="w-5 h-5 text-[--color-text-light]" />
            <input
              type="text"
              placeholder="Buscar productos, marcas, categorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-lg"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-[--color-accent] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            {searchTerm === '' ? (
              <p className="text-center py-8">
                Escribe para buscar productos
              </p>
            ) : results.length === 0 ? (
              <p className="text-center py-8">
                No se encontraron resultados para "{searchTerm}"
              </p>
            ) : (
              <div className="space-y-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/producto/${product.id}`}
                    onClick={onClose}
                    className="flex gap-4 p-3 rounded-lg hover:bg-[--color-accent] transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-xs text-[--color-text-light] mb-1">
                        {product.brand}
                      </p>
                      <h4 className="mb-1">{product.name}</h4>
                      <p className="text-sm text-[--color-text-light] line-clamp-1">
                        {product.description}
                      </p>
                      <p className="mt-2 text-[--color-primary]">
                        ${product.price.toLocaleString('es-CO')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}