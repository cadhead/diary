import Link from "next/link";

const navItemStyles = "font-medium text-white/[0.7] hover:text-white text-shadow-lg";
const navItems = [
  { href: "/", text: "Posts" },
  { href: "/post/new", text: "Write" }
]

export default function Nav() {
  return (
    <div className="flex bg-red-400/[0.9] my-2 px-2 border-b-4 border-red-500/[0.7]">
      <h1 className="py-5 pr-5 uppercase">
        <Link href="/">
          <a className="font-bold text-gray-200 hover:text-white">Diary</a>
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