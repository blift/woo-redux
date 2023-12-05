import React from 'react';
import Link from 'next/link';
import ProductListItemAttributes from './ProductListItemAttributes';

interface ProductListItemProps {
  product: {
    id: number | string;
    name: string;
    description: string;
    price: number | string;
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
        <h2 className="text-xl font-bold text-gray-700">{name}</h2>
        <div className="my-4 text-xs" dangerouslySetInnerHTML={{ __html: description }}></div>
        <p className="text-gray-600">{price}</p>
      </div>
      <ProductListItemAttributes
        attributes={attributes}
      />
    </div>
  )

}

export default ProductListItem;