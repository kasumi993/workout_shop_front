export default function ProductOptions({ product, selectedProperties, handlePropertyChange }) {
    return (
        <div>
           {product.properties && Object.keys(product.properties).length > 0 && (
                  <div className="py-6 mb-6 space-y-4">
                    {Object.entries(product.properties).map(([propertyName, values]) => (
                      <div key={propertyName}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {propertyName.charAt(0).toUpperCase() + propertyName.slice(1)}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(values) && values.map((value) => (
                            <button
                              key={value}
                              onClick={() => handlePropertyChange(propertyName, value)}
                              className={`px-4 py-2 border rounded-md transition-all ${
                                selectedProperties[propertyName] === value
                                  ? 'border-gray-900 bg-gray-900 text-white'
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
            )}
        </div>
    )
}