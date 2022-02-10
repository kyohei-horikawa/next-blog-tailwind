---
title: "hoge"
date: "2022/02/07 21:20:09"
tags: ["タグ1","タグ２","react","nextjs"]
---

# hello

```helloworld```

テストあああ```helloworld```これはテストです．

下の画像はlayoutを"fixed", "intrinsic", "responsive"の3つのケースに対して、画像幅widthが viewport 幅よりも小さい場合と大

```python:a.py
import datetime
import sys
import glob

files = glob.glob("./posts/*.md")
now = datetime.datetime.today().strftime('%Y/%m/%d %H:%M:%S')

if len(sys.argv) == 1:
    print('ファイル名を入力してください．')
    file_name = input()
else:
    file_name = sys.argv[1]

file_path = './posts/' + file_name + '.md'

if file_path in files:
    print('既に存在しています．')
    sys.exit()

with open(file_path, 'w') as f:
    template = f'''---
title: "{file_name}"
date: "{now}"
tags: ["タグ1","タグ２"]
---

## 目次
'''
    f.write(template)

```

aaaaaaaasff

```js:javascript
import { unified } from 'unified';
import remarkParse from 'remark-parse';

const markdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
};

export default markdownToHtml;
```

![画像](/mancity.jpeg)


[リンク](/posts/gfm)

- a
  - dd
- b
- c

**jjj**

$$
a_i
$$

# hoge

## foo

### bar

# hage

# bar
