import Link from "next/link";
import { Header } from "components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="mx-auto w-[720px]">
        <Link href="/posts">
          <a>投稿一覧</a>
        </Link>
      </div>
    </div>
  );
}
