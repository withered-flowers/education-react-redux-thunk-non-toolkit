import CustomLink from "./CustomLink";

const NavBar = () => {
  return (
    <nav className="flex flex-row justify-between items-center py-4">
      <h1 className="text-3xl font-semibold">Belajar React Redux Thunk</h1>
      <ul className="flex flex-row gap-4">
        <li>
          <CustomLink to={"/"}>Counter</CustomLink>
        </li>
        <li>
          <CustomLink to={"/countries"}>REST Countries</CustomLink>
        </li>
        <li>
          <CustomLink to={"/jikan"}>JikanAPI</CustomLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
