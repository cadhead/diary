import PostPreview from "./post-preview";

type Props = {
  posts: IPost[]
}

export default function Posts({ posts }: Props) {
  return (
    <div className="Posts">
      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          date={post.date}
          slug={post.slug}
          category={post.category}
        />
      ))}
    </div>
  )
}