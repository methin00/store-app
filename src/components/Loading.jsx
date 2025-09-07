import { Backdrop, Box, CircularProgress } from '@mui/material';
export default function Loading() {
    return (
        <Backdrop open={true} invisible={false}>
            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100vh"}}>
                <CircularProgress color="warning"></CircularProgress>
            </Box>
       </Backdrop>
   )
}