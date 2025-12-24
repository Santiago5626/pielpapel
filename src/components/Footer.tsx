import { Instagram, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
const logo = "/logo.png";

export function Footer() {
  return (
    <footer className="bg-[#FAFAFA] mt-auto border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Piel Papel" className="w-8 h-8 object-contain" />
              <span className="tracking-[0.2em] uppercase text-lg" style={{ fontFamily: 'var(--font-brand)', fontWeight: 700 }}>
                PIEL PAPEL
              </span>
            </div>
            <p className="text-xs text-[--color-text-light] leading-relaxed">
              Cosmética coreana auténtica para revelar tu mejor piel.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/piel_papel/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-[--color-text-light] hover:text-[--color-primary] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-[--color-text-light] hover:text-[--color-primary] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:hola@pielpapel.com"
                className="p-1.5 text-[--color-text-light] hover:text-[--color-primary] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-medium mb-4 text-sm">Explorar</h4>
            <ul className="space-y-2 text-xs text-[--color-text-light]">
              <li><Link to="/catalogo" className="hover:text-[--color-primary] transition-colors">Todos los productos</Link></li>
              <li><Link to="/catalogo" className="hover:text-[--color-primary] transition-colors">Cuidado facial</Link></li>
              <li><Link to="/catalogo" className="hover:text-[--color-primary] transition-colors">Más vendidos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-sm">Compañía</h4>
            <ul className="space-y-2 text-xs text-[--color-text-light]">
              <li><Link to="/sobre-nosotros" className="hover:text-[--color-primary] transition-colors">Sobre Nosotros</Link></li>
              <li><Link to="/contacto" className="hover:text-[--color-primary] transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-sm">Ayuda</h4>
            <ul className="space-y-2 text-xs text-[--color-text-light]">
              <li><Link to="/faq" className="hover:text-[--color-primary] transition-colors">Preguntas frecuentes</Link></li>
              <li><Link to="/envios" className="hover:text-[--color-primary] transition-colors">Envíos y devoluciones</Link></li>
              <li><Link to="/terminos" className="hover:text-[--color-primary] transition-colors">Términos y condiciones</Link></li>
              <li><Link to="/privacidad" className="hover:text-[--color-primary] transition-colors">Política de privacidad</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[--color-text-light]">
            &copy; {new Date().getFullYear()} Piel Papel. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}