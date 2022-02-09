import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Tags } from "../../components/Tags";
import { getTags } from "../../utils/getTags";

export const getStaticProps = async () => {
  const allTags = getTags();
  return {
    props: { allTags },
  };
};

export default function Tag({ allTags }) {
  return (
    <div>
      <Header />
      <ul className="mx-auto w-[65%] pt-[60px]">
        <Tags tags={allTags} />
      </ul>
      <Footer />
    </div>
  );
}
