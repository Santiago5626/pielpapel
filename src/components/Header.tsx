import { ShoppingBag, User, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const logo = "/logo.png";

interface HeaderProps {
  cartCount: number;
  onSearchClick: () => void;
  onCartClick: () => void;
}

export function Header({ cartCount, onSearchClick, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm">
      <div className="w-full px-4 lg:px-12 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Search & Menu */}
          {/* Left: Search, Menu & Logo */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <div className="flex items-center">
              <button
                onClick={onSearchClick}
                className="hidden md:block p-2 text-[--color-text] hover:bg-[--color-accent] rounded-full transition-colors"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                className="md:hidden p-2 text-[--color-text]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menú"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Piel Papel" className="w-8 h-8 object-contain" />
              <span className="text-lg tracking-[0.1em] uppercase whitespace-nowrap" style={{ fontFamily: 'var(--font-brand)', fontWeight: 700 }}>
                PIEL PAPEL
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-16 flex-1 justify-center">
            <Link
              to="/catalogo"
              className="py-3 px-6 text-base hover:text-[--color-primary] transition-all relative group cursor-pointer border-b-2 border-transparent hover:border-[--color-primary]"
            >
              Productos
            </Link>
            <Link
              to="/sobre-nosotros"
              className="py-3 px-6 text-base hover:text-[--color-primary] transition-all relative group cursor-pointer border-b-2 border-transparent hover:border-[--color-primary]"
            >
              Sobre Nosotros
            </Link>
            <Link
              to="/contacto"
              className="py-3 px-6 text-base hover:text-[--color-primary] transition-all relative group cursor-pointer border-b-2 border-transparent hover:border-[--color-primary]"
            >
              Contacto
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-6 md:gap-8 flex-shrink-0">
            <button
              onClick={onCartClick}
              className="relative p-3 hover:bg-[#FFE6F3] rounded-full transition-all hover:scale-105"
              aria-label="Carrito"
            >
              <ShoppingBag className="w-6 h-6 text-[#FF1493]" strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[22px] h-[22px] px-1.5 bg-[#FF1493] text-white text-xs font-bold flex items-center justify-center rounded-full shadow-lg ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              to="/perfil"
              className="hidden md:block p-2.5 hover:bg-[--color-accent] rounded-full transition-colors"
              aria-label="Perfil"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-6 pt-6 border-t border-[--color-border] space-y-4">
            <button
              className="flex items-center gap-2 w-full text-left py-2.5 hover:text-[--color-primary] transition-colors"
              onClick={() => {
                setIsMenuOpen(false);
                onSearchClick();
              }}
            >
              <Search className="w-5 h-5" />
              <span>Buscar</span>
            </button>
            <Link
              to="/catalogo"
              className="block py-2.5 hover:text-[--color-primary] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Productos
            </Link>
            <Link
              to="/perfil"
              className="block py-2.5 hover:text-[--color-primary] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Mi Perfil
            </Link>
            <Link
              to="/sobre-nosotros"
              className="block py-2.5 hover:text-[--color-primary] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nosotros
            </Link>
            <Link
              to="/contacto"
              className="block py-2.5 hover:text-[--color-primary] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}