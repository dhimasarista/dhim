"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function CityAnimation() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLight = theme === "light";

  const toggleTheme = () => {
    setTheme(isLight ? "dark" : "light");
  };

  const codeSnippets = [
    'public class', 'void Main()', 'const fn', 'impl Trait',
    '⛾ ARC⌗Σage', 'int main()', 'fn init()', 'pub fn',
    'std::vector', 'namespace', 'using System', 'comptime',
    'async fn', 'match expr', 'Option<T>', 'Result<T>',
  ];

  return (
    <div className="city-animation-container">
      {/* Background */}
      <div className="animated-bg">
        <button
          onClick={toggleTheme}
          className="celestial-button"
          aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
        >
          {isLight ? (
            <div className="sun" />
          ) : (
            <>
              <div className="moon" />
              <div className="stars-small" />
            </>
          )}
        </button>
      </div>

      {isLight ? (
        <>
          {/* Code Snippets - Light Mode */}
          <div className="code-snippets">
            {codeSnippets.map((code, i) => (
              <div
                key={i}
                className="code-text"
                style={{
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                {code}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Stars - Dark Mode */}
          <div className="star-field">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
