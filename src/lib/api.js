import axios from 'axios';

// Create a custom axios instance for the NestJS backend
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'Une erreur inattendue s\'est produite';
    
    // Handle different error types
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          errorMessage = 'Demande invalide';
          break;
        case 401:
          errorMessage = 'Non autorisé';
          break;
        case 403:
          errorMessage = 'Accès interdit';
          break;
        case 404:
          errorMessage = 'Ressource non trouvée';
          break;
        case 500:
          errorMessage = 'Erreur du serveur';
          break;
        default:
          errorMessage = data?.message || `Erreur ${status}`;
      }
      
      console.error('API Error:', {
        status,
        data,
        url: error.config?.url,
      });
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'Erreur de connexion réseau';
      console.error('Network Error:', error.message);
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message || 'Erreur de configuration';
      console.error('Request Error:', error.message);
    }
    
    // Attach user-friendly message to error
    error.userMessage = errorMessage;
    
    return Promise.reject(error);
  }
);

export default api;