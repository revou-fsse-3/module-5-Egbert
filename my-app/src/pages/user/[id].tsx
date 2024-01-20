import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form"
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
    users: User;
}

const UserEdit = ({users}: Props) => {
    const { handleSubmit, register, reset, formState : {errors} } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(
        () => {
            reset({
                name: users.name,
                username: users.username,
                email: users.email
            })
        },
        [users.name, users.username, users.email, reset]
    )
    const onSubmit = async (data: any) => {
        try {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${users.id}`, data);
            console.log('User updated successfully:', response.data);
        } catch (error: any) {
            console.error('Error updating user:', error.message);
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

export const getServerSideProps: GetServerSideProps = (async (context) => {
    const id = context?.params?.id
    const fetch = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data: User = fetch.data

    return {
        props: {
            users: data
        }
    }
})

export default UserEdit;