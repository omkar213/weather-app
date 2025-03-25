import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="title">Weather Dashboard</h1>

        <div className="header-actions">
          <form className="search-form">
            <input
              type="search"
              placeholder="Search City..."
              className="search-input"
              id="search-input"
            />
          </form>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
