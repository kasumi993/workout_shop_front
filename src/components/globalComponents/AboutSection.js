import { FaTruck, FaShieldAlt } from 'react-icons/fa';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-8 sm:py-12 md:py-16 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
       <div className="w-full md:w-1/2 flex justify-center items-center order-2 md:order-1">
          <Image
            src="/logo/logo-blue.svg"
            width={100}
            height={100}
            alt="A propos de Workout-Shop" 
            className="w-48 sm:w-64 md:w-72 lg:w-80 h-auto"
          />
        </div>
       <div className="w-full md:w-1/2 order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Notre Histoire
            </h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed text-center md:text-left">
              Workout-Shop est une initiative de deux frères sénégalais, Assane et Abdoulaye Gueye. 
              Passionnés de sport et de fitness, ils se sont donné pour mission d&apos;aider les autres à 
              améliorer leur santé au quotidien.
            </p>
            <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed text-center md:text-left">
              Après avoir eu du mal à trouver du matériel de sport de qualité à domicile, à des prix 
              raisonnables au Sénégal, ils ont décidé de créer leur propre solution. En livrant directement 
              à domicile, ils rendent accessibles des produits fiables et performants, au meilleur prix.
            </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm flex-1 text-center">
              <FaTruck className="text-primary text-2xl mb-2 mx-auto" />
              <h4 className="font-semibold text-gray-800">Livraison Rapide</h4>
              <p className="text-gray-600 text-sm">Au Senegal en quelques jours</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex-1 text-center">
              <FaShieldAlt className="text-primary text-2xl mb-2 mx-auto" />
              <h4 className="font-semibold text-gray-800">Qualité Garantie</h4>
              <p className="text-gray-600 text-sm">Produits Testés</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}