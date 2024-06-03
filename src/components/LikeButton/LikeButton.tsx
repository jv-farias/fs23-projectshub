"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { addLike } from "@/actions/addLike";
import { HeartIcon } from "lucide-react";
import { LikeButtonProps } from "./types";
import { removeLike } from "@/actions/removeLike";

export const LikeButton = ({ projectId }: LikeButtonProps) => {
  const { data } = useSession();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkLike = async () => {
      const userId = data?.user?.id;
      if (!userId) {
        return;
      }
      try {
        await addLike({ userId: userId, projectId: projectId });
        setLiked(true);
      } catch (error: unknown) {
        if ((error as Error).message === "User has already liked this project") {
          setLiked(true);
        }
      }
    };
    checkLike();
  }, [data, projectId]);

  const handleLikeClick = async () => {
    const userId = data?.user?.id;
    if (!userId) {
      throw new Error("User is not logged in");
    }
    if (liked) {
      try {
        await removeLike({ userId: userId, projectId: projectId });
        setLiked(false);
      } catch (error) {
        console.error("Error removing like:", error);
      }
    } else {
      try {
        await addLike({ userId: userId, projectId: projectId });
        setLiked(true);
      } catch (error) {
        console.error("Error adding like:", error);
      }
    }
  };
  

  return (
    <div className="mt-6 flex items-center gap-4">
      <Button
        onClick={handleLikeClick}
        variant={liked ? "default" : "secondary"}
      >
        {liked ? (
          <HeartIcon className="mr-2 h-4 w-4 text-red-600" fill="red" />
        ) : (
          <HeartIcon className="mr-2 h-4 w-4" />
        )}
        {liked ? "Descurtir" : "Curtir"}
      </Button>
    </div>
  );
};
