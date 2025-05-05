import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };
  return (
    <div className="mt-9">
      <p className="font-semibold">Sign in to google to Continue</p>
      <button
        className="bg-red-700 text-white text-sm border-2 rounded-xl p-1"
        onClick={signInWithGoogle}
      >
        Sign in with google
      </button>
    </div>
  );
};

export default Login;
