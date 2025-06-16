export const generateBreadcrumbs = (router, product = null, category = null) => {
  const breadcrumbs = [
    { name: 'Accueil', href: '/' }
  ];

  if (router.pathname.includes('/products')) {
    breadcrumbs.push({ name: 'Produits', href: '/products' });
    
    if (category) {
      breadcrumbs.push({ 
        name: category.name, 
        href: `/products?category=${category.slug || category.id}` 
      });
    }
    
    if (product) {
      breadcrumbs.push({ 
        name: product.title, 
        href: `/product/detail/${product.id}` 
      });
    }
  }

  if (router.pathname.includes('/about')) {
    breadcrumbs.push({ name: 'À propos', href: '/about' });
  }

  if (router.pathname.includes('/contact')) {
    breadcrumbs.push({ name: 'Contact', href: '/contact' });
  }

  if (router.pathname.includes('/cart')) {
    breadcrumbs.push({ name: 'Panier', href: '/cart' });
  }

  if (router.pathname.includes('/wishlist')) {
    breadcrumbs.push({ name: 'Liste de souhaits', href: '/wishlist' });
  }

  return breadcrumbs;
};

export const generateProductSEO = (product) => {
  if (!product) return {};

  const title = `${product.title} - ${product.price?.toLocaleString('fr-FR')} FCFA | Workout Shop`;
  const description = product.description || `Découvrez ${product.title} sur Workout Shop. Équipement de sport de qualité avec livraison rapide à Dakar.`;
  const image = product.images?.[0];

  return {
    title,
    description,
    image,
    type: 'product'
  };
};

export const generateCategorySEO = (category, products = []) => {
  if (!category) return {};

  const productCount = products.length;
  const title = `${category.name} - ${productCount} produits | Workout Shop`;
  const description = `Découvrez notre sélection de ${category.name.toLowerCase()} (${productCount} produits). Équipements de sport de qualité avec livraison rapide au Sénégal.`;

  return {
    title,
    description,
    type: 'website'
  };
};