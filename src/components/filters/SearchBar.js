import { HiOutlineMagnifyingGlass, HiXMark } from "react-icons/hi2";

export default function SearchBar({ searchQuery, setSearchQuery, className = "" }) {
    return (
        <div className={`flex-1 min-w-0 ${className}`}>
            <div className="flex items-center rounded-lg px-3 py-2 sm:py-3 focus-within:ring-2 focus-within:ring-blue-300 h-10 sm:h-12 md:h-[54px] justify-center border border-solid border-gray-300 text-base sm:text-lg md:text-[21px]">
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 outline-0 border-0 bg-transparent text-sm sm:text-base placeholder-gray-500"
                />
                <span className="ml-2 text-gray-500 flex-shrink-0">
                    {searchQuery ? (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="p-1 hover:text-gray-700 transition-colors"
                        >
                            <HiXMark className="text-lg sm:text-xl" />
                        </button>
                    ) : (
                        <HiOutlineMagnifyingGlass className="text-lg sm:text-xl" />
                    )}
                </span>
            </div>
        </div>
    )
}