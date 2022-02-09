import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { BiToggleLeft, BiToggleRight } from "react-icons/bi";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export const SwitchButton = () => {
  const { theme, setTheme } = useTheme();

  // レンダー後かを判定
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      aria-label="DarkModeToggle"
      type="button"
      className="mt-0 mb-auto"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted && (
        <>
          {theme === "dark" ? (
            <div className="flex">
              <IconContext.Provider value={{ size: "1.5em" }}>
                <MdDarkMode />
              </IconContext.Provider>
              <IconContext.Provider value={{ size: "1.5em" }}>
                <BiToggleLeft />
              </IconContext.Provider>
              <IconContext.Provider value={{ size: "1.5em" }}>
                <MdLightMode />
              </IconContext.Provider>
            </div>
          ) : (
            <div className="flex">
              <IconContext.Provider value={{ size: "1.5em" }}>
                <MdDarkMode />
              </IconContext.Provider>
              <IconContext.Provider value={{ size: "1.5em" }}>
                <BiToggleRight />
              </IconContext.Provider>
              <IconContext.Provider value={{ size: "1.5em" }}>
                <MdLightMode />
              </IconContext.Provider>
            </div>
          )}
        </>
      )}
    </button>
  );
};
