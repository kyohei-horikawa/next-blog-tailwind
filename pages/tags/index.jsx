import { Tags } from "components/Tags";
import { getTags } from "utils/getTags";

export const getStaticProps = async () => {
  const allTags = getTags();
  return {
    props: { allTags },
  };
};

export default function Tag({ allTags }) {
  return (
    <div>
      <Tags tags={allTags} />
    </div>
  );
}
