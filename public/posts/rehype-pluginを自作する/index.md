---
title: "rehype pluginを自作する"
date: "2022/02/21 16:35:39"
tags: ["Nextjs","rehype"]
summary: ""
---

# 今回の問題点

[remark-gfm](https://github.com/remarkjs/remark-gfm)を使用して，
脚注をつけた文章を書くと，脚注がh2タグでついてしまい，
[rehype-toc](https://github.com/JS-DevTools/rehype-toc)で目次をつける際に，以下の画像のようになり，
段落構成がおかしくなってしまう．

![before](/posts/rehype-pluginを自作する/before.png)

h2ではなくh1で脚注をつけることを目的とする．


# 解決方法

remark-gfmのオプションでh1にできないか調べたがそんなオプションはなさそうだ．

いろいろ探してると，[unified(remark,rehype)を利用してMarkdownをHTMLに変換する
](https://goodlife.tech/posts/unified-markdown)を見つけた．
ないなら，作ってしまおうという発想だ．

作る前に，remarkやrehypeについては，[MarkdownをHTMLに変換する工程の図解](https://jsnotice.com/posts/2022-01-21/)が参考になった．

# 実装

chromeのconsoleでオブジェクトの構造を確認しつつ実装した．

```js:rehype-footnote.js
const rehypeFootnote = () => {
  const transformer = (tree) => {
    const root = tree;
    root.children.forEach((child) => {
      if (child.properties) {
        if (
          typeof child.properties.className === "object" &&
          child.properties.className.includes("footnotes")
        ) {
          child.children.forEach((grandchild) => {
            if (grandchild.type === "element" && grandchild.tagName === "h2") {
              grandchild.tagName = "h1";
              grandchild.children[0].value = "参考文献";
            }
          });
        }
      }
    });
    return root;
  };

  return transformer;
};

export default rehypeFootnote;
```

それぞれのタグや値を変更してあげるだけ．

