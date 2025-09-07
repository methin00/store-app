import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Button, ListItemIcon, Menu, MenuItem, Toolbar } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import { Link, NavLink } from 'react-router';
import Badge from '@mui/material/Badge';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../pages/account/accountSlice';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useState } from 'react';

export const colors = {
    icon: "warning.dark",
    main: "#f3d9cbff",
    button: "#bc5959ff",
    error: "#f0c6c6ff"
};

function Navbar() {
    const { cart } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.account);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();

    const itemCount = cart?.cartItems.reduce((total, item) => total + item.product.quantity, 0);

    const links = [
        { title: "Ana Sayfa", to: "/home" },
        { title: "Ürünler", to: "/products" },
    ];

    const authLinks = [
        { title: "Giriş Yap", to: "/login" },
        { title: "Kayıt Ol", to: "/register" }
    ];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: colors.main }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <IconButton component={Link} to="/">
                        <StoreIcon sx={{ color: colors.icon }} />
                    </IconButton>

                    {links.map(link => (
                        <Button key={link.title} component={NavLink} to={link.to} sx={{ color: colors.button }}>
                            {link.title}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ pr: 1 }}>
                        {user ? (
                            <>
                                <Button
                                    id="user-button"
                                    onClick={handleClick}
                                    endIcon={<ArrowDropDownIcon />}
                                    sx={{ color: colors.button }}
                                >
                                    {user.username}
                                </Button>

                                <Menu
                                    id="user-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    keepMounted
                                    sx={{
                                        '& .MuiPaper-root': {
                                            bgcolor: colors.main,
                                            color: colors.button,
                                        },
                                        '& .MuiMenuItem-root': {
                                            color: colors.button,
                                            '&:hover': {
                                                bgcolor: '#ff6600ff',
                                                color: "#fff"
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem
                                        component={Link}
                                        to="/orders"
                                        sx={{
                                            '&:hover': {
                                                bgcolor: '#ff6600ff',
                                                '& .MuiListItemIcon-root, & .MuiTypography-root': {
                                                    color: '#fff',
                                                },
                                            }
                                        }}
                                        onClick={handleClose}
                                    >
                                        <ListItemIcon>
                                            <ListAltIcon sx={{ color: colors.button }} />
                                        </ListItemIcon>
                                        Siparişlerim
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            dispatch(logout());
                                            handleClose();
                                        }}
                                        sx={{
                                            '&:hover': {
                                                bgcolor: '#ff6600ff',
                                                '& .MuiListItemIcon-root, & .MuiTypography-root': {
                                                    color: '#fff',
                                                },
                                            }
                                        }}
                                    >
                                        <ListItemIcon>
                                            <LogoutIcon sx={{ color: colors.button }} />
                                        </ListItemIcon>
                                        Çıkış Yap
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            authLinks.map(link => (
                                <Button key={link.title} component={NavLink} to={link.to} sx={{ color: colors.button }}>
                                    {link.title}
                                </Button>
                            ))
                        )}
                    </Box>

                    <Badge badgeContent={itemCount} color="warning" component={NavLink} to="/cart">
                        <ShoppingBasketIcon sx={{ color: colors.icon, cursor: "pointer" }} />
                    </Badge>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
