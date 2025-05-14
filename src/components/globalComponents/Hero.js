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
    <section id="hero" className="relative bg-gradient-to-r from-[#FFFFFF] to-[#DCEEFE] h-screen max-h-[600px] md:max-h-[800px]">
      <SlideOnScroll ref={heroShapeRef} animationType="slide-bottom" endOpacity={0.4}>
        <div ref={heroShapeRef} className="absolute transition-opacity bg-[url('/images/hero-background-shape.svg')] opacity-60 bg-contain bg-no-repeat bg-top h-3/4 w-3/4 left-0 right-0 top-0 mx-auto animate-slide-down"></div>
      </SlideOnScroll>
      <SlideOnScroll ref={veloRef} animationType="slide-bottom" start="top 100%">
        <Image
          ref={veloRef}
          src={'/images/velo3.png'}
          width={652}
          height={572}
          alt="image Velo spinning"
          className="absolute bottom-0 left-20 top-20 right-0 m-auto scale-x-[-1]"
        />
      </SlideOnScroll>
      
      <div className="relative flex justify-between items-center h-full w-full px-25">
        <SlideOnScroll ref={mainTextRef} animationType="slide-left" start="top 80%" end="+=100">
          <div ref={mainTextRef} className="flex w-[50%] items-start md:flex-col">
            <div className="mt-[38px] flex flex-1 flex-col items-start self-end md:self-stretch">
              <h1 className="mt-10 leading-tight text-black font-robotocondensed text-[70px] font-bold md:w-full">
                Le sport vient <br/> chez vous avec <br/> Workout Shop
              </h1>
              <p className="mt-5 text-black font-robotocondensed text-4xl font-light md:text-[23px] sm:text-[21px]">
                Livraison partout à dakar 🇸🇳
              </p>
              <div className="mt-5 flex gap-5 flex-col items-center">
                <div className='flex flex-row gap-5'>
                  <div className="w-[139px] h-[75px] flex justify-center items-center p-3 bg-[rgba(0,0,0,0.1)] rounded-lg">
                    <Image src={'/images/om.svg'} width={70} height={48} alt='image' className='object-contain' />
                  </div>
                  <div className="w-[139px] h-[75px] flex justify-center items-center p-3 bg-[rgba(0,0,0,0.1)] rounded-lg">
                    <Image src={'/images/wave.svg'} width={70} height={48} alt='image' className='object-contain' />
                  </div>
                </div>
                <div className="w-[200px] h-[75px] gap-3 flex justify-center items-center p-3 bg-[rgba(0,0,0,0.1)] rounded-lg">
                    <Image src={'/icones/whatsapp.svg'} width={30} height={30} alt='image' className='object-contain' />
                    <span className='text-gray-800'> +221 76 197 80 60 </span>
                </div>
              </div>
            </div>
          </div>
        </SlideOnScroll>
        
        <SlideOnScroll ref={productInfoRef} animationType="slide-right" start="top 50%" end="+=150">
          <div ref={productInfoRef} className="relative top-[-50px] flex w-[230px] flex-col items-center px-8 sm:px-5">
              <div className="w-full relative flex rounded-tl-[90px] rounded-tr-[90px] border border-solid border-black px-6 py-8 sm:p-5">
                <h2 className="text-black mt-[46px] text-center !font-robotocondensed text-[25px] font-bold">
                  En Exclusivité
                </h2>
              </div>

              <div className="w-full flex flex-col justify-center items-center gap-0.5 border border-solid border-black p-2">
                <p className="text-black self-center font-robotocondensed text-[25px] font-light">
                  Vélo d'intérieur
                </p>
                <h3 className="text-black font-robotocondensed text-[25px] font-bold">
                  150.000 cfa
                </h3>
              </div>

              <Button leftIcon={<HiOutlineShoppingCart className="text-[24px]"/>}
                className="mt-[34px] flex items-center justify-center gap-1.5 rounded-[10px] bg-black p-3.5 text-[15px] text-white">
                  Ajouter au Panier
              </Button>
            </div>
        </SlideOnScroll>
        
      </div>
    </section>
  );
}