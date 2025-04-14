import React, { useState, useEffect } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BASE_URL = process.env.BASE_PATH || "/images/";

const Img = ({
  className,
  src = "defaultNoData.png",
  alt = "testImg",
  isStatic = false,
  width = 100,
  height = 100,
  ...restProps
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
  }, [src]);

  const handleLoad = () => setIsLoading(false);

  return isLoading ? (
    <Skeleton width={width} height={height} />
  ) : (
    <Image
      className={className}
      src={isStatic ? imgSrc : BASE_URL + imgSrc}
      alt={alt}
      width={width}
      height={height}
      onLoad={handleLoad}
      {...restProps}
    />
  );
};

export default Img;
