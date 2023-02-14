import { NavLink } from "react-router-dom";

const CustomLink = ({ to, children }) => {
  let activeClassName = "underline text-blue-400";
  let inactiveClassName =
    "text-gray-600 hover:text-blue-400 hover:underline transition-all duration-500";

  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? activeClassName : inactiveClassName
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default CustomLink;
