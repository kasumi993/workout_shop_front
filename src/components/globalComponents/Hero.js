import Image from 'next/image';
import Button from '@/components/globalComponents/Button';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { useRef } from 'react';
import SlideOnScroll from '../animations/SlideOnScroll';

export default function Hero() {
  const heroShapeRef = useRef(null);
  const veloRef = useRef(null);
  const mainTextRef = useRef(null);
  const productInfoRef = useRef(null);

  return (
    <section id="hero" className="relative bg-gradient-to-r from-[#FFFFFF] to-[#DCEEFE] h-screen max-h-[400px] sm:max-h-[500px] md:max-h-[600px] lg:max-h-[800px]">
      {/* Background Shape - Responsive */}
      <SlideOnScroll ref={heroShapeRef} animationType="slide-bottom" endOpacity={0.4}>
        <div ref={heroShapeRef} className="absolute transition-opacity bg-[url('/images/hero-background-shape.svg')] opacity-60 bg-contain bg-no-repeat bg-top h-3/4 w-3/4 left-0 right-0 top-0 mx-auto animate-slide-down"></div>
      </SlideOnScroll>
      
      {/* Background Bike Image - Responsive positioning */}
      <SlideOnScroll ref={veloRef} animationType="slide-bottom" start="top 100%">
        <Image
          ref={veloRef}
          src={'/images/velo3.png'}
          width={652}
          height={572}
          alt="image Velo spinning"
          className="absolute sm:bottom-0 right-0 top-1/2 transform -translate-x-1/2 translate-y-1/4 scale-x-[-1] 
                     hidden sm:block w-60 h-auto sm:w-80 lg:w-[652px] lg:right-10 lg:top-20 lg:translate-x-0 lg:translate-y-0 lg:m-auto"
        />
      </SlideOnScroll>
      
      <div className="relative flex flex-col lg:flex-row lg:justify-between items-center h-full w-full px-4 sm:px-6 md:px-8 lg:px-25">
        {/* Main Text Section - Responsive */}
        <SlideOnScroll ref={mainTextRef} animationType="slide-left" start="top 80%" end="+=100">
          <div ref={mainTextRef} className="flex w-full lg:w-[60%] items-center justify-center lg:items-start lg:justify-start text-center lg:text-left z-10">
            <div className="mt-32 lg:mt-[38px] flex flex-1 flex-col items-center lg:items-start">
              {/* Main Heading - Responsive text sizing */}
              <h1 className="leading-tight text-black font-robotocondensed 
                           text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[70px] 
                           font-bold w-full lg:w-full mb-2 sm:mb-3 md:mb-4 lg:mb-0 lg:mt-10">
                Le sport vient chez vous avec Workout Shop
              </h1>
              
              {/* Subtitle - Responsive text sizing */}
              <p className="text-black font-robotocondensed 
                          text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 
                          font-light mb-3 sm:mb-4 md:mb-5 lg:mt-5">
                Livraison partout à dakar 🇸🇳
              </p>
              
              {/* Payment Methods & Contact - Responsive layout */}
              <div className="flex flex-col items-center lg:items-start gap-3 sm:gap-4 md:gap-5 lg:mt-5">
                {/* Payment Method Icons */}
                <div className='flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5'>
                  <div className="w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-16 lg:w-[139px] lg:h-[75px] 
                                flex justify-center items-center p-2 sm:p-2.5 md:p-3 
                                bg-[rgba(0,0,0,0.1)] rounded-lg">
                    <Image src={'/images/om.svg'} width={70} height={48} alt='Orange Money' className='object-contain w-12 sm:w-14 md:w-16 lg:w-[70px] h-auto' />
                  </div>
                  <div className="w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-16 lg:w-[139px] lg:h-[75px] 
                                flex justify-center items-center p-2 sm:p-2.5 md:p-3 
                                bg-[rgba(0,0,0,0.1)] rounded-lg">
                    <Image src={'/images/wave.svg'} width={70} height={48} alt='Wave' className='object-contain w-12 sm:w-14 md:w-16 lg:w-[70px] h-auto' />
                  </div>
                </div>
                
                {/* WhatsApp Contact */}
                <div className="w-48 h-12 sm:w-52 sm:h-14 md:w-56 md:h-16 lg:w-[200px] lg:h-[75px] 
                              gap-2 sm:gap-2.5 md:gap-3 
                              flex justify-center items-center p-2 sm:p-2.5 md:p-3 
                              bg-[rgba(0,0,0,0.1)] rounded-lg">
                    <Image src={'/icones/whatsapp.svg'} width={30} height={30} alt='WhatsApp' 
                           className='object-contain w-5 sm:w-6 md:w-7 lg:w-[30px] h-auto' />
                    <span className='text-gray-800 text-xs sm:text-sm md:text-base lg:text-base font-medium'>
                      +221 76 197 80 60
                    </span>
                </div>
              </div>
            </div>
          </div>
        </SlideOnScroll>
        
        {/* Product Info Card - Responsive positioning and sizing */}
        {/* <SlideOnScroll ref={productInfoRef} animationType="slide-right" start="top 50%" end="+=150">
          <div ref={productInfoRef} className="hidden lg:flex relative top-[-50px] w-[180px] xl:w-[230px] flex-col items-center px-6 xl:px-8">
              {/* Product Card Header */}
              {/* <div className="w-full relative flex rounded-tl-[90px] rounded-tr-[90px] border border-solid border-black px-4 xl:px-6 py-6 xl:py-8">
                <h2 className="text-black mt-[30px] xl:mt-[46px] text-center !font-robotocondensed text-[20px] xl:text-[25px] font-bold">
                  En Exclusivité
                </h2>
              </div> */}

              {/* Product Info */}
              {/* <div className="w-full flex flex-col justify-center items-center gap-0.5 border border-solid border-black p-2">
                <p className="text-black self-center font-robotocondensed text-[20px] xl:text-[25px] font-light">
                  Vélo d'intérieur
                </p>
                <h3 className="text-black font-robotocondensed text-[20px] xl:text-[25px] font-bold">
                  500.000 cfa
                </h3>
              </div>

              {/* Add to Cart Button */}
              {/* <Button leftIcon={<HiOutlineShoppingCart className="text-[20px] xl:text-[24px]"/>}
                className="mt-[20px] xl:mt-[34px] flex items-center justify-center gap-1.5 rounded-[10px] bg-black p-3 xl:p-3.5 text-[13px] xl:text-[15px] text-white">
                  Ajouter au Panier
              </Button>
            </div>
        </SlideOnScroll> */}
        
        {/* Mobile Product Info - Simplified version for small screens */}
        {/* <div className="lg:hidden absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 
                      bg-white/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg border border-gray-200 z-10">
          <div className="text-center">
            <p className="text-gray-800 font-medium text-sm sm:text-base mb-1">Vélo d'intérieur</p>
            <p className="text-gray-900 font-bold text-lg sm:text-xl">500.000 FCFA</p>
            <button className="mt-2 bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium 
                             hover:bg-gray-800 transition duration-300 flex items-center gap-2 mx-auto">
              <HiOutlineShoppingCart className="text-base" />
              Voir le produit
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}