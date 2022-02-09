import Link from "next/link";
import { AiFillTags } from "react-icons/ai";
import { IconContext } from "react-icons";

export const Tags = ({ tags }) => {
  return (
    <ul className="flex my-4">
      <IconContext.Provider value={{ size: "1.5em" }}>
        <AiFillTags />
      </IconContext.Provider>
      {tags?.map((tag) => (
        <li className="ml-2 px-1 bg-slate-400 dark:bg-slate-500" key={tag}>
          <Link key={tag} href={`/tags/${tag}`}>
            <a className="tags">{tag}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
