import api from '@/lib/api';

/**
 * Fetches products from the backend with filtering and pagination
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.search - Search query
 * @param {string} params.category - Category filter
 * @param {number} params.minPrice - Minimum price
 * @param {number} params.maxPrice - Maximum price
 * @param {string} params.sortBy - Sort option
 */
export const getProducts = async (params = {}) => {
    try {
        const searchParams = new URLSearchParams();
        
        // Add parameters to search params
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                searchParams.append(key, value.toString());
            }
        });

        const response = await api.get(`/products?${searchParams.toString()}`);
        
        // Ensure consistent response format
        if (Array.isArray(response.data)) {
            // If backend returns array directly, wrap it
            return {
                products: response.data,
                pagination: {
                    page: params.page || 1,
                    limit: params.limit || 12,
                    total: response.data.length,
                    hasNext: false
                }
            };
        }
        
        // If backend returns paginated response
        return {
            products: response.data.products || response.data.data || [],
            pagination: response.data.pagination || response.data.meta || {
                page: params.page || 1,
                limit: params.limit || 12,
                total: response.data.total || 0,
                hasNext: response.data.hasNext || false
            },
            filters: response.data.filters
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

/**
 * Fetches a single product by ID
 * @param {string|number} id - Product ID
 */
export const getProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
    }
};

/**
 * Fetches related products
 * @param {string} productId - Product ID
 * @param {number} limit - Number of related products to fetch
 */
export const getRelatedProducts = async (productId, limit = 4) => {
    try {
        // First try the related endpoint
        const response = await api.get(`/products/${productId}/related?limit=${limit}`);
        return response.data;
    } catch (error) {
        // Fallback: fetch products from same category
        try {
            const product = await getProductById(productId);
            if (product.categoryId) {
                const response = await getProducts({ 
                    category: product.categoryId, 
                    limit: limit + 1 // Get one extra to exclude current product
                });
                const products = response.products || [];
                // Filter out current product and limit results
                return products
                    .filter(p => p.id !== productId)
                    .slice(0, limit);
            }
        } catch (fallbackError) {
            console.error(`Error fetching related products for ${productId}:`, fallbackError);
        }
        return [];
    }
};