import { NavLink } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <>
      <section></section>
      <div className="flex align-middle justify-between text-white bg-red-700">
        <div className="p-5">
          <h1 className="text-2xl font-medium">Zedd</h1>
        </div>
        <div className="flex p-5 justify-between space-x-9">
          <div className="space-x-3">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "text-grey-200 font-bold border-b-2 border-solid "
                  : "text-white font-medium"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                isActive
                  ? "text-grey-200 font-bold border-b-2 border-solid "
                  : "text-white font-medium"
              }
            >
              Login
            </NavLink>
          </div>
          <div className="flex flex-row align-middle space-x-3">
            {user && (
              <>
                {user?.photoURL ? (
                  <img className="w-7 h-7 rounded-4xl" src={user?.photoURL} />
                ) : (
                  <p></p>
                )}

                <button
                  className="bg-red-700 text-white text-sm border-2 rounded-xl p-1"
                  onClick={signUserOut}
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
