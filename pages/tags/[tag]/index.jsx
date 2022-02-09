import { AiFillTags } from "react-icons/ai";
import { IconContext } from "react-icons";

import { getTags } from "../../../utils/getTags";
import { getPostByTag } from "../../../utils/getPostByTag";

import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { Post } from "../../../components/Post";

export const getStaticPaths = async () => {
  const paths = getTags().map((path) => `/tags/${path}`);
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const posts = getPostByTag(params.tag);
  posts.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
  return { props: { posts: posts, tag: params.tag } };
};

const TagPage = ({ posts, tag }) => {
  return (
    <div>
      <Header />
      <ul className="mx-auto w-[65%] pt-[65px]">
        <div className="flex">
          <IconContext.Provider value={{ size: "1.5em" }}>
            <AiFillTags />
          </IconContext.Provider>
          <p className="text-3xl">{tag}</p>
        </div>
        {posts.map((post) => (
          <li>
            <Post post={post} />
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default TagPage;
