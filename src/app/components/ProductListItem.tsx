import React from 'react';
import Link from 'next/link';
import ProductListItemAttributes from './ProductListItemAttributes';
import ProductListBuy from './ProductBuy';
import Image from 'next/image';

type Image = {
  id: number;
  src: string;
}

interface ProductListItemProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    images: Image[];
    attributes: { // Change to an array of objects, not a tuple
      id: number | string;
      name: string;
      options: string[];
    }[];
  }
}

const ProductListItem: React.FC<ProductListItemProps> = ({product}) => {

  const name = product?.name ? product.name : '--';
  const description = product?.description ? product.description : '--';
  const price = product?.price ? '$ ' + product.price : '--';
  const attributes = product?.attributes ? product.attributes : [];

  // Strip text to 20 words
  const stripText = (text: string): string => {
    return text.split(' ').splice(0, 19).join(' ') + '...';
  }

  return (
    <li key={product.id} className="bg-white shadow-sm p-4 rounded-lg min-h-[400px] flex flex-col justify-between relative overflow-hidden">
      {product.images.length > 0 ? (
        <Link 
          href={`${product.id}`}
        >
          <img
            src={product.images[0].src}
            className="w-full  h-[200px] object-cover"
          />
        </Link>
      ) : (
        <div className="w-full h-[200px] mb-4 flex justify-center items-center">
          <p className="text-gray-500 text-sm">No image</p>
        </div>
      )}
      <div className='z-20 relative'>
        <Link 
          className="text-md underline font-bold text-gray-700"
          href={`${product.id}`}
        >
          {name}
        </Link>
        <p className="text-gray-600 my-2 text-sm">{price}</p>
        {description === '--' ? null : (
          <div className="my-4 text-xs" dangerouslySetInnerHTML={{ __html: stripText(description) }}></div>
        )}
      </div>
      <div className="flex flex-col justify-between gap-2 z-20 relative">
        <ProductListItemAttributes
          attributes={attributes}
        />
        <div>
          <ProductListBuy
            id={product.id}
            name={product.name}
            price={product.price}
            images={product.images}
          />
        </div>
      </div>
    </li>
  )

}

export default ProductListItem;