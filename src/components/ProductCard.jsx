import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useNavigate } from "react-router";
import { currencyTRY } from "../utils/formats"
import requests from "../api/apiClient";
import { colors } from "./Navbar";
import { useCartContext } from "../context/cartContext";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, setCart, setStatus } from "../pages/cart/cartSlice";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
    const [hover, setHover] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const dispatch = useDispatch()
    const { status } = useSelector(state => state.cart)
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
        dispatch(addItemToCart({ productId: product.id, quantity: 1 }))
        toast.success("Ürün sepetinize eklendi!", {
            onClick: () => { navigate("/cart") },
            style: { cursor: "pointer" },
            closeOnClick: true
        })
        setJustAdded(true);
    };

    return (
        <Card sx={{ height: "412px", width: "256px", display: "flex", flexDirection: "column" }}>
            <CardActionArea
                sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}
                onMouseEnter={() => { setHover(true) }}
                onMouseLeave={() => { setHover(false) }}
                component={Link}
                to={product.id}
            >
                <CardMedia sx={{ height: "256px", width: "100%" }} image={`http://localhost:5000/images/${product.image}`}></CardMedia>

                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", p: 2 }}>
                    <Box>
                        {hover ? <Typography gutterBottom variant="body2" color="textPrimary" component="h2"> {product.title} </Typography> :
                            <Typography gutterBottom variant="body2" color="textSecondary" component="h2"> {product.title} </Typography>}
                        <Typography variant="body1"
                            sx={{ maxHeight: "100%", fontWeight: "bold" }}
                            color="textPrimary">{currencyTRY.format(product.price)}</Typography>

                    </Box>
                    <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        {favorite ? <FavoriteIcon color="warning" onClick={(e) => { setFavorite(false); e.stopPropagation(); e.preventDefault(); }} />
                            : <FavoriteBorderIcon color="warning" onClick={(e) => { setFavorite(true); e.stopPropagation(); e.preventDefault(); }} />}

                        {hover && (
                            <>
                                {status === "pendingAdd" + product.id && (
                                    <Button
                                        size="small"
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
                                        size="small"
                                        sx={{ bgcolor: "#aeff00", color: "#fff" }}
                                        disabled
                                    >
                                        SEPETE EKLENDİ!
                                    </Button>
                                )}

                                {status === "idle" && !justAdded && (
                                    <Button
                                        size="small"
                                        sx={{ bgcolor: colors.button, color: "#fff" }}
                                        onClick={(e) => handleClick(e)}
                                    >
                                        Sepete Ekle
                                    </Button>
                                )}
                            </>
                        )}
                    </CardActions>
                </CardContent>
            </CardActionArea>
        </Card >)
}