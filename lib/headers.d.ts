interface IPost {
  title: string,
  content: string,
  date?: number,
  slug: string,
  category: string,
  editAt?: number
}

interface ICreatedPostPayload {
  id: string,
  created: boolean
}