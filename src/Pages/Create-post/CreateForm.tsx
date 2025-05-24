import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuCirclePlus } from "react-icons/lu";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("enter the title of your post"),
    description: yup.string().required("enter the description of your post"),
  });

  const { register, handleSubmit } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid,
    });

    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <div className="flex flex-row items-center space-x-1">
        <LuCirclePlus />
        <p className="text-lg font-medium">Add your Post {user?.displayName}</p>
      </div>
      <form
        className="flex flex-col items-center w-12/12"
        onSubmit={handleSubmit(onCreatePost)}
      >
        <input
          className="mt-6 border-2 border-red-600 rounded-xl w-3/12"
          placeholder="Title..."
          {...register("title")}
        />
        <textarea
          className="mt-6 border-2 border-red-600 rounded-xl w-3/12"
          placeholder="description..."
          {...register("description")}
        />

        <input
          className="border-2 border-red-600 rounded-xl mt-3 p-1 text-sm font-medium"
          type="submit"
        />
      </form>
    </div>
  );
};

export default CreateForm;
