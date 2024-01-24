import { Box, Button, Card, CardContent, CardMedia, Container, FormControl, IconButton, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";

const Login = ():JSX.Element => {

    const [toLogIn, setToLogIn] = useState({
        username: "",
        password: ""
    })

    const username = (e: React.ChangeEvent<HTMLInputElement>) => {
        toLogIn.username = 'column';
        setToLogIn(toLogIn)
    }

    return (
        <Container>
            <FormControl>
                <Card sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 2 }}>
                            <TextField
                                required
                                id="outlined-required"
                                onChange={username}
                                label="Required"
                                defaultValue="Hello World"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                onChange={username}
                                label="Required"
                                defaultValue="Hello World"
                            />
                            <Button variant="outlined">Outlined</Button>
                        </Box>
                    </Box>
                </Card>
            </FormControl>
        </Container>
    )
}

export default Login;