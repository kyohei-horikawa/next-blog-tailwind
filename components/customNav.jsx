export const CustomNav = (props) => {
  console.log(props);
  return (
    <nav>
      <p>目次</p>
      {props.children}
    </nav>
  );
};
