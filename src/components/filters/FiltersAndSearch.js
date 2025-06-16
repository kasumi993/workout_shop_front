import { useState, useCallback, useEffect } from "react";
import { useRouter } from 'next/router';
import Button from "../globalComponents/Button";
import SearchBar from "./SearchBar";
import FiltersMenu from "./FiltersMenu";
import SortBtn from "./SortBtn";
import { HiOutlineFunnel } from "react-icons/hi2";
import { useDebounce } from '@/hooks/useDebounce';

const DEFAULT_PARAMS = {
  page: 1,
  limit: 12,
  search: '',
  category: 'all',
  minPrice: 0,
  maxPrice: 100000,
  sortBy: 'featured'
};

export default function FiltersAndSearch({
  onFiltersChange,
  hideAllProductsBtn = false,
  initialFilters = {},
  availableFilters = null
}) {
  const router = useRouter();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(initialFilters.search || '');
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || 'all');
  const [priceRange, setPriceRange] = useState({
    min: initialFilters.minPrice || 0,
    max: initialFilters.maxPrice || 100000
  });
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || 'featured');
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Calculate active filters count
  const activeFiltersCount = [
    selectedCategory !== 'all',
    priceRange.max < 100000 || priceRange.min > 0,
    debouncedSearchQuery && debouncedSearchQuery.length > 0
  ].filter(Boolean).length;

  const hasActiveFilters = activeFiltersCount > 0;

  // Build filter parameters
  const buildFilterParams = useCallback(() => {
    const params = {
      page: 1, // Reset to first page when filters change
      limit: 12,
      sortBy
    };

    if (debouncedSearchQuery) {
      params.search = debouncedSearchQuery;
    }

    if (selectedCategory && selectedCategory !== 'all') {
      params.category = selectedCategory;
    }

    if (priceRange.min > 0) {
      params.minPrice = priceRange.min;
    }

    if (priceRange.max < 100000) {
      params.maxPrice = priceRange.max;
    }

    return params;
  }, [debouncedSearchQuery, selectedCategory, priceRange, sortBy]);

  // Handle filter changes
  useEffect(() => {
    const params = buildFilterParams();
    onFiltersChange?.(params, hasActiveFilters);
    
    // Update URL parameters (optional, for SEO and bookmarking)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      
      // Clear existing params
      ['search', 'category', 'minPrice', 'maxPrice', 'sortBy', 'page'].forEach(key => {
        url.searchParams.delete(key);
      });
      
      // Add new params
      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== DEFAULT_PARAMS[key]) {
          url.searchParams.set(key, value.toString());
        }
      });
      
      // Update URL without page reload
      window.history.replaceState({}, '', url.pathname + url.search);
    }
  }, [buildFilterParams, hasActiveFilters, onFiltersChange]);

  // Initialize from URL parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      
      const search = urlParams.get('search') || '';
      const category = urlParams.get('category') || 'all';
      const minPrice = parseInt(urlParams.get('minPrice')) || 0;
      const maxPrice = parseInt(urlParams.get('maxPrice')) || 100000;
      const sortByParam = urlParams.get('sortBy') || 'featured';
      
      setSearchQuery(search);
      setSelectedCategory(category);
      setPriceRange({ min: minPrice, max: maxPrice });
      setSortBy(sortByParam);
    }
  }, []);

  const handleResetFilters = useCallback(() => {
    setSelectedCategory('all');
    setPriceRange({ min: 0, max: 100000 });
    setSearchQuery('');
    setSortBy('featured');
    
    // Clear URL parameters
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      ['search', 'category', 'minPrice', 'maxPrice', 'sortBy', 'page'].forEach(key => {
        url.searchParams.delete(key);
      });
      window.history.replaceState({}, '', url.pathname);
    }
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  return (
    <div className="mb-4 lg:mb-6">
      <div className="w-full bg-white rounded-lg shadow-sm p-3 sm:p-4">
        <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-0 md:flex-row md:gap-4 justify-center">
          <Button className={`hidden md:flex px-3 sm:px-5 py-2 sm:py-4 rounded-lg bg-black text-white cursor-pointer text-sm sm:text-base whitespace-nowrap ${hideAllProductsBtn ? 'md:hidden' : ''}`}>
            Tous les produits
          </Button>

          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />

          <div className="flex gap-2 sm:gap-4">
            <SortBtn 
              sortBy={sortBy} 
              setSortBy={setSortBy} 
              className="flex-1 sm:flex-initial" 
            />

            <button
              onClick={toggleFilters}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200 text-xs sm:text-sm whitespace-nowrap"
              aria-label={`${showFilters ? 'Hide' : 'Show'} filters`}
            >
              <HiOutlineFunnel className="text-sm sm:text-base" />
              <span className="hidden sm:inline">Filtres</span>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full min-w-[16px] h-4 sm:h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {showFilters && (
          <FiltersMenu
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onResetFilters={handleResetFilters}
            availableFilters={availableFilters}
          />
        )}
      </div>
    </div>
  );
}
