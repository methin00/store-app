import { Alert, Box, Button, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import requests from '../../api/apiClient'
import { currencyTRY } from '../../utils/formats'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useCartContext } from '../../context/cartContext';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, deleteItemFromCart, setCart } from './cartSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

function CartPage() {

  const dispatch = useDispatch()
  const { cart, status } = useSelector(state => state.cart)
  const subTotal = cart?.cartItems.reduce((total, item) => total + (item.product.price * item.product.quantity), 0)
  const tax = subTotal * 0.2
  const total = tax + subTotal

  if (!cart || cart.cartItems.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Alert severity='warning'>Sepetinizde ürün bulunamadı.</Alert>
      </Box>)

  }


  return (
    <>
      <Paper variant="elevation" elevation={24} square={false} sx={{borderRadius:4}}>
        <TableContainer sx={{ bgcolor: "white" }}>
          <Table>
            <TableHead></TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: 100 }}></TableCell>
                <TableCell>Ürün</TableCell>
                <TableCell sx={{ width: 120 }}>Fiyat</TableCell>
                <TableCell sx={{ width: 130 }}>Adet</TableCell>
                <TableCell sx={{ width: 120 }}>Toplam</TableCell>
                <TableCell sx={{ width: 50 }}></TableCell>
              </TableRow>
              {
                cart.cartItems?.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img style={{ width: "100%" }} src={"http://localhost:5000/images/" + item.product.image} />
                      </TableCell>
                      <TableCell>{item.product.title}</TableCell>
                      <TableCell>{currencyTRY.format(item.product.price)}</TableCell>
                      <TableCell>
                        <IconButton >
                          {status == "pendingAdd" + item.product.productId ? <CircularProgress color="error" size={20} /> :
                            <AddCircleIcon
                              onClick={() => dispatch(addItemToCart({ productId: item.product.productId }))} />
                          }
                        </IconButton>
                        {item.product.quantity}
                        <IconButton>
                          {status == "pendingDelete" + item.product.productId + "single" ? <CircularProgress color="error" size={20} /> :
                            <RemoveCircleIcon onClick={() => dispatch(deleteItemFromCart({ productId: item.product.productId, quantity: 1, key: "single" }))} />
                          }
                        </IconButton>
                      </TableCell>
                      <TableCell>{currencyTRY.format(item.product.quantity * item.product.price)}</TableCell>
                      <TableCell>
                        <IconButton>
                          {status == "pendingDelete" + item.product.productId + "all" ? <CircularProgress color="error" size={20} /> :
                            <DeleteForeverIcon onClick={() => {
                              dispatch(deleteItemFromCart({ productId: item.product.productId, quantity: item.product.quantity, key: "all" }));
                              toast.success("Ürün sepetten silindi!", {
                                onClick: () => { navigate("/cart") },
                                style: { cursor: "pointer" },
                                closeOnClick: true
                              })
                            }
                            } />
                          }
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })
              }
              <TableRow>
                <TableCell colSpan={4} align='right'>Ara Toplam</TableCell>
                <TableCell colSpan={2} align='left' >{currencyTRY.format(subTotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} align='right'>Vergi</TableCell>
                <TableCell colSpan={2} align='left' >{currencyTRY.format(tax)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} align='right'>Toplam</TableCell>
                <TableCell colSpan={2} align='left' >{currencyTRY.format(total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
          <Button component={Link} to="/checkout" variant="contained" color="warning" sx={{ my: 3, mx:3, color: "#ffffffff" }}>SEPETİ ONAYLA</Button>
        </Box>
      </Paper>
    </>
  )
}

export default CartPage