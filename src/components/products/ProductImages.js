import { useState } from 'react';
import Img from '../globalComponents/Img';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi2';

const ProductImages = ({ images = [], className }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    const handleNextImage = () => {
        setSelectedImage((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePreviousImage = () => {
        setSelectedImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className={`flex ${className} gap-8`}>
            {/* Thumbnails column */}
            <div className="hidden md:flex flex-col space-y-2">
                {images && images.map((image, index) => (
                        <div 
                            key={index}
                            className={`w-20 h-20 border rounded-md overflow-hidden cursor-pointer opacity-60 hover:opacity-100 ${
                                selectedImage === index ? 'border-blue-500' : 'border-gray-200'
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
                    ))
                }
            </div>
             {/* Main image */}
             <div className='flex items-center justify-center relative w-[95%] h-[500px] '>
                <button
                    onClick={handlePreviousImage}
                    className="absolute left-[-20px] bg-white rounded-full p-4 text-gray-800 hover:bg-gray-200 shadow-md cursor-pointer"
                    aria-label="Previous">
                    <HiChevronLeft className="w-6 h-6" />
                </button>
                            
                <div className="w-[80%] h-[100%] rounded-md shadow-md">
                    <Img 
                        src={images && images.length > 0 ? images[selectedImage] : defaultImage} 
                        alt="Product main image"
                        className="animate-fade-in object-cover w-full h-full overflow-hidden rounded-lg"
                    />
                </div>
                <button
                    onClick={handleNextImage}
                    className="absolute right-[-20px] bg-white rounded-full p-4 text-gray-800 hover:bg-gray-200 shadow-md cursor-pointer"
                    aria-label="Next">
                    <HiChevronRight className="w-6 h-6" />
                </button>
             </div>
        </div>
    );
};

export default ProductImages;