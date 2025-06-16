import AnimatedElement from '../animations/AnimatedElement';
import AnimatedButton from '../animations/AnimatedButton';
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa';

export default function CallToAction({
  title = "Prêt à commencer ?",
  description = "Découvrez notre sélection et transformez votre routine fitness dès aujourd'hui.",
  primaryButton = { text: "Voir les produits", href: "/products" },
  secondaryButton = { text: "Nous contacter", href: "https://wa.me/221761978060", external: true },
  variant = "gradient", // gradient, dark, light
  className = ""
}) {
  const variants = {
    gradient: "bg-gradient-to-r from-blue-600 to-green-600",
    dark: "bg-gray-900",
    light: "bg-gray-50 text-gray-900"
  };

  const textColor = variant === "light" ? "text-gray-900" : "text-white";
  const descriptionColor = variant === "light" ? "text-gray-600" : "text-gray-300";

  return (
    <AnimatedElement animation="slideUp" className={`py-12 sm:py-16 ${className}`}>
      <div className={`${variants[variant]} rounded-2xl p-6 sm:p-8 lg:p-12 text-center ${textColor}`}>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          {title}
        </h3>
        <p className={`text-base sm:text-lg ${descriptionColor} mb-6 sm:mb-8 max-w-2xl mx-auto`}>
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AnimatedButton
            onClick={() => window.location.href = primaryButton.href}
            variant={variant === "light" ? "primary" : "secondary"}
            size="lg"
            className="w-full sm:w-auto"
          >
            {primaryButton.text}
            <FaArrowRight className="ml-2" />
          </AnimatedButton>
          
          {secondaryButton && (
            <AnimatedButton
              onClick={() => {
                if (secondaryButton.external) {
                  window.open(secondaryButton.href, '_blank');
                } else {
                  window.location.href = secondaryButton.href;
                }
              }}
              variant={variant === "light" ? "outline" : "primary"}
              size="lg"
              className="w-full sm:w-auto"
            >
              <FaWhatsapp className="mr-2" />
              {secondaryButton.text}
            </AnimatedButton>
          )}
        </div>
      </div>
    </AnimatedElement>
  );
}