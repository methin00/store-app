import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigation, useRouteLoaderData } from 'react-router'
import ProductList from "../components/ProductList"
import Loading from '../components/Loading'
import requests from '../api/apiClient'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectAllProducts } from './catalog/catalogSlice'
function ProductsPage() {
  const dispatch = useDispatch();
  const loadedProducts = useSelector(selectAllProducts)
  const {status, isLoaded} = useSelector((state) => state.catalog)
  useEffect(() => {
    if(!isLoaded) dispatch(fetchProducts())
  }, [isLoaded])
  if (status === "pendingFetchProducts") {
    return <Loading />
  }

  return <ProductList products={loadedProducts} />
}

export default ProductsPage