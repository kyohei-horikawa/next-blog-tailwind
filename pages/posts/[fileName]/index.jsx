import React from "react";

import { getPostsNames } from "utils/getPostsNames";
import { getPostByName } from "utils/getPostByName";
import { markdownToHtml } from "utils/markdownToHtml";
import { getTags } from "utils/getTags";

import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";

import { Header } from "components/Header";
import { Title } from "components/Title";
import { Footer } from "components/Footer";
import { CustomLink } from "components/customLink";
import { CustomNav } from "components/customNav";
import { CustomFootnote } from "components/customfootnote";

export const getStaticPaths = async () => {
  const paths = getPostsNames().map((path) => `/posts/${path}`);
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  console.log(getTags());
  const post = getPostByName(params.fileName);
  const content = await markdownToHtml(post.content);
  return { props: { post: { ...post, content } } };
};

const processor = unified()
  .use(rehypeParse, { fragment: true }) // fragmentは必ずtrueにする
  .use(rehypeReact, {
    createElement: React.createElement,
    components: {
      a: CustomLink, // <a>を<CustomLink>に置き換えるよう設定
      h2: CustomFootnote,
      nav: CustomNav,
    },
  });

const PostPage = ({ post }) => {
  return (
    <div>
      <Header />
      <div className="mx-auto w-[65%] pt-[50px]">
        <Title title={post.title} date={post.date} tags={post.tags} />
        <section className="relative">
          {processor.processSync(post.content).result}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PostPage;
