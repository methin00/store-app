import { Box, Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import { currencyTRY } from '../utils/formats';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../pages/cart/cartSlice';
import { useEffect, useState } from 'react';
import { colors } from './Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
export default function ProductItem({ product }) {
    const { status } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [justAdded, setJustAdded] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        let timer;
        if (justAdded) {
            timer = setTimeout(() => setJustAdded(false), 1000);
        }
        return () => clearTimeout(timer);
    }, [justAdded]);
    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!product?.id) return;
        dispatch(addItemToCart({ productId: product.id, quantity: 1 }));
        setJustAdded(true);
        toast.success("Ürün sepetinize eklendi!", {
            onClick: () => { navigate("/cart") },
            style: { cursor: "pointer" },
            closeOnClick: true
        })
    };
    return (
        <Grid
            container
            spacing={2}
            sx={{
                display: "flex", flexDirection: "row", alignItems: "stretch", flexWrap: "nowrap", "@media (max-width: 899px)": {
                    flexWrap: "wrap"
                }
            }}
        >
            <Grid xs={12} md={6} lg={4} sx={{ minWidth: "0", flexShrink: "0" }}>
                <Paper variant="elevation" sx={{ p: 3, width: "100%" }}>
                    <img
                        src={`http://localhost:5000/images/${product.image}`}
                        alt={product.title}
                        style={{ maxWidth: "400px", width: "100%", height: "auto", objectFit: "cover" }}>
                    </img>
                </Paper>
            </Grid>
            <Grid xs={12} md={6} lg={8} >
                <Paper variant='outlined' sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", height: "100%", bgcolor: "transparent", p: 2 }}>
                    <Box >
                        <Typography variant='h5' gutterBottom>{product.title}</Typography>
                        <Typography variant="body2">{product.description}</Typography>
                    </Box>
                    <Box style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
                        <Box>
                            <Typography variant="h4" color="textPrimary" sx={{ fontWeight: "bold" }}>{currencyTRY.format(product.price)}</Typography>
                        </Box>
                        <Box style={{ padding: "0px 10px", flexWrap: "nowrap", flexShrink: 0 }}>
                            <IconButton>
                                <FavoriteBorderIcon sx={{ fontSize: "32px" }}></FavoriteBorderIcon>
                            </IconButton>

                            {status === "pendingAdd" + product.id && (
                                <Button
                                    loading={true}
                                    sx={{
                                        bgcolor: colors.button, color: "#fff",
                                        "& .MuiCircularProgress-root": { color: "#fff" },
                                    }}
                                >
                                    Sepete Ekle
                                </Button>
                            )}

                            {status === "idle" && justAdded && (
                                <Button
                                    sx={{ bgcolor: colors.button, color: "#fff" }}
                                    disabled
                                >
                                    Sepete Ekle
                                </Button>
                            )}

                            {status === "idle" && !justAdded && (
                                <Button
                                    sx={{ bgcolor: colors.button, color: "#fff" }}
                                    onClick={(e) => handleClick(e)}
                                >
                                    Sepete Ekle
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid >
    );
}