import { NavLink } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <div>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/login"}>Login</NavLink>
      </div>
      <div>
        <p>{user?.displayName}</p>
        <img src={user?.photoURL || ""} />
      </div>
    </>
  );
};

export default Navbar;
