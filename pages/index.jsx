import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/posts">
        <a>投稿一覧</a>
      </Link>
    </div>
  );
}
