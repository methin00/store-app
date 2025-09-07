import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { currencyTRY } from '../../utils/formats'
import { useNavigate } from 'react-router'

function Info() {
    const { cart } = useSelector(state => state.cart)
    const subTotal = cart?.cartItems.reduce((total, item) => total + (item.product.price * item.product.quantity), 0)
    const tax = subTotal * 0.2
    const total = tax + subTotal
    const navigate = useNavigate()

    return (
        <Box display={"flex"} flexDirection={'column'} justifyContent={'space-between'} height={"100%"}>
            <List>
                {
                    cart?.cartItems?.map((item) => {
                        return (
                            <ListItem sx={{ py: 1, px: 1 }}>
                                <ListItemAvatar>
                                    <Avatar variant='square' src={`http://localhost:5000/images/${item.product.image}`} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.product.title}
                                    secondary={`x${item.product.quantity}`}
                                    slotProps={{
                                        primary: {
                                            noWrap: true,
                                            sx: {
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                maxWidth: 180
                                            }
                                        },
                                        secondary: {
                                            noWrap: true,
                                            sx: {
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                maxWidth: 80
                                            }
                                        }
                                    }} />
                                <Typography variant="body2">{currencyTRY.format(item.product.price)}</Typography>
                            </ListItem>
                        )
                    })
                }
            </List>
            <Box display={'flex'} justifyContent={'space-between'} flexDirection={'row'} alignItems={'flex-end'}>
                <Typography variant='subtitle2'>Toplam (KDV Dahil):</Typography>
                <Typography variant='h5'>{currencyTRY.format(total)}</Typography>
            </Box>
        </Box>
    )
}

export default Info