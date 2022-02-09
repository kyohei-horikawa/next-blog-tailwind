import { MdMenuBook } from "react-icons/md";
import { IconContext } from "react-icons";

import { getPosts } from "utils/getPosts";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { Post } from "components/Post";

export const getStaticProps = async () => {
  const allPosts = getPosts();

  return {
    props: { allPosts },
  };
};

export default function Home({ allPosts }) {
  return (
    <div>
      <Header />
      <div className="mx-auto container w-[65%] pt-[60px]">
        <div className="flex">
          <IconContext.Provider value={{ size: "1.5em" }}>
            <MdMenuBook />
          </IconContext.Provider>
          <p className="text-3xl">投稿一覧</p>
        </div>
        {allPosts?.map((post) => (
          <Post post={post} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
