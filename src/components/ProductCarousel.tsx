import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface ProductCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductCarousel({ products, onAddToCart }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [addingProduct, setAddingProduct] = useState<string | null>(null);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingProduct(product.id);
    onAddToCart(product);
    setTimeout(() => setAddingProduct(null), 1000);
  };

  return (
    <div className="relative">
      <div 
        ref={scrollContainerRef}
        onScroll={checkScrollPosition}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {products.map((product) => {
          const isAdding = addingProduct === product.id;
          
          return (
            <motion.div 
              key={product.id} 
              className="flex-none w-[280px] md:w-[300px]"
              style={{ scrollSnapAlign: 'start' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                <Link to={`/producto/${product.id}`}>
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                
                <div className="p-5 flex flex-col flex-grow">
                  <Link to={`/producto/${product.id}`} className="flex-grow">
                    <p className="text-xs text-[--color-text-light] mb-1 uppercase tracking-wide">{product.brand}</p>
                    <h4 className="mb-2 line-clamp-2 min-h-[3rem]">{product.name}</h4>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl text-[--color-primary]">
                        ${product.price.toLocaleString('es-CO')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice.toLocaleString('es-CO')}
                        </span>
                      )}
                    </div>
                  </Link>
                  
                  <motion.button
                    onClick={(e) => handleAddToCart(product, e)}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-2.5 px-4 rounded-full transition-all flex items-center justify-center gap-2 text-sm ${
                      isAdding 
                        ? 'bg-green-500 text-white' 
                        : 'bg-[#FF1493] text-white hover:bg-[#D4116F]'
                    }`}
                  >
                    {isAdding ? (
                      <>
                        <Check className="w-4 h-4" />
                        Agregado
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Agregar al carrito
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 text-[--color-primary]" />
        </button>
      )}
      
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6 text-[--color-primary]" />
        </button>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}