import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
const schema = yup
  .object({
    name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required()

interface User {
    id: number;
    name: string
    username: string;
    email: string;
}

interface Props {
    user: User;
}
const UserAdd = () => {
    const { handleSubmit, register, formState : {errors} } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/users", data);
            console.log("User added successfully:", response.data);
            } catch (error: any) {
            console.error("Error adding user:", error.message);
            }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <p>{errors.name?.message}</p>

        <input {...register("username")} />
        <p>{errors.username?.message}</p>
        
        <input {...register("email")} />
        <p>{errors.email?.message}</p>
        <Link passHref href={'/user'}>Back</Link>
        <Link passHref href={'/user'}>
        <button type="submit">Sumbit</button>
        </Link>
    </form>
    )
}

export default UserAdd;