import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts, RootState, AppDispatch } from "../store";

import Spinner from "./Spinner";
import ProductListItem from "./ProductListItem";

export default function ProductsList() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, perPage: 10 }))
  }, [dispatch])


  const {products, loading, error, pageNumber, hasMore} = useSelector((state: RootState) => {

    return state.product;

  });


  const handleLoadMore = () => {
    // Current scroll position
    const currentScrollPosition = window.scrollY;

    dispatch(fetchProducts({ page: pageNumber, perPage: 10 })).then(() => {
      window.scrollTo(0, currentScrollPosition);
    });
  };


  if(loading) return (
    <div className="flex justify-center items-center w-full">
      <Spinner/>
    </div>
  )

  if(error) return <div>{error}</div>

  return (
    <div className="flex flex-col container mx-auto">
      <h2 className="text-2xl uppercase text-left mb-4 font-bold">Shop</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full relative">
        {products && products.length > 0 && products.map((product) => {
          return (
            <ProductListItem 
              key={product.id} 
              product={product} 
            />
          )
        })}
      </div>
      {hasMore && (
        <button 
          onClick={handleLoadMore}
          className="bg-blue-500 text-white px-4 py-2 rounded-sm text-sm mt-4 max-w-[140px] mx-auto"
        >
          Load More
        </button>
      )}
    </div>
  )

}