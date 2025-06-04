export default function ProductOptions({ product, selectedProperties, handlePropertyChange }) {
    return (
        <div>
           {product.properties && Object.keys(product.properties).length > 0 && (
                <div className="py-4 sm:py-6 space-y-4 sm:space-y-6">
                    {Object.entries(product.properties).map(([propertyName, values]) => (
                        <div key={propertyName}>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                                {propertyName.charAt(0).toUpperCase() + propertyName.slice(1)}
                            </label>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {Array.isArray(values) && values.map((value) => (
                                    <button
                                        key={value}
                                        onClick={() => handlePropertyChange(propertyName, value)}
                                        className={`px-3 sm:px-4 py-2 sm:py-3 border rounded-md transition-all text-sm sm:text-base font-medium min-w-[60px] sm:min-w-[80px] text-center ${
                                            selectedProperties[propertyName] === value
                                                ? 'border-gray-900 bg-gray-900 text-white shadow-md'
                                                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
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