import formatedDate from "lib/formatedDate";
import Link from "next/link";
import { useRouter } from "next/router";
import { XIcon } from "@heroicons/react/solid";
import PostControlls from "./post-controlls";

type Props = {
  title: string,
  slug: string,
  date: number,
  category: string
}

export default function PostPreview({ title, slug, date, category }: Props) {
  const router = useRouter();

  const deletePost = async (slug: string) => {
    await fetch("/api/post/delete", {
      body: JSON.stringify({ slug }),
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });

    router.reload();
  }

  

  return (
    <div className="block px-2 py-2 bg-white/[0.9] border-b border-red-300 hover:bg-slate-50/[0.9] hover:border-red-400 backdrop-blur-sm">
      <Link as={`/post/${slug}`} href="/post/[slug]">
        <a className="max-w-[70%] h-5">
          <h2 className="inline text-lg hover:text-red-600">
            {title}
          </h2>
        </a>
      </Link>
      { category ?
        <span className="inline-flex items-center justify-center px-2 py-1 ml-2 text-xs font-bold leading-none text-white bg-gray-400 rounded-full">
          {category}
        </span>
        : null
      }
      <PostControlls deleteFunc={deletePost} />
      <div>
        <small>{formatedDate(date)}</small>
      </div>
    </div>
  );
}