"use client"

import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct, AppDispatch } from '../store';
import ProductBuy from '../components/ProductBuy';

export default function ProductPage ({ params }: { params: { product: string } }) {


  const productId: number = parseInt(params?.product);

  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch]);


  const { product, loading, error } = useSelector((state: any) => {
    return state.singleProduct;
  });



  if(loading) return (
    <div className='container mx-auto py-4 min-h-screen flex justify-center items-center'>
      <Spinner />
    </div>
  );


  if(error) {
    return (
      <div className='container mx-auto py-4 min-h-screen flex justify-center items-center'>
        <h1 className='text-2xl'>Product not found</h1>
      </div>
    )
  }

  return (
    <div className='bg-gray-100'>
      <div className='container mx-auto py-4 flex-wrap flex gap-2'>
        <div className='w-full lg:w-6/12 bg-white rounded-md p-4 shadow-lg'>
          <h1>{product?.name}</h1>
          {product?.price && <p className='my-2'>$ {product?.price}</p>}
          <div className='my-12'>
            {product?.description && (
              <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
            )}
          </div>
          <ProductBuy
            id={product?.id}
            name={product?.name}
            price={product?.price}
            images={product?.images}
          />
        </div>
        <div className='w-full lg:w-[calc(50%_-_2rem)] ml-auto'>
          {product?.images && product.images.length > 0 && (
            <span className='flex justify-center w-full'>
              <img src={product.images[0].src} alt={product.images[0].alt} className='max-w-[600px]' />
            </span>
          )}
        </div>
      </div>
    </div>
  )
  
};

