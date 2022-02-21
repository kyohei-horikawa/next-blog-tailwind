import Head from "next/head";

import React from "react";

import { getDirSlugs } from "utils/getDirSlugs";
import { getPostBySlug } from "utils/getPostBySlug";
import { markdownToHtml } from "utils/markdownToHtml";

import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";

import { Title } from "components/Title";
import { CustomLink } from "components/customLink";
import { CustomNav } from "components/customNav";
import { CustomFootnote } from "components/CustomFootnote";

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
      // h2: CustomFootnote,
    },
  });

const PostPage = ({ post }) => {
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta property="description" content={post.summary} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:image" content={`/posts/${post.slug}/cover.png`} />
        <meta name="twitter:card" content={`/posts/${post.slug}/cover.png`} />
      </Head>
      <Title
        title={post.title}
        date={post.date}
        tags={post.tags}
        slug={post.slug}
      />
      <section className="relative">
        {processor.processSync(post.content).result}
      </section>
    </div>
  );
};

export default PostPage;
