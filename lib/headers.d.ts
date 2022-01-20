interface IPost {
  title: string,
  content: string,
  date: number,
  slug: string
}

interface ICreatedPostPayload {
  id: string,
  created: boolean
}