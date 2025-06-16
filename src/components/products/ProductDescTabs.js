import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function ProductTabs({ product, reviews = [] }) {
  const [activeTab, setActiveTab] = useState('description');

  // Calculate reviews statistics
  const reviewsCount = reviews.length;
  const averageRating = reviewsCount > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviewsCount).toFixed(1)
    : 0;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length;
    const percentage = reviewsCount > 0 ? Math.round((count / reviewsCount) * 100) : 0;
    return { rating, count, percentage };
  });

  // Available tabs - conditionally include reviews
  const availableTabs = ['description', 'shipping'];
  if (reviewsCount > 0) {
    availableTabs.push('reviews');
  }

  // Reset active tab if reviews tab is no longer available
  if (activeTab === 'reviews' && reviewsCount === 0) {
    setActiveTab('description');
  }

  const getTabLabel = (tab) => {
    switch (tab) {
      case 'description':
        return 'Description';
      case 'shipping':
        return 'Livraison & Retours';
      case 'reviews':
        return `Avis (${reviewsCount})`;
      default:
        return tab;
    }
  };

  return (
    <div className="mt-8 md:mt-12 lg:mt-16">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-4 md:space-x-8 overflow-x-auto scrollbar-hide">
          {availableTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 md:py-4 px-1 sm:px-2 font-medium transition-colors relative whitespace-nowrap text-sm md:text-base flex-shrink-0 ${
                activeTab === tab
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {getTabLabel(tab)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-6 md:py-8">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-900">
              À propos de ce produit
            </h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
              {product?.description || 'Aucune description disponible.'}
            </p>
            
            {product?.features && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-base md:text-lg">
                  Points forts
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm md:text-base">
                  <li>Matériaux de haute qualité</li>
                  <li>Design ergonomique pour un confort optimal</li>
                  <li>Facile à utiliser et à entretenir</li>
                  <li>Convient aux débutants et aux professionnels</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="prose max-w-none">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-900">
              Informations de livraison
            </h3>
            <div className="space-y-4 sm:space-y-6 text-gray-600 text-sm md:text-base">
              <div>
                <h4 className="font-medium text-gray-800 mb-2 text-base md:text-lg">
                  Délais de livraison
                </h4>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2">
                  <li>Dakar : 1-2 jours ouvrables</li>
                  <li>Banlieue Dakar : 2-3 jours ouvrables</li>
                  <li>Autres régions : 3-5 jours ouvrables</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2 text-base md:text-lg">
                  Frais de livraison
                </h4>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2">
                  <li>Gratuit pour les commandes de plus de 150.000 FCFA</li>
                  <li>Entre 2.000 FCFA et 5.000 FCFA pour les commandes en dessous de 150.000 FCFA</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2 text-base md:text-lg">
                  Politique de retour
                </h4>
                <p className="leading-relaxed">
                  Nous acceptons les retours dans les 7 jours suivant la livraison si le produit est dans son état d&apos;origine.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && reviewsCount > 0 && (
          <div>
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="text-center flex-shrink-0">
                  <div className="text-3xl md:text-4xl font-bold mb-1">{averageRating}</div>
                  <div className="flex text-yellow-400 my-1 justify-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`text-sm md:text-base ${
                          i < Math.floor(averageRating) ? '' : 
                          i === Math.floor(averageRating) && averageRating % 1 >= 0.5 ? 'text-yellow-300' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">{reviewsCount} avis</div>
                </div>
                
                <div className="flex-1 w-full sm:w-auto">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center gap-2 mb-2">
                      <span className="text-xs md:text-sm w-4 text-gray-600">{rating}</span>
                      <FaStar className="text-yellow-400 text-xs flex-shrink-0" />
                      <div className="flex-1 bg-gray-200 h-1.5 md:h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-yellow-400 h-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-12 text-right">
                        {count} ({percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6 space-y-6">
              {reviews.map((review, index) => (
                <div key={review.id || index} className="border-b pb-6 last:border-0">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-medium text-gray-700 text-sm md:text-base">
                        {review.userName ? review.userName[0].toUpperCase() : 'U'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="font-medium text-sm md:text-base">
                            {review.userName || 'Utilisateur anonyme'}
                          </span>
                          <span className="text-gray-500 text-xs md:text-sm">
                            {review.createdAt ? new Date(review.createdAt).toLocaleDateString('fr-FR') : ''}
                          </span>
                        </div>
                        <div className="flex text-yellow-400 text-xs md:text-sm gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < review.rating ? '' : 'text-gray-300'} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {review.comment || 'Aucun commentaire.'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}