import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts, RootState, AppDispatch } from "../store";

import Spinner from "./Spinner";
import ProductListItem from "./ProductListItem";

export default function ProductsList() {

  const dispatch = useDispatch<AppDispatch>();
  
  const {products, loading, error, pageNumber, hasMore} = useSelector((state: RootState) => {

    return state.product;

  });

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts({ page: 1, perPage: 10 }));
    }
  }, [dispatch])



  const handleLoadMore = () => {
    // Current scroll position
    const currentScrollPosition = window.scrollY;

    const incrementPageNumber = pageNumber + 1;

    dispatch(fetchProducts({ page: incrementPageNumber, perPage: 10 })).then(() => {
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
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full relative">
        {products && products.length > 0 && products.map((product) => {
          return (
            <ProductListItem 
              key={product.id} 
              product={product} 
            />
          )
        })}
      </ul>
      {hasMore && (
        <button 
          onClick={handleLoadMore}
          className="bg-transparent border-2 border-black text-black px-4 py-2 rounded-lg text-sm mt-4 max-w-[140px] mx-auto transition-colors hover:bg-black hover:text-white"
        >
          Load More
        </button>
      )}
    </div>
  )

}