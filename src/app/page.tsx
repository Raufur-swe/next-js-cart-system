'use client'
import React, { useEffect } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { fetchProducts } from '../redux/features/productSlice'
import ProductCard from '../components/ProductCard'

const page = () => {
  const dispatch = useAppDispatch();
  const { products , loading} = useAppSelector((state)=>state.products);
  
  useEffect(()=>{
    if(products.length=== 0){

      dispatch(fetchProducts())
    }
  },[dispatch, products.length])
  if (loading) return <p className='text-black'>loading.......</p>
  return (
    <div>
    {products.map((p)=>(
      <ProductCard key={p._id} product={p} />
    ))}
    </div>
  )
}

export default page