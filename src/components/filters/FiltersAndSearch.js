import { useState } from "react"
import Button from "../globalComponents/Button"
import SearchBar from "./SearchBar"
import FiltersMenu from "./FiltersMenu";
import SortBtn from "./SortBtn";
import { HiOutlineFunnel } from "react-icons/hi2";

export default function FiltersAndSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);




  return (
    <div className="mb-25">
    {/* Search and Filter Bar */}
      <div className="w-full bg-white rounded-lg shadow-sm p-4 ">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button className="px-5 py-4 rounded-lg bg-black text-white cursor-pointer">
            Tous les produits
          </Button>
          {/* Search */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Sort */}
          <SortBtn sortBy={sortBy} setSortBy={setSortBy} />

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            <HiOutlineFunnel />
            Filtres
            {(selectedCategory !== 'all' || priceRange.max < 100000) && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {[selectedCategory !== 'all', priceRange.max < 100000].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <FiltersMenu 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            priceRange={priceRange} 
            setPriceRange={setPriceRange} 
            setSearchQuery={setSearchQuery} 
          />
        )}
      </div>
    </div>
  )
}