import Layout from "components/layout";
import Container from "components/container";
import { getAllPosts } from "lib/getPosts";
import Head from "next/head";
import { ReactElement } from "react";
import Posts from "components/posts";
import Nav from "components/nav";

type Props = {
  posts: IPost[]
}

export default function Home({ posts }: Props): ReactElement {
  return (
    <Layout>
      <Head>
        <title>Diary - All Posts</title>
      </Head>
      <Container>
        <Nav />
        {posts.length ? <Posts posts={posts} /> : "No posts, yet."}
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const posts = getAllPosts([
    "title",
    "date",
    "slug"
  ])

  return {
    props: { posts },
  }
}
