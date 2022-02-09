---
title: "react-iconsのwariningとerrorについて"
date: "2022/02/09 16:26:06"
tags: ["react","react-icons","プログラミング"]
---

# react-iconsのwarings

```bash
(node:85837) [DEP0128] DeprecationWarning: Invalid 'main' field in
'/Users/kyohei/MyWork/next-blog-tailwind/node_modules/react-icons/package.json' of 'lib'.
Please either fix that or report it to the module author
(Use `node --trace-deprecation ...` to show where the warning was created)

error - Error: Cannot find module '/Users/kyohei/MyWork/next-blog-tailwind/node_modules/react-icons/lib/lib/cjs/index.js'.
 Please verify that the package.json has a valid "main" entry
```

react-iconsを使っていたところ上記のwarningとerrorに遭遇．

# 原因と解決策

[react-iconsのissue](https://github.com/react-icons/react-icons/issues/509#issuecomment-979652082)によると，
nodeのバージョンが16以上になったことで，
トップレベルのpackage.jsonでindex.jsを探す際，
ディレクトリではなくファイルを探しにいくようになったためである．

```変更前```

```json:node_modules/package.json
{
  "main": "lib",
  "types": "./lib/esm/index.d.ts",
}
```

```変更後```


```json:node_modules/package.json
{
  "main": "lib/cjs/index.js",
  "module": "lib/esm/index.js",
  "types": "lib/esm/index.d.ts",
}
```

としてあげる．

# 更なる問題と解決

node_modules/package.jsonを変更することでエラーは消えたが，
このままでは,
```yarn add```
するたびに上書きされ，
元のpackage.jsonに戻ってしまう．
