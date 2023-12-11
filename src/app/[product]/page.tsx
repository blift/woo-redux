"use client"

import React, { useState } from 'react';
import Spinner from '../components/Spinner';

export default function ProductPage ({ params }: { params: { product: string } }) {

  const productId = params?.product;

  const [loading, setLoading] = useState<boolean>(false);


  if(loading) return (
    <div className='container mx-auto py-4 min-h-screen flex justify-center items-center'>
      <Spinner />
    </div>
  );

  return (
   <div className='container mx-auto py-4'>
      <h1>Product Page</h1>
   </div>
  )
  
};

