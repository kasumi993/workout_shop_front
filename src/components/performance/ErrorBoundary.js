import React from 'react';
import { trackError } from '@/lib/analytics';
import AnimatedElement from '../animations/AnimatedElement';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    trackError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <AnimatedElement animation="scaleIn">
            <div className="text-center max-w-md mx-auto">
              <div className="text-6xl mb-4">😕</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Oups ! Quelque chose s&apos;est mal passé
              </h1>
              <p className="text-gray-600 mb-6">
                Une erreur inattendue s&apos;est produite. Nos équipes ont été notifiées.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
                >
                  Recharger la page
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full text-gray-600 hover:text-gray-800 transition duration-300"
                >
                  Retour à l&apos;accueil
                </button>
              </div>
            </div>
          </AnimatedElement>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;