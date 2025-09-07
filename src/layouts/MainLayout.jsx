import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import { Container } from '@mui/material'
import Loading from '../components/Loading'
import { ToastContainer } from 'react-toastify'

function MainLayout() {
    return (
        <>
            <ToastContainer theme="colored" position='bottom-left' autoClose="1000" />
            <Navbar />
            <Container sx={{ mt: "25px", mb: "25px" }}>
                <Outlet />
            </Container>
        </>
    )
}

export default MainLayout