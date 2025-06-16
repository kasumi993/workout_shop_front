import { useState, useEffect, useCallback, useRef } from 'react';
import productsService from '@/services/productsService';
import { useToast } from '@/context/ToastContext';

export function useProducts(initialParams = {}) {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, hasNext: false });
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(false);
    
    const { showError } = useToast();
    const currentParams = useRef(initialParams);
    const isMounted = useRef(true);

    const fetchProducts = useCallback(async (params = {}, append = false) => {
        // Prevent multiple simultaneous requests
        if (loading) return;

        try {
            setLoading(true);
            setError(null);
            
            const response = await productsService.getProducts(params);
            
            // Check if component is still mounted
            if (!isMounted.current) return;
            
            const newProducts = response.products || response;
            const paginationData = response.pagination || {
                page: params.page || 1,
                limit: params.limit || 12,
                total: newProducts.length,
                hasNext: false
            };
            
            if (append) {
                // For infinite scroll - append products
                setProducts(prev => [...prev, ...newProducts]);
            } else {
                // For new search/filters - replace products
                setProducts(newProducts);
            }
            
            setPagination(paginationData);
            setHasMore(paginationData.hasNext);
            
            // Set filters if available
            if (response.filters) {
                setFilters(response.filters);
            }
            
        } catch (err) {
            if (!isMounted.current) return;
            
            console.error('Error fetching products:', err);
            setError(err);
            showError('Erreur lors du chargement des produits');
            setHasMore(false);
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }, [loading, showError]);

    const loadMore = useCallback(() => {
        // Prevent loading if already loading, no more items, or no current products
        if (loading || !hasMore || products.length === 0) return;
        
        const nextParams = {
            ...currentParams.current,
            page: pagination.page + 1
        };
        
        currentParams.current = nextParams;
        fetchProducts(nextParams, true);
    }, [pagination.page, hasMore, loading, products.length, fetchProducts]);

    const refetch = useCallback((newParams = {}) => {
        // Reset pagination when refetching with new params
        const params = { ...initialParams, ...newParams, page: 1 };
        currentParams.current = params;
        setProducts([]); // Clear products before new fetch
        fetchProducts(params, false);
    }, [initialParams, fetchProducts]);

    const reset = useCallback(() => {
        setProducts([]);
        setPagination({ page: 1, limit: 12, total: 0, hasNext: false });
        setError(null);
        setHasMore(false);
        setLoading(false);
        currentParams.current = initialParams;
    }, [initialParams]);

    // Initial load
    useEffect(() => {
        isMounted.current = true;
        fetchProducts(initialParams);
        
        return () => {
            isMounted.current = false;
        };
    }, []); // Only run once on mount

    return {
        products,
        pagination,
        filters,
        loading,
        error,
        hasMore,
        loadMore,
        refetch,
        reset
    };
}