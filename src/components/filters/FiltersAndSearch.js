import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import Button from "../globalComponents/Button";
import SearchBar from "./SearchBar";
import FiltersMenu from "./FiltersMenu";
import SortBtn from "./SortBtn";
import { HiOutlineFunnel } from "react-icons/hi2";

// Constants
const DEFAULT_PRICE_RANGE = { min: 0, max: 100000 };
const DEFAULT_CATEGORY = "all";
const DEFAULT_SORT = "featured";

// Utility functions
const filterByCategory = (products, category) => {
  if (category === DEFAULT_CATEGORY) return products;
  return products.filter((p) =>
    [p.category, p.categorySlug, p.parentCategorySlug].includes(category)
  );
};

const filterBySearch = (products, query) => {
  if (!query) return products;
  const lowerQuery = query.toLowerCase();
  return products.filter((p) =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
};

const filterByPrice = (products, range) => {
  return products.filter((p) => p.price >= range.min && p.price <= range.max);
};

const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
};

export default function FiltersAndSearch({
  products = [],
  setFilteredProducts = () => {},
  searchQuery: externalSearchQuery,
  setSearchQuery: externalSetSearchQuery,
  selectedCategory: externalSelectedCategory,
  setSelectedCategory: externalSetSelectedCategory,
  priceRange: externalPriceRange,
  setPriceRange: externalSetPriceRange,
  sortBy: externalSortBy,
  setSortBy: externalSetSortBy,
  hideAllProductsBtn = false
}) {
  // Use external state if provided, otherwise use internal state
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const [internalSelectedCategory, setInternalSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [internalPriceRange, setInternalPriceRange] = useState(DEFAULT_PRICE_RANGE);
  const [internalSortBy, setInternalSortBy] = useState(DEFAULT_SORT);
  const [showFilters, setShowFilters] = useState(false);

  // Track if we've set initial products to prevent clearing them
  const hasSetInitialProducts = useRef(false);

  // Determine which state to use
  const searchQuery = externalSearchQuery ?? internalSearchQuery;
  const selectedCategory = externalSelectedCategory ?? internalSelectedCategory;
  const priceRange = externalPriceRange ?? internalPriceRange;
  const sortBy = externalSortBy ?? internalSortBy;

  // Memoized handlers
  const handleSetSearchQuery = useCallback(
    (value) => {
      if (externalSetSearchQuery) {
        externalSetSearchQuery(value);
      } else {
        setInternalSearchQuery(value);
      }
    },
    [externalSetSearchQuery]
  );

  const handleSetSelectedCategory = useCallback(
    (value) => {
      if (externalSetSelectedCategory) {
        externalSetSelectedCategory(value);
      } else {
        setInternalSelectedCategory(value);
      }
    },
    [externalSetSelectedCategory]
  );

  const handleSetPriceRange = useCallback(
    (value) => {
      if (externalSetPriceRange) {
        externalSetPriceRange(value);
      } else {
        setInternalPriceRange(value);
      }
    },
    [externalSetPriceRange]
  );

  const handleSetSortBy = useCallback(
    (value) => {
      if (externalSetSortBy) {
        externalSetSortBy(value);
      } else {
        setInternalSortBy(value);
      }
    },
    [externalSetSortBy]
  );

  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    // Don't filter if products is empty
    if (!products || products.length === 0) {
      return [];
    }

    let filtered = filterByCategory(products, selectedCategory);
    filtered = filterBySearch(filtered, searchQuery);
    filtered = filterByPrice(filtered, priceRange);
    return sortProducts(filtered, sortBy);
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

    // Memoized active filters count
  const activeFiltersCount = useMemo(() => {
    const filters = [
      selectedCategory !== DEFAULT_CATEGORY,
      priceRange.max < DEFAULT_PRICE_RANGE.max || priceRange.min > DEFAULT_PRICE_RANGE.min,
      searchQuery && searchQuery.length > 0
    ];
    return filters.filter(Boolean).length;
  }, [selectedCategory, priceRange, searchQuery]);

  // Check if there are active filters
  const hasActiveFilters = activeFiltersCount > 0;

    // Reset all filters function
  const handleResetFilters = useCallback(() => {
    handleSetSelectedCategory(DEFAULT_CATEGORY);
    handleSetPriceRange(DEFAULT_PRICE_RANGE);
    handleSetSearchQuery('');
    handleSetSortBy(DEFAULT_SORT);
  }, [handleSetSelectedCategory, handleSetPriceRange, handleSetSearchQuery, handleSetSortBy]);

  // Update parent component when filtered products change
  useEffect(() => {
    if (products && products.length > 0) {
      if (!hasSetInitialProducts.current && filteredProducts.length > 0) {
        // First time setting products
        hasSetInitialProducts.current = true;
        setFilteredProducts(filteredProducts, hasActiveFilters, handleResetFilters);
      } else if (hasSetInitialProducts.current) {
        // Subsequent updates after initial load
        setFilteredProducts(filteredProducts, hasActiveFilters, handleResetFilters);
      }
    } else if (products && products.length === 0) {
      // Handle empty products case
      setFilteredProducts([], hasActiveFilters, handleResetFilters);
    }
  }, [filteredProducts, products, hasActiveFilters, handleResetFilters]);

  // Reset the flag when products change (new data loaded)
  useEffect(() => {
    if (products && products.length > 0) {
      hasSetInitialProducts.current = false;
    }
  }, [products]);


  return (
    <div className="mb-4 lg:mb-6">
      <div className="w-full bg-white rounded-lg shadow-sm p-3 sm:p-4">
        <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-0 md:flex-row md:gap-4 justify-center">
          <Button className={`hidden md:flex px-3 sm:px-5 py-2 sm:py-4 rounded-lg bg-black text-white cursor-pointer text-sm sm:text-base whitespace-nowrap ${hideAllProductsBtn ? 'md:hidden' : ''}`}>
            Tous les produits
          </Button>

          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={handleSetSearchQuery} 
          />

          <div className="flex gap-2 sm:gap-4">
            <SortBtn 
              sortBy={sortBy} 
              setSortBy={handleSetSortBy} 
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
            setSelectedCategory={handleSetSelectedCategory}
            priceRange={priceRange}
            setPriceRange={handleSetPriceRange}
            setSearchQuery={handleSetSearchQuery}
            onResetFilters={handleResetFilters}
          />
        )}
      </div>
    </div>
  );
}