import Layout from '@/layouts';
import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
}

interface Props {
  posts: Post[]
}

const PostIndex = ({ posts }: Props) => {
  const handleDeletePost = (id: number) => {
    const response = axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)

    console.log('data deleted')
  }
  return (
    <Layout>
      <Head>
        <title>{"List Placeholder"}</title>
      </Head>
      <div>
        <h1>Post List</h1>

        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>
                  <Link passHref href={`/post/${post.id}`}>
                    {'Edit'}
                  </Link>
                  <button onClick={() => handleDeletePost(post.id)}>{"Delete"}</button>
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
    
  )
}

export const getServerSideProps = ( async () => {

  const fetch = await axios.get('https://jsonplaceholder.typicode.com/posts')
  const data: Post = fetch.data
})

export default PostIndex