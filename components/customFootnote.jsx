export const CustomFootnote = ({ children, id }) =>
  id == "footnote-label" ? <h1>参考文献</h1> : <h2>{children}</h2>;
