import PostPreview from "./post-preview";

type Props = {
  posts: IPost[]
}

export default function Posts({ posts }: Props) {
  return (
    <div className="">
      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          date={post.date}
          slug={post.slug}
        />
      ))}
    </div>
  )
}