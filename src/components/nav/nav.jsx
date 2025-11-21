import { Link, useLocation } from "react-router";
import { FiMessageCircle } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import "./nav.scss";

export default function Nav() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link
            to="/"
            className={`nav__link ${isActive("/") ? "nav__link--active" : ""}`}>
            <FiHome />
          </Link>
        </li>
        <li className="nav__item">
          <Link
            to="/chat"
            className={`nav__link ${
              isActive("/chat") ? "nav__link--active" : ""
            }`}>
            <FiMessageCircle />
          </Link>
        </li>
        <li className="nav__item">
          <Link
            to="/favourites"
            className={`nav__link ${
              isActive("/favourites") ? "nav__link--active" : ""
            }`}>
            <FiHeart />
          </Link>
        </li>
        <li className="nav__item">
          <Link
            to="/profile/1"
            className={`nav__link ${
              isActive("/profile") ? "nav__link--active" : ""
            }`}>
            <FiUser />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
