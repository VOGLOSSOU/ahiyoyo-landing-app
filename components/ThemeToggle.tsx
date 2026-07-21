"use client";

import { useEffect, useState } from "react";

type ThemePreference = "system" | "light" | "dark";

const themes: Array<{ value: ThemePreference; label: string; icon: string }> = [
  { value: "system", label: "Thème système", icon: "fa-desktop" },
  { value: "light", label: "Thème clair", icon: "fa-sun" },
  { value: "dark", label: "Thème sombre", icon: "fa-moon" },
];

function applyTheme(preference: ThemePreference) {
  const dark = preference === "dark" ||
    (preference === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.classList.toggle("light", !dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemePreference>("system");

  useEffect(() => {
    const stored = localStorage.getItem("ahiyoyo-theme");
    const preference: ThemePreference = stored === "light" || stored === "dark" ? stored : "system";
    applyTheme(preference);

    const syncPreference = window.setTimeout(() => setTheme(preference), 0);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if ((localStorage.getItem("ahiyoyo-theme") ?? "system") === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handleSystemChange);
    return () => {
      window.clearTimeout(syncPreference);
      media.removeEventListener("change", handleSystemChange);
    };
  }, []);

  const currentIndex = themes.findIndex((item) => item.value === theme);
  const current = themes[currentIndex];

  const cycleTheme = () => {
    const next = themes[(currentIndex + 1) % themes.length];
    setTheme(next.value);
    applyTheme(next.value);

    if (next.value === "system") localStorage.removeItem("ahiyoyo-theme");
    else localStorage.setItem("ahiyoyo-theme", next.value);
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="theme-toggle w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center"
      aria-label={`${current.label}. Changer de thème`}
      title={`${current.label} — cliquer pour changer`}
    >
      <i className={`fa-solid ${current.icon}`} aria-hidden="true" />
    </button>
  );
}
