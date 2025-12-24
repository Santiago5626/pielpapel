import { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Filter, X } from 'lucide-react';

interface CatalogPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ACIDS = [
  'Ácido Hialurónico',
  'Niacinamida',
  'Vitamina C',
  'Ácido Tranexámico',
  'AHA (Ácido Glicólico)',
  'BHA (Ácido Salicílico)',
];

const EXTRACTS = [
  'Centella Asiática',
  'Artemisa',
  'Hoja de Corazón', // Houttuynia Cordata
  'Propóleo',
  'Soja Fermentada',
  'Galactomyces',
];

export function CatalogPage({ products, onAddToCart }: CatalogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFunction, setSelectedFunction] = useState<string>('');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats);
  }, [products]);

  const functions = useMemo(() => {
    const funcs = new Set(products.flatMap((p) => p.function));
    return Array.from(funcs);
  }, [products]);

  const skinTypes = useMemo(() => {
    const types = new Set(products.flatMap((p) => p.skinType));
    return Array.from(types);
  }, [products]);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedFunction) {
      filtered = filtered.filter((p) => p.function.includes(selectedFunction));
    }

    if (selectedSkinType) {
      filtered = filtered.filter((p) => p.skinType.includes(selectedSkinType));
    }

    if (selectedIngredients.length > 0) {
      filtered = filtered.filter((p) =>
        selectedIngredients.some((ing) => {
          // Búsqueda flexible para matchear ingredientes parciales (ej: "Centella" en "Centella Asiática de Jeju")
          return p.ingredients.some(productIng => productIng.includes(ing) || ing.includes(productIng));
        })
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'new') {
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return filtered;
  }, [products, selectedCategory, selectedFunction, selectedSkinType, selectedIngredients, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedFunction('');
    setSelectedSkinType('');
    setSelectedIngredients([]);
    setSortBy('');
  };

  const hasActiveFilters = selectedCategory || selectedFunction || selectedSkinType || selectedIngredients.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
      <div className="mb-8">
        <h1 className="mb-2">Nuestros Productos</h1>
        <p>Descubre toda nuestra colección de cosmética coreana</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters - Desktop */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3>Filtros</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-[--color-primary] hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="mb-2 text-sm font-medium">Categoría</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer hover:text-[--color-primary] transition-colors">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="accent-[--color-primary]"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ingredients Filters - ACIDS */}
            <div>
              <h4 className="mb-2 text-sm font-medium">Ácidos e Ingredientes Activos</h4>
              <div className="space-y-2">
                {ACIDS.map((acid) => (
                  <label key={acid} className="flex items-center gap-2 cursor-pointer hover:text-[--color-primary] transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(acid)}
                      onChange={() => toggleIngredient(acid)}
                      className="accent-[--color-primary] rounded"
                    />
                    <span className="text-sm">{acid}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ingredients Filters - EXTRACTS */}
            <div>
              <h4 className="mb-2 text-sm font-medium">Extractos Naturales</h4>
              <div className="space-y-2">
                {EXTRACTS.map((extract) => (
                  <label key={extract} className="flex items-center gap-2 cursor-pointer hover:text-[--color-primary] transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(extract)}
                      onChange={() => toggleIngredient(extract)}
                      className="accent-[--color-primary] rounded"
                    />
                    <span className="text-sm">{extract}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Function Filter */}
            <div>
              <h4 className="mb-2 text-sm font-medium">Función</h4>
              <div className="space-y-2">
                {functions.map((func) => (
                  <label key={func} className="flex items-center gap-2 cursor-pointer hover:text-[--color-primary] transition-colors">
                    <input
                      type="radio"
                      name="function"
                      checked={selectedFunction === func}
                      onChange={() => setSelectedFunction(func)}
                      className="accent-[--color-primary]"
                    />
                    <span className="text-sm">{func}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Skin Type Filter */}
            <div>
              <h4 className="mb-2 text-sm font-medium">Tipo de Piel</h4>
              <div className="space-y-2">
                {skinTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer hover:text-[--color-primary] transition-colors">
                    <input
                      type="radio"
                      name="skinType"
                      checked={selectedSkinType === type}
                      onChange={() => setSelectedSkinType(type)}
                      className="accent-[--color-primary]"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filters Toggle & Sort */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[--color-border] rounded-lg text-sm"
            >
              <Filter className="w-4 h-4" />
              Filtros
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-[--color-primary] rounded-full"></span>
              )}
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-[--color-border] rounded-lg outline-none focus:border-[--color-primary] text-sm bg-transparent"
            >
              <option value="">Ordenar por</option>
              <option value="new">Novedades</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mb-6 p-4 bg-white border border-[--color-border] rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4>Filtros</h4>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Ingredients */}
              <div>
                <h4 className="mb-2 text-sm font-medium">Ingredientes</h4>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 mb-1">Ácidos y Activos</p>
                  {ACIDS.map((acid) => (
                    <label key={acid} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedIngredients.includes(acid)}
                        onChange={() => toggleIngredient(acid)}
                        className="accent-[--color-primary] rounded"
                      />
                      <span className="text-sm">{acid}</span>
                    </label>
                  ))}
                  <p className="text-xs text-gray-500 mt-3 mb-1">Extractos Naturales</p>
                  {EXTRACTS.map((extract) => (
                    <label key={extract} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedIngredients.includes(extract)}
                        onChange={() => toggleIngredient(extract)}
                        className="accent-[--color-primary] rounded"
                      />
                      <span className="text-sm">{extract}</span>
                    </label>
                  ))}
                </div>
              </div>


              <div>
                <h4 className="mb-2 text-sm font-medium">Categoría</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${selectedCategory === category
                        ? 'bg-[--color-primary] text-white border-[--color-primary]'
                        : 'border-[--color-border] hover:border-[--color-primary]'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-medium">Función</h4>
                <div className="flex flex-wrap gap-2">
                  {functions.map((func) => (
                    <button
                      key={func}
                      onClick={() => setSelectedFunction(selectedFunction === func ? '' : func)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${selectedFunction === func
                        ? 'bg-[--color-primary] text-white border-[--color-primary]'
                        : 'border-[--color-border] hover:border-[--color-primary]'
                        }`}
                    >
                      {func}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-medium">Tipo de Piel</h4>
                <div className="flex flex-wrap gap-2">
                  {skinTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedSkinType(selectedSkinType === type ? '' : type)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${selectedSkinType === type
                        ? 'bg-[--color-primary] text-white border-[--color-primary]'
                        : 'border-[--color-border] hover:border-[--color-primary]'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-sm text-[--color-primary] border border-[--color-primary] rounded-lg hover:bg-[--color-primary] hover:text-white transition-colors"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}

          {/* Results Count */}
          <p className="mb-6 text-sm text-[--color-text-light]">
            Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
          </p>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <div className="max-w-md mx-auto">
                <p className="mb-4 text-gray-500">No encontramos productos que coincidan con tus filtros.</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-[--color-primary] text-white rounded-lg hover:bg-[--color-primary-dark] transition-colors"
                >
                  Ver todos los productos
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}