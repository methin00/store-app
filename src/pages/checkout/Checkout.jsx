import { Box, Button, Grid, Paper, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
import Info from './Info'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'
import { useState, useEffect } from 'react'
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { FormProvider, useForm } from 'react-hook-form'
import requests from '../../api/apiClient'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart } from '../cart/cartSlice'
import { Link, useNavigate } from 'react-router'
import HomePage from '../Home'

function CheckoutPage() {
    const steps = ["Teslimat Bilgileri", "Kart Bilgileri", "Sipariş Özeti"]
    const { cart } = useSelector(state => state.cart)
    const [activeStep, setActiveStep] = useState(0)
    const [orderId, setOrderId] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const methods = useForm()

    // Debug logları ekle
    useEffect(() => {
        console.log('=== CHECKOUT DEBUG ===');
        console.log('Cart from Redux:', cart);
        console.log('Cart Items Length:', cart?.cartItems?.length || 0);
        console.log('OrderId:', orderId);
        console.log('Cookies:', document.cookie);
        console.log('======================');

        // Eğer cart yok ama orderId da yoksa, cart'ı yeniden yükle
        if (!orderId && (!cart || !cart.cartItems || cart.cartItems.length === 0)) {
            console.log('Cart boş, yeniden yükleniyor...');
            dispatch(getCart());
        }
    }, [cart, orderId, dispatch]);

    // Cart kontrolü - biraz geciktirelim ki getCart çağrısı tamamlansın
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!orderId && (!cart || !cart.cartItems || cart.cartItems.length === 0)) {
                console.log('Cart hala boş, ana sayfaya yönlendiriliyor...');
                navigate("/");
            }
        }, 1000); // 1 saniye bekle

        return () => clearTimeout(timer);
    }, [cart, orderId, navigate]);

    function getStep(index) {
        switch (index) {
            case 0:
                return <AddressForm />
            case 1:
                return <PaymentForm />
            case 2:
                return <Review />
            default:
                return
        }
    }

    function handlePrevious() {
        setActiveStep(activeStep - 1)
    }

    async function handleNext(data) {
        if (activeStep === 2) {
            setLoading(true)
            try {
                console.log('Sipariş veriliyor:', data)
                const result = await requests.orders.createOrder(data)
                setOrderId(result.orderId)
                setActiveStep(prev => prev + 1)
                dispatch(clearCart())
            }
            catch (error) {
                console.log('Sipariş hatası:', error)
            }
            finally {
                setLoading(false)
            }
        }
        else {
            setActiveStep(prev => prev + 1)
        }
    }

    // Loading state ekle
    if (!orderId && (!cart || loading)) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <FormProvider {...methods}>
            <Paper>
                <Grid container spacing={3}>
                    {!orderId &&
                        (<Grid size={4} sx={{ borderRight: "1px solid", borderColor: "divider", p: 3 }}>
                            <Info />
                        </Grid>)
                    }
                    <Grid size={!orderId ? 8 : 12} sx={{ p: 3 }} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                        <Box>
                            <Stepper activeStep={activeStep} sx={{ height: 40, mb: 3 }}>
                                {
                                    steps.map((step, idx) =>
                                    (<Step key={step}>
                                        <StepLabel sx={{
                                            '& .MuiStepIcon-root': {
                                                color: '#ccc',
                                            },
                                            '& .Mui-completed .MuiStepIcon-root': {
                                                color: '#e55353ff',
                                            },
                                            '& .Mui-active .MuiStepIcon-root': {
                                                color: '#ffae00ff',
                                            },
                                            '& .MuiStepLabel-label': {
                                                color: '#888',
                                            },
                                            '& .Mui-completed .MuiStepLabel-label': {
                                                color: '#e55353ff',
                                            },
                                            '& .Mui-active .MuiStepLabel-label': {
                                                color: '#ffae00ff',
                                            },
                                        }}>{step}</StepLabel>
                                    </Step>)
                                    )
                                }
                            </Stepper>
                            {getStep(activeStep)}
                        </Box>
                        <Box>
                            {
                                activeStep === steps.length ? (
                                    <Stack>
                                        <Typography variant='h5'>Siparişinizi aldık!</Typography>
                                        <Typography variant='body1'>Sipariş numaranız: <strong>{orderId}</strong></Typography>
                                        <Typography gutterBottom variant='body1'>Sipariş durumunuzu siparişlerim sayfasından takip edebilirsiniz.</Typography>
                                        <Button variant='contained' component={Link} to="/orders" color='warning'>SİPARİŞLERİME GİT</Button>
                                    </Stack>
                                ) :
                                    (
                                        <form onSubmit={methods.handleSubmit(handleNext)}>
                                            {activeStep === 0 ? (
                                                <Box mt={2} justifyContent={'space-between'} display={'flex'}>
                                                    <div />
                                                    <Button startIcon={<ArrowForward />} variant='text' color='warning' type="submit">İLERİ</Button>
                                                </Box>
                                            ) : (
                                                <Box mt={2} justifyContent={'space-between'} display={'flex'}>
                                                    <Button startIcon={<ArrowBack />} variant='text' color='warning' onClick={handlePrevious}>GERİ</Button>
                                                    <Button loading={loading}
                                                        sx={{ "& .MuiCircularProgress-root": { color: "#ff0000ff" } }}
                                                        startIcon={<ArrowForward />}
                                                        variant='text'
                                                        color='warning'
                                                        type="submit">
                                                        {activeStep === 2 ? "SİPARİŞİ TAMAMLA" : "İLERİ"}
                                                    </Button>
                                                </Box>
                                            )}
                                        </form>
                                    )
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </FormProvider>
    )
}

export default CheckoutPage