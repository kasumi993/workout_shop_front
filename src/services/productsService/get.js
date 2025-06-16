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
 * @param {boolean} params.cursor - Use cursor-based pagination
 * @param {string} params.lastId - Last item ID for cursor pagination
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
        return response.data;
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
        const response = await api.get(`/products/${productId}/related?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching related products for ${productId}:`, error);
        throw error;
    }
};