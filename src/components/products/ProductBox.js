import Button from "@/components/globalComponents/Button";
import Link from "next/link";
import {useContext} from "react";
import {CartContext} from "@/context/CartContext";

export default function ProductBox({_id, title, description, price, images}) {
  const {addProduct} = useContext(CartContext);
  const url = '/product/'+_id;
  
  return (
    <div>
      <Link 
        href={url}
        className="bg-white p-5 h-30 flex items-center justify-center rounded-lg text-center"
      >
        <div>
          <img 
            src={images?.[0]} 
            alt="" 
            className="max-w-full max-h-20"
          />
        </div>
      </Link>
      <div className="mt-1">
        <Link 
          href={url} 
          className="text-sm font-normal no-underline text-current m-0"
        >
          {title}
        </Link>
        <div className="block mt-0.5 md:flex md:gap-1 md:items-center md:justify-between">
          <div className="text-base font-normal text-right md:text-lg md:font-semibold md:text-left">
            ${price}
          </div>
          <Button 
            block 
            onClick={() => addProduct(_id)} 
            primary 
            outline
            className="mt-2 md:mt-0"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}