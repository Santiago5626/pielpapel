import { Heart, Globe, Award, Users } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="mb-6">Sobre Piel Papel</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Somos una tienda especializada en cosmética coreana auténtica, dedicada a traerte lo mejor
          del K-Beauty para que descubras el secreto de una piel radiante y saludable.
        </p>
      </div>

      {/* Story */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[--color-primary-light] to-[--color-accent]">
          <img
            src="https://images.unsplash.com/photo-1708477199100-e4d5f56a8eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBza2luY2FyZSUyMGNyZWFtfGVufDF8fHx8MTc2NjUxNTE3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Productos de cosmética coreana"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="mb-4">Nuestra Historia</h2>
          <p className="mb-4">
            Piel Papel nació de la pasión por la cosmética coreana y el deseo de compartir sus
            increíbles beneficios. Inspirados por la filosofía coreana del cuidado de la piel, que
            prioriza la prevención y el cuidado diario, decidimos crear un espacio donde todos
            pudieran acceder a productos auténticos y de alta calidad.
          </p>
          <p className="mb-4">
            Trabajamos directamente con marcas reconocidas en Corea del Sur para garantizar que cada
            producto que ofrecemos sea genuino y cumpla con los más altos estándares de calidad.
          </p>
          <p>
            Nuestro nombre, "Piel Papel", representa nuestra visión: una piel tan suave, radiante y
            perfecta como una hoja de papel en blanco, lista para ser cuidada con los mejores
            ingredientes.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-center mb-12">Nuestros Valores</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[--color-primary]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[--color-primary]" />
            </div>
            <h4 className="mb-2">Pasión</h4>
            <p className="text-sm">
              Amamos lo que hacemos y nos dedicamos a ofrecer lo mejor del K-Beauty.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[--color-primary]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-[--color-primary]" />
            </div>
            <h4 className="mb-2">Calidad</h4>
            <p className="text-sm">
              Solo productos auténticos de marcas reconocidas y confiables.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[--color-primary]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-[--color-primary]" />
            </div>
            <h4 className="mb-2">Autenticidad</h4>
            <p className="text-sm">
              Importación directa desde Corea del Sur garantizando originalidad.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[--color-primary]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[--color-primary]" />
            </div>
            <h4 className="mb-2">Comunidad</h4>
            <p className="text-sm">
              Creamos una comunidad de amantes del skincare que comparten experiencias.
            </p>
          </div>
        </div>
      </div>

      {/* K-Beauty Philosophy */}
      <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-8 md:p-12">
        <h2 className="text-center mb-8">La Filosofía del K-Beauty</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="mb-3">Prevención sobre Corrección</h4>
            <p className="text-sm">
              El skincare coreano se enfoca en prevenir problemas antes de que aparezcan, no solo en
              tratarlos.
            </p>
          </div>
          <div>
            <h4 className="mb-3">Capas de Hidratación</h4>
            <p className="text-sm">
              La famosa rutina de 10 pasos se basa en aplicar múltiples capas de productos ligeros
              para una hidratación óptima.
            </p>
          </div>
          <div>
            <h4 className="mb-3">Ingredientes Naturales</h4>
            <p className="text-sm">
              Uso de ingredientes naturales combinados con tecnología avanzada para resultados
              efectivos y seguros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}