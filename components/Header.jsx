import Link from "next/link";
import { SwitchButton } from "components/switchButton";

export const Header = () => {
  return (
    <header className="flex justify-between items-center h-16 w-screen fixed bg-white dark:bg-darkgrey z-10">
      <div></div>
      <div>
        <Link href="/">
          <a className="px-10 text-2xl text-black font-thin dark:text-gray-200">
            Home
          </a>
        </Link>
        <Link href="/posts">
          <a className="px-10 text-2xl text-black font-thin dark:text-gray-200">
            Posts
          </a>
        </Link>
        <Link href="/tags">
          <a className="px-10 text-2xl text-black font-thin dark:text-gray-200">
            Tags
          </a>
        </Link>
      </div>
      <SwitchButton />
    </header>
  );
};
