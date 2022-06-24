import Layout from "components/layout";
import Container from "components/container";
import { getPostBySlug } from "lib/getPosts";
import Head from "next/head";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import ErrorPage from 'next/error'
import formatedDate from "lib/formatedDate";
import Nav from "components/nav";
import { createMarkUp } from "lib/mdRenderer";

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
        <div className="p-2 bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">
              {post.title} {console.log(post)}
            </h1>
            { post.category ?
              <span className="inline-flex items-center justify-center px-2 py-1 ml-2 text-xs font-bold leading-none text-white bg-gray-400 rounded-full">
                {post.category}
              </span>
              : null
            }
          </div>
          <small>{formatedDate(post.date)}</small>
        </div>
        <article className="p-2 pt-0 bg-white border-t border-red-100" dangerouslySetInnerHTML={createMarkUp(post.content)} />
      </Container>
    </Layout>
  )
}

export async function getServerSideProps({ params }: any) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'category'
  ]);

  return {
    props: { ...post },
  }
}

// export async function getStaticPaths() {
//   const posts = getAllPosts(['slug'])

//   return {
//     paths: posts.map((post) => {
//       return {
//         params: {
//           slug: post.slug,
//         },
//       }
//     }),
//     fallback: false,
//   }
// }
