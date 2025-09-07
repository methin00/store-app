import { Alert, AlertTitle, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import requests from '../../api/apiClient';
import { useState } from 'react';

export default function ErrorsPage() {
    const [validationError, setValidationError] = useState(null)

    function getValidationError() {
        requests.errors.get403Error().catch(data => setValidationError(data))
    }
    return (
        <Box>
            {validationError && validationError.errors &&
                <Alert severity="error" sx={{mb:2}}>
                    <AlertTitle>{validationError.message}</AlertTitle>
                    <List>
                        {validationError.errors.map((error, index) => <ListItem key={index}>
                            <ListItemText>{error}</ListItemText>
                        </ListItem>)}
                    </List>
                </Alert>}
            <Button variant='outlined' color="error" sx={{ mr: "5px" }} onClick={() => { requests.errors.get404Error() }}>Not Found Error</Button>
            <Button variant='outlined' color="error" sx={{ mr: "5px" }} onClick={() => { requests.errors.get400Error() }}>Bad Request Error</Button>
            <Button variant='outlined' color="error" sx={{ mr: "5px" }} onClick={() => { requests.errors.get401Error() }}>Unauthorized Error</Button>
            <Button variant='outlined' color="error" sx={{ mr: "5px" }} onClick={() => { getValidationError() }}>Validation Error</Button>
            <Button variant='outlined' color="error" sx={{ mr: "5px" }} onClick={() => { requests.errors.get500Error() }}>Server Error</Button>

        </Box>
    )
}