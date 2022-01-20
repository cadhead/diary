import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export default function Container({ children }: Props) {
  return <div className="container h-screen px-5 mx-auto">{children}</div>
}
