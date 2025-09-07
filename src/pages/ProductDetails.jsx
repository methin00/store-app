import React, { useEffect, useState } from 'react'
import { useParams, useRouteLoaderData } from 'react-router'
import ProductItem from "../components/ProductItem"
import Loading from '../components/Loading';
import requests from '../api/apiClient';
import { useCartContext } from '../context/cartContext';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from './cart/cartSlice';
import { fetchProductById, selectProductById } from './catalog/catalogSlice';
function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const product = useSelector(state => selectProductById(state, id))
  const {status} = useSelector(state => state.catalog)
  useEffect(() => {
    if(!product) dispatch(fetchProductById(id))
  }, [])
  if (status === "pendingFetchProductById" ) {
    return <Loading />
  }
  if (!product) {
    return <h1>Ürün bulunamadı.</h1>
  }
  return (
    <ProductItem product={product} />
  )
}

export default ProductDetailsPage