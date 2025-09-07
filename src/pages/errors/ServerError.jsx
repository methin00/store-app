import { Alert, Button, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";
import { colors } from "../../components/Navbar";

export default function ServerErrorPage() {
    const { state } = useLocation()
    const colorlist = colors
    return (
        <Paper sx={{ bgcolor: colorlist.error, p: 3 }}>
            {state?.error ? (
                <>
                    <Typography gutterBottom variant="h4">{state.error.message} - {state.status}</Typography>
                    <Alert severity="error">{state.error.details || "Bilinmeyen bir hata oluştu"} </Alert>
                </>
            ) : (
                <>
                    <Typography variant="h4">Server Error</Typography>
                    <Alert severity="error">Bilinmeyen bir hata oluştu.</Alert>
                </>
            )}
            <Button variant="contained" component={Link} to="/" sx={{bgcolor:colorlist.button, mt:2}}>Ana Sayfaya Dön</Button>
        </Paper>
    )
}