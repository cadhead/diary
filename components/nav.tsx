import Link from "next/link";

const navItemStyles = "font-medium text-gray-500 hover:text-gray-900";
const navItems = [
  { href: "/", text: "Posts" },
  { href: "/post/new", text: "Write" }
]

export default function Nav() {
  return (
    <div className="flex">
      <h1 className="py-5 pr-5 uppercase">
        <Link href="/">
          <a className="font-bold text-violet-600 hover:text-violet-700">Diary</a>
        </Link>
      </h1>
      <nav className="block py-5 space-x-3">
        {navItems.map(item => {
          return (<Link key={item.href} href={item.href}><a className={navItemStyles}>{item.text}</a></Link>)
        })}
      </nav>
    </div>
  );
}