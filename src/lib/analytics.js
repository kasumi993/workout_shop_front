export const analytics = {
  // Track page views
  pageView: (url) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    }
  },

  // Track events
  event: (action, category, label, value) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  },

  // Track ecommerce events
  purchase: (transactionId, items, value) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: 'XOF',
        items: items.map(item => ({
          item_id: item.id,
          item_name: item.title,
          category: item.category,
          quantity: item.quantity,
          price: item.price
        }))
      });
    }
  },

  addToCart: (item) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'XOF',
        value: item.price,
        items: [{
          item_id: item.id,
          item_name: item.title,
          category: item.category,
          quantity: 1,
          price: item.price
        }]
      });
    }
  },

  viewItem: (item) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'XOF',
        value: item.price,
        items: [{
          item_id: item.id,
          item_name: item.title,
          category: item.category,
          price: item.price
        }]
      });
    }
  }
};

// Error tracking
export const trackError = (error, errorInfo = {}) => {
  console.error('Error tracked:', error, errorInfo);
  
  // Send to your error tracking service (Sentry, LogRocket, etc.)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false,
      ...errorInfo
    });
  }
};