import Layout from "@/layouts"
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

interface User {
    id: number;
    name: string
    username: string;
    email: string;
}

interface Props {
    users: User[]
}
const UserIndex = ({users}: Props) => {
    return (
        <Layout>
            <Head>
                <title></title>
            </Head>
            <div>
                <h1>User List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link passHref href={`/user/${user.id}`}>{"Edit"}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link passHref href={'/user/add'}>Add</Link>
            </div>
        </Layout>
    )
}

export const getServerSideProps = (async () => {
    const fetch = await axios.get('https://jsonplaceholder.typicode.com/users');
    const data: User = fetch.data

    return {
        props: {
            users: data
        }
    }
})

export default UserIndex