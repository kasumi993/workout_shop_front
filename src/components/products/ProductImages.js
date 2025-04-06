import { useState } from "react";

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  
  return (
    <div>
      {/* BigImageWrapper */}
      <div className="text-center">
        {/* BigImage */}
        <img 
          src={activeImage} 
          className="max-w-full max-h-[200px]"
          alt="Main product image"
        />
      </div>
      
      {/* ImageButtons */}
      <div className="flex gap-2 mt-2">
        {images.map(image => (
          <div
            key={image}
            className={`
              border-2 rounded-md p-0.5 h-10 cursor-pointer
              ${image === activeImage ? 'border-gray-300' : 'border-transparent'}
              hover:border-gray-300 transition-colors
            `}
            onClick={() => setActiveImage(image)}
          >
            {/* Thumbnail Image */}
            <img 
              src={image} 
              className="max-w-full max-h-full object-contain"
              alt="Product thumbnail"
            />
          </div>
        ))}
      </div>
    </div>
  );
}