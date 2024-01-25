import { Box, Button, Card, CardContent, CardMedia, Container, FormControl, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateUserMutation } from "../../services/userService";

const Register = ():JSX.Element => {

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            username: "",
            name: "",
            password: "",
        },
    })

    const [createUser] = useCreateUserMutation();

    const onSubmit = (values: { username: string, name: string, password: string }) => {
        const {username, password, name} = values;
        createUser({username, password, name}).unwrap();
        reset();
    }

    return (
        <Container>
            {"REGISTER"}
            <FormControl component={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Card sx={{ display: 'flex', p:2 }}>
                    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                        <TextField
                            fullWidth
                            required
                            id="name"
                            label="Full name"
                            {...register("name")}
                        />
                        <TextField
                            fullWidth
                            required
                            id="username"
                            label="Username"
                            {...register("username")}
                        />
                        <TextField
                            fullWidth
                            required
                            id="password"
                            label="Password"
                            {...register("password")}
                        />
                        <Button 
                            fullWidth
                            variant="outlined"
                            type="submit"
                        >
                            Register
                        </Button>
                    </Stack>
                </Card>
            </FormControl>
        </Container>
    )
}

export default Register;