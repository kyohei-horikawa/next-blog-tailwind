import Head from "next/head";

import React from "react";

import { getPostBySlug } from "utils/getPostBySlug";
import { markdownToHtml } from "utils/markdownToHtml";

import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";

import { Title } from "components/Title";

export const getStaticProps = async () => {
  const post = getPostBySlug("/このブログについて");
  const content = await markdownToHtml(post.content);
  return { props: { post: { ...post, content } } };
};

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeReact, {
    createElement: React.createElement,
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
