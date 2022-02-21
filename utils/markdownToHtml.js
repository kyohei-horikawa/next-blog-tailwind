import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import toc from "rehype-toc";
import slug from "rehype-slug";
import codeTitle from "rehype-code-titles";
import rehypeFootnote from "./rehype-footnote";

export const markdownToHtml = async (markdown) => {
  const result = await unified()
    .use(remarkParse) // Markdownをmdast(Markdownの抽象構文木)に変換
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype) // mdastをhast(HTMLの抽象構文木)に変換
    .use(codeTitle)
    .use(slug)
    .use(rehypeFootnote)
    .use(toc, {
      customizeTOC: (toc) => {
        const replacer = (children) => {
          children.forEach((child) => {
            if (child.type === "element" && child.tagName === "ol") {
              child.tagName = "ul";
            }
            if (child.children) {
              replacer(child.children);
            }
          });
        };
        replacer([toc]);
      },
    })
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeStringify) // hastをHTMLに変換
    .process(markdown);
  return result.toString();
};
