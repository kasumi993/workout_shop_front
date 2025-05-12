import { useState } from 'react';
import Img from '../globalComponents/Img';

const ProductImages = ({ images = [], className }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className={`flex ${className} gap-8`}>
            {/* Thumbnails column */}
            <div className="hidden md:flex flex-col space-y-2">
                {images && images.map((image, index) => (
                        <div 
                            key={index}
                            className={`w-30 h-30 border rounded-md overflow-hidden cursor-pointer ${
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
             <div className="w-[90%] h-[500px] rounded-md shadow-md">
                <Img 
                    src={images && images.length > 0 ? images[selectedImage] : defaultImage} 
                    alt="Product main image"
                    className="object-cover w-full h-full overflow-hidden rounded-lg"
                />
            </div>
        </div>
    );
};

export default ProductImages;