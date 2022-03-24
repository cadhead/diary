import Layout from "components/layout";
import Container from "components/container";
import { getAllPosts } from "lib/getPosts";
import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import Posts from "components/posts";
import Nav from "components/nav";
import ReactPaginate from "react-paginate";
import { ArrowCircleLeftIcon, ArrowCircleRightIcon, DotsHorizontalIcon } from "@heroicons/react/solid"

type Props = {
  posts: IPost[]
}

export default function Home({ posts }: Props): ReactElement {
  const [currentPosts, setCurrentPosts] = useState([] as IPost[]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentPosts(posts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(posts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, posts]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    setItemOffset(newOffset);
  };

  return (
    <Layout>
      <Head>
        <title>Diary - All Posts</title>
      </Head>
      <Container>
        <Nav />
        {posts.length ? <Posts posts={currentPosts} /> : "No posts, yet."}
        <ReactPaginate
          className="flex justify-center mt-5"
          breakLabel={<DotsHorizontalIcon className="w-5 h-5 m-2 mt-2" />}
          nextLabel={<ArrowCircleRightIcon className="w-5 h-5 m-2 mt-2" />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={pageCount}
          previousLabel={<ArrowCircleLeftIcon className="w-5 h-5 m-2 mt-2" />}
          pageLinkClassName="block m-2 px-2 bg-gray-200 rounded hover:bg-gray-100"
          activeLinkClassName="text-indigo-600"
        />
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "category"
  ])

  return {
    props: { posts },
  }
}
