import { HiOutlineMagnifyingGlass, HiXMark } from "react-icons/hi2";

export default function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="flex-1">
            <div className="flex items-center rounded px-3 py-1 focus-within:ring-1 focus-within:ring-blue-300 h-[54px] justify-center rounded-lg border border-solid border-gray-300 text-[21px]">
                <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-0 border-0 bg-transparent"
                />
                <span className="ml-2 text-gray-500">
                {searchQuery ? (
                    <HiXMark onClick={() => setSearchQuery('')} />
                ) : (
                        <HiOutlineMagnifyingGlass />
                        
                )}
                </span>
            </div>
        </div>
    )
}