'use client'
import React, { useEffect } from 'react'
import { getProductes } from '../api/productFetch'

const page = () => {
  useEffect(()=>{
    getProductes()
  },[])
  return (
    <div>
      products
    </div>
  )
}

export default page