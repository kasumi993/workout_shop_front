import { useState, useEffect, useCallback, useRef } from 'react';
import productsService from '@/services/productsService';
import { useToast } from '@/context/ToastContext';

export function useProducts(initialParams = {}) {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // For infinite scroll
    const [pagination, setPagination] = useState(null);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    
    const { showError } = useToast();
    const currentParams = useRef(initialParams);
    const isFirstLoad = useRef(true);

    const fetchProducts = useCallback(async (params = {}, append = false) => {
        // Don't fetch if already loading
        if (loading) return;

        try {
            setLoading(true);
            setError(null);
            
            const response = await productsService.getProducts(params);
            
            if (append) {
                // For infinite scroll
                setAllProducts(prev => [...prev, ...response.products]);
                setProducts(prev => [...prev, ...response.products]);
            } else {
                // For regular pagination or new search
                setProducts(response.products);
                setAllProducts(response.products);
            }
            
            setPagination(response.pagination);
            setHasMore(response.pagination.hasNext);
            
            // Set filters only on first load or when they exist
            if (response.filters || isFirstLoad.current) {
                setFilters(response.filters);
                isFirstLoad.current = false;
            }
            
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err);
            showError('Erreur lors du chargement des produits');
        } finally {
            setLoading(false);
        }
    }, [loading, showError]);

    const loadMore = useCallback(() => {
        if (!pagination || !hasMore || loading) return;
        
        const nextParams = {
            ...currentParams.current,
            page: pagination.page + 1
        };
        
        fetchProducts(nextParams, true);
    }, [pagination, hasMore, loading, fetchProducts]);

    const loadMoreInfinite = useCallback(() => {
        if (!hasMore || loading || products.length === 0) return;
        
        const lastProduct = products[products.length - 1];
        const nextParams = {
            ...currentParams.current,
            cursor: true,
            lastId: lastProduct.id
        };
        
        fetchProducts(nextParams, true);
    }, [hasMore, loading, products, fetchProducts]);

    const refetch = useCallback((newParams = {}) => {
        const params = { ...currentParams.current, ...newParams, page: 1 };
        currentParams.current = params;
        setAllProducts([]);
        fetchProducts(params, false);
    }, [fetchProducts]);

    const reset = useCallback(() => {
        setProducts([]);
        setAllProducts([]);
        setPagination(null);
        setError(null);
        setHasMore(true);
        currentParams.current = initialParams;
    }, [initialParams]);

    // Initial load
    useEffect(() => {
        fetchProducts(initialParams);
    }, []);

    return {
        products,
        allProducts,
        pagination,
        filters,
        loading,
        error,
        hasMore,
        fetchProducts,
        loadMore,
        loadMoreInfinite,
        refetch,
        reset
    };
}