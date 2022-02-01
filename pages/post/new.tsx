import Container from "components/container";
import Layout from "components/layout";
import Modal from "components/modal";
import Nav from "components/nav";
import { createMarkUp } from "lib/mdRenderer";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export default function NewPost() {
  const router = useRouter();
  const [state, setState] = useState({
    title: "",
    content: "",
    showPreview: false
  });
  const [error, setError] = useState("");
  const [modalState, setModelState] = useState(false);

  useEffect(() => {
    const cache = localStorage.getItem("postCache");
    const initialValue = cache ? JSON.parse(cache) : {
      title: "",
      content: ""
    };

    setState(initialValue);
  }, [])

  useEffect(() => {
    localStorage.setItem("postCache", JSON.stringify({ ...state }));
  }, [state])

  const modalOpen = () => setModelState(true);

  const postCreate = async (event: FormEvent) => {
    event.preventDefault();

    const title: string = state.title;
    const content: string = state.content;

    const res = await fetch("/api/post/create", {
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });

    const result = res.status === 201 ? await res.json() : "Title and content must be provided.";

    if (result.status) {
      localStorage.removeItem("postCache");
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
        <title>Create new post - Diary</title>
      </Head>
      <Modal onClose={() => setModelState(false)} title="Post preview" isOpen={modalState}>
        <p dangerouslySetInnerHTML={createMarkUp(state.content)} />
      </Modal>
      <Container>
        <Nav />
        {error ? <div className="text-red-400">{error}</div> : null}
        <form className="h-screen" onSubmit={postCreate}>
          <input value={state.title} onChange={onFieldChange} type="text" name="title" placeholder="Title" className="block w-2/3 h-16 px-4 py-3 mt-8 mb-3 border rounded appearance-none bg-grey-lighter text-grey-darker" />
          <textarea value={state.content} onChange={onFieldChange} name="content" placeholder="Write smth" className="block w-full px-4 py-3 mt-8 mb-3 border rounded appearance-none h-3/6 bg-grey-lighter text-grey-darker border-grey-lighter"></textarea>
          <button className="px-4 py-2 mt-5 mb-5 font-bold text-white bg-indigo-900 rounded shadow hover:bg-indigo-800" type="submit">Create new post</button>
          <button onClick={modalOpen} className="px-4 py-2 mt-5 mb-5 ml-1 font-bold text-white bg-gray-900 rounded shadow hover:bg-gray-800" type="button">Preview</button>
        </form>
      </Container>
    </Layout>
  );
}