import { Fragment } from "react";

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Fragment>
      <div className="min-h-screen">
        {children}
      </div>
    </Fragment>
  );
}