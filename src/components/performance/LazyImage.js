import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { createIntersectionObserver } from '@/utils/performance';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LazyImage({
  src,
  alt = "Img",
  width = 100,
  height = 100,
  className = '',
  placeholder = '/images/noImage.png',
  quality = 75,
  priority = false,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const imgRef = useRef(null);

  useEffect(() => {
    if (priority) return; // Skip intersection observer if priority

    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (imgRef.current && observer) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current && observer) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  return (
    <div ref={imgRef}>
      {/* Placeholder */}
        {!isLoaded && <Skeleton className={className} />}
      
      {/* Actual Image */}
      {isInView && (
        <Image
          src={src || placeholder}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${className} ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  );
}
