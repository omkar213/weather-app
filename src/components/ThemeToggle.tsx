import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { useWeatherStore } from "../state/useWeatherStore";

export function ThemeToggle() {
  const { theme, setTheme } = useWeatherStore();

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div
      className="theme-toggle"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="theme-icon sun-icon" />
      ) : (
        <Moon className="theme-icon moon-icon" />
      )}
    </div>
  );
}
