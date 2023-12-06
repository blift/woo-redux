import React from 'react';
import Link from 'next/link';
import ProductListItemAttributes from './ProductListItemAttributes';
import ProductListBuy from './ProductListBuy';

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

  return (
    <div key={product.id} className="bg-white shadow-sm p-4 rounded-lg min-h-[400px] flex flex-col justify-between">
      <div>
        <Link 
          className="text-lg underline font-bold text-gray-700"
          href={`${product.id}`}
        >
          {name}
        </Link>
        <div className="my-4 text-xs" dangerouslySetInnerHTML={{ __html: description }}></div>
        <p className="text-gray-600">{price}</p>
      </div>
      <div className="flex flex-col gap-2">
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
    </div>
  )

}

export default ProductListItem;