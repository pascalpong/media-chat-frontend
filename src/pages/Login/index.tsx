import { Box, Button, Card, Container, FormControl, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../services/authenticationService";
import { useNavigate } from "react-router-dom";

const Login = ():JSX.Element => {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({
        defaultValues: {
          username: "",
          password: "",
        },
    })

    const [login] = useLoginMutation();

    const onSubmit = async (values: {username: string, password: string}) => {
        const response = await login(values).unwrap();
        localStorage.setItem('user', JSON.stringify({ ...response }));
        navigate('/chat')
    }

    return (
        <Container>
            <FormControl component={"form"}>
                <Card sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                <TextField
                                    fullWidth
                                    required
                                    label="username"
                                    {...register('username')}
                                />
                                <TextField
                                    fullWidth
                                    required
                                    label="password"
                                    {...register('password')}
                                />
                                <Button 
                                    fullWidth
                                    variant="outlined"
                                    onClick={handleSubmit(onSubmit)}
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