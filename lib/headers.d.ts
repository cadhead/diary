interface IPost {
  title: string,
  content: string,
  date: number,
  slug: string,
  category: string
}

interface ICreatedPostPayload {
  id: string,
  created: boolean
}