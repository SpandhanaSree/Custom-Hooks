
import useWindowWidth from "../hooks/useWindowWidth";

function Header() {
  const width = useWindowWidth();

  return (
    <header className="header">
      <h1>Post Explorer</h1>

    </header>
  );
}

export default Header;
