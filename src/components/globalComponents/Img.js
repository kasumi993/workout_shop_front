import React, { useState, useEffect } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Img = ({
  className,
  src = "/images/noImage.png",
  alt = "Img",
  width = 100,
  height = 100,
  ...restProps
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setImgSrc(src);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Skeleton width={width} height={height} />}
      <Image
        className={`${className} ${isLoading ? 'hidden' : ''}`}
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        {...restProps}
      />
    </>
  );
};

export default Img;