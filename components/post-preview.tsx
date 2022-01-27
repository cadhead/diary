import formatedDate from "lib/formatedDate";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  title: string,
  slug: string,
  date: number
}

export default function PostPreview({ title, slug, date }: Props) {
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
    <Link as={`/post/${slug}`} href="/post/[slug]">
      <a className="relative block py-2 border-b border-violet-300 hover:bg-slate-50 hover:border-violet-600">
        <h2 className="text-lg hover:text-violet-600">
          {title}
        </h2>
        <small>{formatedDate(date)}</small>
        <button onClick={deletePost.bind(null, slug)} title="Delete post" className="absolute right-px top-px hover:opacity-50" name="postDelete">✖</button>
      </a>
    </Link>
  );
}