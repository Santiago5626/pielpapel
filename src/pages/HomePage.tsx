import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Heart, Leaf } from 'lucide-react';
import { Product } from '../types';
import { ProductCarousel } from '../components/ProductCarousel';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface HomePageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function HomePage({ products, onAddToCart }: HomePageProps) {
  const bestSellerProducts = products.filter((p) => p.isBestSeller);

  // Carousel images
  const carouselImages = [
    'https://images.unsplash.com/photo-1741896136069-f3588d8993b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBza2luY2FyZSUyMHJvdXRpbmV8ZW58MXx8fHwxNzY2NTE5MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1629380106682-6736d2c327ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc2NjUxOTE2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1634449277883-534da4f7c97a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMGNyZWFtJTIwamFyfGVufDF8fHx8MTc2NjQ3ODkxNHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlfGVufDF8fHx8MTc2NjQ2NTk0OXww&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section - SECCIÓN 1 */}
      <section className="py-8 mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 to-white/20 -z-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">

            {/* Texto Hero */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1 flex flex-col items-start"
            >
              <h1 className="mb-6 text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-[--color-text] leading-[1.1]">
                Transforma tu <br />
                rutina en <span className="font-serif italic text-[--color-primary]">ritual</span>
              </h1>
              <p className="mb-8 text-lg text-gray-600 max-w-md leading-relaxed">
                Descubre la pureza de la cosmética coreana. Ingredientes naturales y tecnología avanzada para una piel radiante.
              </p>
              <Link
                to="/catalogo"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-[--color-text] px-8 font-medium text-white transition-all duration-300 hover:bg-[--color-primary] hover:scale-105 hover:shadow-lg hover:shadow-pink-200"
              >
                <span className="mr-2">Explorar productos</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Imagen / Carrusel Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 md:order-2 relative"
            >
              {/* Decorative elements behind */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-pink-200/40 to-transparent rounded-[2.5rem] blur-xl opacity-70" />

              <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-[2rem] overflow-hidden shadow-2xl shadow-pink-100/50 bg-white">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={carouselImages[currentImageIndex]}
                    alt="Cosmética coreana ambiente"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle overlay gradient inside image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-60" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features - SECCIÓN 2 */}
      <section className="py-8 mb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <h4 className="mb-3 text-center flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-[--color-primary]" />
                Productos Auténticos
              </h4>
              <p className="text-sm text-center text-[--color-text-light] leading-relaxed">
                Importados directamente desde Corea del Sur, garantizando autenticidad y calidad en cada producto.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <h4 className="mb-3 text-center flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-[--color-primary]" />
                Cuidado Personal
              </h4>
              <p className="text-sm text-center text-[--color-text-light] leading-relaxed">
                Asesoramiento personalizado para encontrar los productos perfectos para tu tipo de piel.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <h4 className="mb-3 text-center flex items-center justify-center gap-2">
                <Leaf className="w-5 h-5 text-[--color-primary]" />
                Ingredientes Naturales
              </h4>
              <p className="text-sm text-center text-[--color-text-light] leading-relaxed">
                Fórmulas con ingredientes naturales y tecnología avanzada para resultados visibles.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best Sellers Carousel - SECCIÓN 3 */}
      <section className="py-8 mb-12 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-8">
            <h2 className="text-center mb-2">Más vendidos</h2>
          </div>

          <ProductCarousel products={bestSellerProducts} onAddToCart={onAddToCart} />
        </div>
      </section>
    </div>
  );
}