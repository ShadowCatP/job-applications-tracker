import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export const ThemeButtonSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="cursor-pointer rounded-full bg-neutral-200 p-2 transition-colors dark:bg-neutral-700">
      {resolvedTheme === "dark" ? (
        <Sun onClick={() => setTheme("light")} />
      ) : (
        <Moon onClick={() => setTheme("dark")} />
      )}
    </div>
  );
};
