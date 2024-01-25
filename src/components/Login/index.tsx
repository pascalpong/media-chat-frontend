import { Box, Button, Card, CardContent, CardMedia, Container, FormControl, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = ():JSX.Element => {

    const [toLogIn, setToLogIn] = useState({
        username: "",
        password: ""
    })

    const { register, handleSubmit } = useForm({
        defaultValues: {
          username: "",
          password: "",
        },
    })

    return (
        <Container>
            <FormControl>
                <Card sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Required"
                                    defaultValue=""
                                    
                                />
                                <TextField
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Required"
                                    defaultValue=""
                                />
                                <Button 
                                    fullWidth
                                    variant="outlined"
                                >
                                    Outlined
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Card>
            </FormControl>
        </Container>
    )
}

export default Login;