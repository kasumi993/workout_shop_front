import Image from 'next/image';
import Button from '@/components/globalComponents/Button';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroShapeRef = useRef(null);
  const veloRef = useRef(null);
  const mainTextRef = useRef(null);
  const productInfoRef = useRef(null);

  useEffect(() => {
    const veloElement = veloRef.current;
    const textElement = mainTextRef.current;
    const productInfoElement = productInfoRef.current;
    const heroShapeElement = heroShapeRef.current;

     // Animation pour la forme d'arrière-plan
     gsap.fromTo(
      heroShapeElement,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 0.6, duration: 1, delay: 0.3,  ease: 'power2.out' }
    );

    // Animation pour l'image du vélo
    gsap.fromTo(
      veloElement,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    );

    // Animation pour le texte sur le côté gauche
    gsap.fromTo(
      textElement,
      { xPercent: -100, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power2.out' } // Ajout d'un léger délai pour un effet séquentiel
    );

    // Animation pour le texte sur le côté droit
    gsap.fromTo(
      productInfoElement,
      { xPercent: +100, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power2.out' } // Ajout d'un léger délai pour un effet séquentiel
    );

  }, []);

  return (
    <section id="hero" className="relative bg-gradient-to-r from-[#BDCDE5] to-[#DCEEFE] h-screen max-h-[600px] md:max-h-[800px]">
    <div ref={heroShapeRef} className="absolute transition-opacity bg-[url('/images/hero-background-shape.svg')] opacity-60 bg-contain bg-no-repeat bg-top h-3/4 w-3/4 left-0 right-0 top-0 mx-auto animate-slide-down"></div>
      <Image
        ref={veloRef}
        src={'/images/velo3.png'}
        width={652}
        height={572}
        alt="image Velo spinning"
        className="absolute bottom-0 left-20 top-20 right-0 m-auto scale-x-[-1]"
      />
      <div className="relative flex justify-between items-center h-full w-full px-25">
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
      </div>
    </section>
  );
}