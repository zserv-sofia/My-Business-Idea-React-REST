import "./navigation.css";
import { useContext } from "react";
import authContext from "../context/auth-context";
import { Link } from "react-router-dom";

const Navigation = (props) => {
  const ctx = useContext(authContext);
  const isLoggedIn = !!ctx.token;
  return (
    <nav>
      <ul>
        <li className={!isLoggedIn ? "li-left" : ""}>
          <Link className="li-link" to="/public">
            {" "}
            M.B.I.
          </Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Link className="li-link" to="/myideas">
              My ideas
            </Link>
          </li>
        ) : (
          <></>
        )}
        {isLoggedIn ? (
          <li className="li-left">
            <Link className="li-link" to="/myfav">
              My favorites
            </Link>
          </li>
        ) : (
          <></>
        )}
        {isLoggedIn ? <li onClick={props.getLogOut}>LogOut</li> : <></>}

        {!isLoggedIn ? (
          <li>
            <Link className="li-link" to="/login">
              LogIn
            </Link>
          </li>
        ) : (
          <></>
        )}
        {!isLoggedIn ? (
          <li>
            <Link className="li-link" to="/signup">
              Signup
            </Link>
          </li>
        ) : (
          <></>
        )}

        <li>
          <Link className="li-link" to="/about">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
