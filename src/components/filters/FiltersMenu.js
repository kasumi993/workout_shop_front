import { useCategoriesFormatted } from '@/hooks/useCategoriesFormatted';

export default function FiltersMenu({
  selectedCategory, 
  setSelectedCategory, 
  priceRange, 
  setPriceRange, 
  onResetFilters
}) {
  const { categories, loading: categoriesLoading } = useCategoriesFormatted('hierarchical', true);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800 text-base border-b border-gray-100 pb-2">
            Catégories
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <label className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="radio"
                name="category"
                value="all"
                checked={selectedCategory === 'all'}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2 mr-3"
              />
              <span className="text-sm font-medium text-gray-700">Tous les produits</span>
            </label>
            {categories.map(cat => (
              <div key={cat.id} className="space-y-1">
                {/* Parent Category Header */}
                {cat.isParent && (
                  <div className="flex items-center p-2 bg-gray-50 rounded-md">
                    <span className="text-sm font-semibold text-gray-800 flex-1">{cat.name}</span>
                  </div>
                )}
                
                {/* Child Categories or Regular Categories */}
                {cat.children ? (
                  <div className="ml-4 space-y-1">
                    {cat.children.map(child => (
                      <label key={child.id} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="category"
                          value={child.id}
                          checked={selectedCategory === child.id}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2 mr-3"
                        />
                        <span className="text-sm text-gray-700 flex-1">{child.name}</span>
                      </label>
                    ))}
                  </div>
                ) : !cat.isParent && (
                  <label className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="category"
                      value={cat.id}
                      checked={selectedCategory === cat.id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2 mr-3"
                    />
                    <span className="text-sm text-gray-700 flex-1">{cat.name}</span>
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800 text-base border-b border-gray-100 pb-2">
            Gamme de prix
          </h3>
          <div className="space-y-4 pt-2">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(priceRange.max / 100000) * 100}%, #e5e7eb ${(priceRange.max / 100000) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                0 FCFA
              </span>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {priceRange.max.toLocaleString('fr-FR')} FCFA
              </span>
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        <div className="flex flex-col justify-end space-y-3">
          <div className="lg:hidden">
            <h3 className="font-semibold text-gray-800 text-base border-b border-gray-100 pb-2">
              Actions
            </h3>
          </div>
          <button
            onClick={onResetFilters}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Réinitialiser les filtres
          </button>
        </div>
      </div>
      
      {/* Custom CSS for the range slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: 2px solid white;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: 2px solid white;
        }
        
        .slider:focus {
          outline: none;
        }
        
        .slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  )
}