import { useState, useRef, useEffect } from 'react';
import Img from '../globalComponents/Img';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi2';

const ProductImages = ({ images = [], className }) => {
    const defaultImage = '/images/noimage.png'
    const [selectedImage, setSelectedImage] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const carouselRef = useRef(null);

    // Handle touch events for swipe gestures (mobile)
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && images.length > 0) {
            handleNextImage();
        }
        if (isRightSwipe && images.length > 0) {
            handlePreviousImage();
        }
    };

    const handleNextImage = () => {
        if (images.length > 0) {
            setSelectedImage((prevIndex) => (prevIndex + 1) % images.length);
        }
    };

    const handlePreviousImage = () => {
        if (images.length > 0) {
            setSelectedImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    // Auto-scroll carousel on mobile to center selected image
    useEffect(() => {
        if (carouselRef.current && window.innerWidth < 768) {
            const scrollPosition = selectedImage * (carouselRef.current.scrollWidth / images.length);
            carouselRef.current.scrollTo({
                left: scrollPosition - carouselRef.current.clientWidth / 2,
                behavior: 'smooth'
            });
        }
    }, [selectedImage, images.length]);

    const displayImages = images && images.length > 0 ? images : [defaultImage];

    return (
        <div className={`${className}`}>
            {/* Mobile Layout - Etsy Style */}
            <div className="md:hidden">
                {/* Main Image Carousel */}
                <div 
                    className="relative w-full aspect-square bg-white overflow-hidden"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Image Container */}
                    <div 
                        className="flex transition-transform duration-300 ease-out h-full"
                        style={{ transform: `translateX(-${selectedImage * 100}%)` }}
                    >
                        {displayImages.map((image, index) => (
                            <div key={index} className="w-full h-full flex-shrink-0">
                                <Img 
                                    src={image} 
                                    alt={`Product image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Image Counter - Top Right */}
                    <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {selectedImage + 1} / {displayImages.length}
                    </div>

                    {/* Navigation Arrows - Only show if more than 1 image */}
                    {displayImages.length > 1 && (
                        <>
                            <button
                                onClick={handlePreviousImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                                aria-label="Previous image"
                            >
                                <HiChevronLeft className="w-5 h-5 text-gray-700" />
                            </button>
                            
                            <button
                                onClick={handleNextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                                aria-label="Next image"
                            >
                                <HiChevronRight className="w-5 h-5 text-gray-700" />
                            </button>
                        </>
                    )}
                </div>

                {/* Thumbnail Strip - Below main image */}
                {displayImages.length > 1 && (
                    <div className="mt-3">
                        <div 
                            ref={carouselRef}
                            className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-2"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {displayImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                        selectedImage === index 
                                            ? 'border-black shadow-sm scale-105' 
                                            : 'border-gray-200 opacity-70'
                                    }`}
                                >
                                    <Img 
                                        src={image} 
                                        width={64} 
                                        height={64} 
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Dot Indicators - Only show if 5 or fewer images */}
                {displayImages.length > 1 && displayImages.length <= 5 && (
                    <div className="flex justify-center gap-2 mt-3">
                        {displayImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                    selectedImage === index 
                                        ? 'bg-black w-6' 
                                        : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Desktop Layout - Original */}
            <div className="hidden md:flex gap-8">
                {/* Thumbnails column */}
                <div className="flex flex-col space-y-2">
                    {displayImages.map((image, index) => (
                        <div 
                            key={index}
                            className={`w-16 h-16 lg:w-20 lg:h-20 border rounded-md overflow-hidden cursor-pointer opacity-60 hover:opacity-100 transition-opacity ${
                                selectedImage === index ? 'border-blue-500 opacity-100' : 'border-gray-200'
                            }`}
                            onClick={() => setSelectedImage(index)}
                        >
                            <Img 
                                src={image} 
                                width={80} 
                                height={80} 
                                alt={`Product thumbnail ${index + 1}`}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                </div>
                
                {/* Main image */}
                <div className='flex items-center justify-center relative w-[95%] h-96 lg:h-[500px]'>
                    {/* Previous button */}
                    <button
                        onClick={handlePreviousImage}
                        className="absolute left-[-20px] bg-white/90 backdrop-blur-sm rounded-full p-4 text-gray-800 hover:bg-white hover:text-gray-900 shadow-md cursor-pointer transition-all z-10"
                        aria-label="Previous">
                        <HiChevronLeft className="w-6 h-6" />
                    </button>
                                
                    <div className="w-full h-full rounded-md shadow-md overflow-hidden">
                        <Img 
                            src={displayImages[selectedImage]} 
                            alt="Product main image"
                            className="animate-fade-in object-cover w-full h-full"
                        />
                    </div>
                    
                    {/* Next button */}
                    <button
                        onClick={handleNextImage}
                        className="absolute right-[-20px] bg-white/90 backdrop-blur-sm rounded-full p-4 text-gray-800 hover:bg-white hover:text-gray-900 shadow-md cursor-pointer transition-all z-10"
                        aria-label="Next">
                        <HiChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Hide scrollbar for webkit browsers */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default ProductImages;