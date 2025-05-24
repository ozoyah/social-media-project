import { Post } from "./Main";
import { AiOutlineLike } from "react-icons/ai";
import {
  addDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";

import { auth, db } from "../../config/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: Post;
}

interface Likes {
  userId: string;
}

const Posts = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<Likes[] | null>(null);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };

  const addLike = async () => {
    await addDoc(likesRef, {
      userId: user?.uid,
      postId: post.id,
    });
    setLiked(!liked);
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  const handleLike = () => {
    if (hasUserLiked) return;
    addLike();
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", "user?.uid")
      );
      const liketoDeleteData = await getDocs(likeToDeleteQuery);
      const likeToDelete = doc(db, "likes", liketoDeleteData.docs[0].id);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user.uid }] : [{ userId: user.uid }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLikes();
  }, []);
  return (
    <div className=" bg-white rounded-xl p-6 mb-6 shadow-sm border border-red-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 max-w-3xl mx-auto mt-10">
      {/* Post Header */}
      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {post.username?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="mt-2">
            <a
              href="#"
              className="text-blue-500 hover:underline text-sm font-medium"
            >
              @{post.username}
            </a>
          </div>
        </div>

        {/* Post Content */}
        <div className=" flex-1 flex-col">
          <h3 className="text-lg text-center font-semibold text-gray-900 mb-1">
            {post.title}
          </h3>
          <p className="text-gray-700 text-center text-base leading-relaxed">
            {post.description}
          </p>
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-center gap-4 pt-4 border-t  border-gray-100">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
            hasUserLiked
              ? "text-red-500 hover:bg-red-50"
              : "text-gray-500 hover:bg-gray-100 hover:text-red-400"
          }`}
        >
          <AiOutlineLike className="w-5 h-5" />
          <span>{likes?.length} likes</span>
        </button>

        <button className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-blue-500">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default Posts;
