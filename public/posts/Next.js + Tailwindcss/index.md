---
title: "Next.js + Tailwindcss"
date: "2022/03/12 01:14:34"
tags: ["Nextjs","Tailwindcss"]
summary: ""
---

```:terminal
yarn create myapp
cd myapp
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js:tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```css:globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
