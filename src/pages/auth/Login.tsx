import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { AppContext, ContextType } from "../../Provider";
import { useContext } from "react";

interface FormProps {
email?: string;
password?: string;
}

const schema = yup
.object({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
})
.required();

const Login = () => {
const context = useContext<ContextType>(AppContext);
const setOpen = context?.setOpen;
const setMessage = context?.setMessage;

const {
    handleSubmit,
    control,
    formState: { errors },
} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
        email: undefined,
        password: undefined,
    },
});

const handleError = (message: string) => {
    setOpen?.(true);
    setMessage?.(message);
};

const submit = async (data: FormProps) => {
    try {
    const response = await axios.post( "https://mock-api.arikmpt.com/api/user/login",
        {
            email: data.email,
            password: data.password,
        }
    );

    window.localStorage.setItem("token", response.data.data.token);
    navigate("/");
    } catch (error) {
        const err = error as AxiosError as any;
        const responseErrors = err.response?.data?.errors!;
        if (Array.isArray(responseErrors)) {
            return;
        }
        handleError(responseErrors);
    }
};
const navigate = useNavigate();

const handleRegister = () => {
    navigate("/register");
};

return (
    <div className="w-full h-screen min-h-screen bg-gradient-to-b from-orange-300 to-violet-300 flex items-center justify-center">
        <div className="w-[300px] bg-white p-5 rounded-xl flex flex-col justify-around items-center">
        <Typography sx={{ fontSize: 14 }}>
            Please Login To Continue
        </Typography>
        <div className="mb-4 w-full">
            <Controller
            name="email"
            control={control}
            render={({ field }) => (
                <TextField
                placeholder="email"
                value={field.value}
                onChange={field.onChange}
                label="Email"
                variant="outlined"
                size="small"
                className="mt-1 p-2 w-full border rounded-md"
                helperText={errors.email?.message}
                error={!!errors.email}
            />
            )}
        />
        </div>
        <div className="mb-4 w-full">
            <Controller
            name="password"
            control={control}
            render={({ field }) => (
                <TextField
                type="password"
                placeholder="password"
                value={field.value}
                onChange={field.onChange}
                label="Password"
                variant="outlined"
                size="small"
                className="mt-1 p-2 w-full border rounded-md"
                helperText={errors.password?.message}
                error={!!errors.password}
            />
            )}
        />
        </div>
        <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit(submit)}
        >
        Login
        </Button>
        <Typography sx={{ fontSize: 14 }}>Or</Typography>
        <Button variant="outlined" fullWidth onClick={handleRegister}>
        Register
        </Button>
        </div>
    </div>
);
};

export default Login;
