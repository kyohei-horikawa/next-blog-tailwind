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
