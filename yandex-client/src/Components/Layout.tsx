import React from "react";
import { StyleContext } from "../context/StyleContext";
import { Search } from "./Search/Search";

export const Layout = () => {
  const { theme } = React.useContext(StyleContext);
  return (
    <div>
      <header>
        <div>
          <svg
            width="16"
            height="16"
            fill={theme.theme2}
            className="bi bi-tv-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM2 2h12s2 0 2 2v6s0 2-2 2H2s-2 0-2-2V4s0-2 2-2z" />
          </svg>
          <p>Anime Info</p>
        </div>
        <div>
          {theme.type === "dark" ? (
            <svg
              width="16"
              height="16"
              fill={theme.theme2}
              className="bi bi-toggle2-off"
              viewBox="0 0 16 16"
            >
              <path d="M9 11c.628-.836 1-1.874 1-3a4.978 4.978 0 0 0-1-3h4a3 3 0 1 1 0 6H9z" />
              <path d="M5 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 5 3a5 5 0 0 0 0 10z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill={theme.theme2}
              className="bi bi-toggle2-on"
              viewBox="0 0 16 16"
            >
              <path d="M7 5H3a3 3 0 0 0 0 6h4a4.995 4.995 0 0 1-.584-1H3a2 2 0 1 1 0-4h3.416c.156-.357.352-.692.584-1z" />
              <path d="M16 8A5 5 0 1 1 6 8a5 5 0 0 1 10 0z" />
            </svg>
          )}
          <p>{theme.type}</p>
        </div>
      </header>
      <Search />
    </div>
  );
};