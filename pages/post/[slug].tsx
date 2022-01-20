import Layout from "components/layout";
import Container from "components/container";
import { getAllPosts, getPostBySlug } from "lib/getPosts";
import Head from "next/head";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import ErrorPage from 'next/error'
import { marked } from "marked";
import formatedDate from "lib/formatedDate";
import Nav from "components/nav";


const renderer = new marked.Renderer();
renderer.heading = (text, level): string => {
  switch (level) {
    case 2: {
      return `<h2 class="text-lg font-bold mt-5 text-violet-900">${text}</h2>`;
    }
      
    default: return `<h${level}>${text}</h${level}>`;
  }
}

renderer.list = (body): string => {
  return `<ul class="list-disc list-inside mx-5 mt-1">${body}</ul>`
}

renderer.link = (href, title, text) => {
  return `<a href="${href}" class="text-blue-400 hover:underline hover:text-blue-500" ${title ? `title="${title}` : ""}>${text}</a>`
}

const createMarkUp = (val: string) => {
  return { __html: marked(val, { renderer: renderer }) }
}

export default function Post(post: IPost): ReactElement {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <Head>
        <title>{post.title} - Diary</title>
      </Head>
      <Container>
        <Nav />
        <h1 className="text-xl font-bold">
          {post.title}
        </h1>
        <small>{formatedDate(post.date)}</small>
        <article className="py-2 mt-2 border-t" dangerouslySetInnerHTML={createMarkUp(post.content)} />
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }: any) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content'
  ]);

  return {
    props: { ...post },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
