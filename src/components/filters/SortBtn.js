import { HiChevronDown, HiAdjustmentsHorizontal } from 'react-icons/hi2';

export default function SortBtn({ sortBy, setSortBy }) {
    const sortOptions = [
        { value: 'featured', label: 'Populaire' },
        { value: 'price-asc', label: 'Prix croissant' },
        { value: 'price-desc', label: 'Prix décroissant' },
        { value: 'name', label: 'Nom (A-Z)' }
    ];

    return (
        <div className='flex'>
            <div className="flex items-center bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus-within:ring-1 focus-within:ring-transparent transition-all duration-200">
                {/* Sort Icon */}
                <div className="flex items-center pl-3">
                    <HiAdjustmentsHorizontal className="h-4 w-4 text-gray-500" />
                </div>
                
                {/* Select */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent border-0 py-2.5 pl-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none cursor-pointer min-w-[140px]"
                >
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                
                {/* Arrow Icon */}
                <div className="flex items-center pr-3">
                    <HiChevronDown className="h-4 w-4 text-gray-500" />
                </div>
            </div>
        </div>
    );
}