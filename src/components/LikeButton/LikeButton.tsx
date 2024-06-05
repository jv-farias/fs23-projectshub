"use client";

import { addLike } from "@/actions/addLike";
import { removeLike } from "@/actions/removeLike";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LikeButtonProps } from "./types";

export const LikeButton = ({ projectId }: LikeButtonProps) => {
  const { data } = useSession();
  const [liked, setLiked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
        if (
          (error as Error).message === "User has already liked this project"
        ) {
          setLiked(true);
        }
      }
    };
    checkLike();
  }, [data, projectId]);

  const handleLikeClick = async () => {
    const userId = data?.user?.id;
    if (!userId) {
      setShowAlert(true);
      return;
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
    <div className="mt-6 flex flex-col items-start gap-4">
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
      {showAlert && (
        <Alert className="max-w-sm max-md:w-full">
          <CircleAlert className="h-4 w-4" />
          <AlertTitle>Atenção!</AlertTitle>
          <AlertDescription className="flex gap-2 flex-wrap" >Faça login para curtir um projeto.
            <Link href="/login">
              <p className="text-blue-500 underline">Clique aqui</p>
            </Link>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
