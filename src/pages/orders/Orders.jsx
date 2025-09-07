import React, { useEffect, useState } from 'react'
import requests from '../../api/apiClient'
import { Alert, Avatar, Button, Chip, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Loading from '../../components/Loading'
import { currencyTRY } from '../../utils/formats'
import CloseIcon from "@mui/icons-material/Close"

function OrdersPage() {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState({})
    const [orders, setOrders] = useState([])
    const subTotal = selectedOrder?.orderItems?.reduce((total, item) => total + (item.price * item.quantity), 0)
    const tax = subTotal * 0.2
    const total = tax + subTotal
    useEffect(() => {
        setLoading(true)
        requests.orders.getOrders()
            .then((result) => { setOrders(result); })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])
    function handleDialogClose() {
        setSelectedOrder({})
    }
    useEffect(() => {
        setOpen(!open)
        console.log(selectedOrder)
    }, [selectedOrder])
    if (loading)
        return <Loading />
    if (!orders || orders?.length === 0)
        return <Alert severity='warning'>Henüz sipariş oluşturmadınız.</Alert>

    return (
        <>
            <TableContainer component={Paper} elevation={24}>
                <Table sx={{ minWidth: "650px" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sipariş Numarası</TableCell>
                            <TableCell>Sipariş Durumu</TableCell>
                            <TableCell>Sipariş Tarihi</TableCell>
                            <TableCell>Sipariş Toplamı</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orders?.map((order) => {
                                return (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>
                                            <Chip variant="outlined" color='inherit' label={order.orderStatus} />
                                        </TableCell>
                                        <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                                        <TableCell>{currencyTRY.format(order.total)}</TableCell>
                                        <TableCell>
                                            <Button color="warning" variant='contained' size='small' onClick={() => setSelectedOrder(order)}>Detaylar</Button>
                                        </TableCell>
                                    </TableRow>)
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog onClose={handleDialogClose} open={open} fullWidth maxWidth="lg">
                <DialogTitle>Sipariş Numarası: #{selectedOrder.id} - <Chip variant="outlined" color='inherit' label={selectedOrder.orderStatus} /></DialogTitle>
                <IconButton sx={{ position: "absolute", right: 8, top: 8 }} onClick={handleDialogClose}>
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <Paper sx={{ mb: 3, mt: 3, p: 3 }} variant='outlined'>
                        <Typography variant='h6' gutterBottom>Teslimat Bilgileri</Typography>
                        <Typography variant='subtitle2' gutterBottom>{selectedOrder?.firstName} {selectedOrder.lastName}</Typography>
                        <Typography variant='subtitle2' gutterBottom>{selectedOrder?.phone}</Typography>
                        <Typography variant='subtitle2' gutterBottom>{selectedOrder?.address} / {selectedOrder.city}</Typography>
                    </Paper>
                    <TableContainer component={Paper} sx={{ width: '100%', mt: 3 }} variant="outlined">
                        <Table sx={{ minWidth: 650, tableLayout: 'auto' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '4%' }}></TableCell>
                                    <TableCell style={{ width: '40%' }}>Ürün</TableCell>
                                    <TableCell style={{ width: '16%' }}>Adet</TableCell>
                                    <TableCell style={{ width: '24%' }}>Fiyat</TableCell>
                                    <TableCell style={{ width: '16%' }}>Toplam</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    selectedOrder.orderItems?.map((item) => {
                                        return (

                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <Avatar variant='square' src={`http://localhost:5000/images/${item.image}`} />
                                                </TableCell>
                                                <TableCell>{item.title}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>{currencyTRY.format(item.price)}</TableCell>
                                                <TableCell>{currencyTRY.format((item.quantity * item.price))}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                                <TableRow>
                                    <TableCell colSpan={4} align='right' style={{ width: "84%" }}>Ara Toplam:</TableCell>
                                    <TableCell align='left' style={{ width: "16%" }}>{currencyTRY.format(subTotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={4} align='right' style={{ width: "84%" }}>Vergi:</TableCell>
                                    <TableCell align='left' style={{ width: "16%" }}>{currencyTRY.format(tax)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={4} align='right' style={{ width: "84%" }}>Toplam:</TableCell>
                                    <TableCell align='left' style={{ width: "16%" }}>{currencyTRY.format(total)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default OrdersPage