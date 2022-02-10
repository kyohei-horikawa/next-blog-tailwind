import React from "react";
import ReactDom from "react-dom";

import { getDirSlugs } from "utils/getDirSlugs";
import { getPostBySlug } from "utils/getPostBySlug";
import { markdownToHtml } from "utils/markdownToHtml";

import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";

import { Title } from "components/Title";
import { CustomLink } from "components/customLink";
import { CustomNav } from "components/customNav";
import { CustomImage } from "components/customImage";

export const getStaticPaths = async () => {
  const paths = getDirSlugs().map((slug) => `/posts/${slug}`);
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content);
  return { props: { post: { ...post, content } } };
};

const processor = unified()
  .use(rehypeParse, { fragment: true }) // fragmentは必ずtrueにする
  .use(rehypeReact, {
    createElement: React.createElement,
    components: {
      a: CustomLink, // <a>を<CustomLink>に置き換えるよう設定
      nav: CustomNav,
    },
  });

const PostPage = ({ post }) => {
  return (
    <div>
      <Title
        title={post.title}
        date={post.date}
        tags={post.tags}
        dirName={post.dirName}
      />
      <section className="relative">
        {processor.processSync(post.content).result}
      </section>
    </div>
  );
};

export default PostPage;
