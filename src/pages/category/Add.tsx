import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { AppContext, ContextType } from "../../Provider";
import { useContext } from "react";

interface FormProps {
    name?: string;
    is_active?: boolean;
}

const schema = yup
    .object({
    name: yup.string().required(),
    is_active: yup.boolean().required(),
    })
    .required();

const Add: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext<ContextType>(AppContext);
    const setOpen = context?.setOpen;
    const setMessage = context?.setMessage;

    const {
    handleSubmit,
    control,
    formState: { errors },
    } = useForm<FormProps>({
    resolver: yupResolver(schema),
    });

    const token = window.localStorage.getItem('token');

    const handleError = (message: string) => {
    setOpen?.(true);
    setMessage?.(message);
    };

    const onSubmit = async (data: FormProps) => {
    try {
        await axios.post('https://mock-api.arikmpt.com/api/category/create', {
        name: data.name,
        is_active: data.is_active,
        }, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        });

        navigate('/');
    } catch (error) {
        const err = error as AxiosError as any;
        const responseErrors = err.response?.data?.errors;
        if (Array.isArray(responseErrors)) {
        return;
        }
        handleError(responseErrors);
    }
    };

    return (
    <div className="w-full h-screen min-h-screen bg-gradient-to-b from-orange-300 to-violet-300 flex items-center justify-center">
        <div className="w-[300px] bg-white p-5 rounded-xl flex flex-col justify-around items-center">
        <Typography sx={{ fontSize: 14 }}>
            Add New Category
        </Typography>
        <Link to={'/'} className="mb-2 text-blue-500">Kembali</Link>
        <div className="mb-4 w-full">
            <Controller
            name="name"
            control={control}
            render={({ field }) => (
                <TextField
                value={field.value}
                onChange={field.onChange}
                label="Name"
                variant="outlined"
                size="small"
                className="mt-1 p-2 w-full border rounded-md"
                helperText={errors.name?.message}
                error={!!errors.name}
                />
            )}
            />
        </div>
        <FormControl fullWidth className="mb-4">
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={field.value}
                label="Status"
                onChange={field.onChange}
                size="small"
                className="mt-1 p-2 w-full border rounded-md"
                >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Deactive</MenuItem>
                </Select>
            )}
            />
        </FormControl>
        <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit(onSubmit)}
        >
            Submit
        </Button>
        </div>
    </div>
    );
};

export default Add;
