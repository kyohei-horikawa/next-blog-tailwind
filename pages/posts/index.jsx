import { MdMenuBook } from "react-icons/md";
import { IconContext } from "react-icons";

import { getPosts } from "utils/getPosts";
import { Post } from "components/Post";

export const getStaticProps = async () => {
  const allPosts = getPosts();
  return {
    props: { allPosts },
  };
};

export default function Posts({ allPosts }) {
  return (
    <div>
      <div className="flex">
        <IconContext.Provider value={{ size: "1.5em" }}>
          <MdMenuBook />
        </IconContext.Provider>
        <p className="text-3xl">投稿一覧</p>
      </div>
      {allPosts?.map((post) => (
        <Post key={post.title} post={post} />
      ))}
    </div>
  );
}
