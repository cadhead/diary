import { getPostBySlug } from "lib/getPosts";
import { FormEvent, ReactElement, useState } from "react";
import ErrorPage from "next/error"
import { useRouter } from "next/router";
import Modal from "components/modal";
import Layout from "components/layout";
import Head from "next/head";
import Container from "components/container";
import Nav from "components/nav";
import { createMarkUp } from "lib/mdRenderer";
import CategorySelect from "components/category-select";
import getPostsCategories from "lib/getPostsCategories";


type Props = {
  post: IPost,
  categories: string[]
}

export default function EditPost({ post, categories }: Props): ReactElement {
  const router = useRouter()

  const [state, setState] = useState({
    title: post.title,
    content: post.content,
    category: post.category
  });
  const [error, setError] = useState("");

  const [modalState, setModelState] = useState(false);

  const modalOpen = () => setModelState(true);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const postEdit = async (event: FormEvent) => {
    event.preventDefault();

    const { title, content, category } = state;
    const { title: oldTitle, content: oldContent, category: oldCategory } = post;

    if (oldTitle === title && oldContent === content && oldCategory === category) {
      return router.push(`/post/${post.slug}`);
    }

    const res = await fetch("/api/post/edit", {
      body: JSON.stringify({ slug: post.slug, title, content, category, date: post.date }),
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });
  
    const result = res.status === 201 ? await res.json() : "Title and content must be provided.";

    if (result.status) {
      router.push(`/post/${result.id}`);
    } else {
      setError(result);
    }
  }

  const onFieldChange = (event: FormEvent) => {
    const field = event.currentTarget as HTMLInputElement | HTMLTextAreaElement;

    setState({ ...state, [field.name]: field.value });
  }

  return (
    <Layout>
      <Head>
        <title>{state.title} (edit) - Diary</title>
      </Head>
      <Modal onClose={() => setModelState(false)} title="Post preview" isOpen={modalState}>
        <p dangerouslySetInnerHTML={createMarkUp(state.content)} />
      </Modal>
      <Container>
        <Nav />
        {error ? <div className="text-red-400">{error}</div> : null}
        <form className="h-screen" onSubmit={postEdit}>
          <CategorySelect selected={post.category} categories={categories} onFieldChange={onFieldChange} />
          <input value={state.title} onChange={onFieldChange} type="text" name="title" placeholder="Title" className="block w-2/3 h-16 px-4 py-3 mt-8 mb-3 border rounded appearance-none bg-grey-lighter text-grey-darker" />
          <textarea value={state.content.trim()} onChange={onFieldChange} name="content" placeholder="Write smth" className="block w-full px-4 py-3 mt-8 mb-3 border rounded appearance-none h-3/6 bg-grey-lighter text-grey-darker border-grey-lighter"></textarea>
          <button className="px-4 py-2 mt-5 mb-5 font-bold text-white bg-indigo-900 rounded shadow hover:bg-indigo-800" type="submit">Save post</button>
          <button onClick={modalOpen} className="px-4 py-2 mt-5 mb-5 ml-1 font-bold text-white bg-gray-900 rounded shadow hover:bg-gray-800" type="button">Preview</button>
        </form>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ params }: any) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'category'
  ]);

  const categories = getPostsCategories();

  return {
    props: { post, categories },
  }
}
