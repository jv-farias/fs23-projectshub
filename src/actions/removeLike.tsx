"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface RemoveLikeParams {
  userId: string;
  projectId: string;
}

export const removeLike = async (params: RemoveLikeParams) => {
  if (!params.userId || !params.projectId) {
    throw new Error(
      `User ID: ${params.userId} and Project ID: ${params.projectId} must not be null`
    );
  }

  const likeToDelete = await db.like.findFirst({
    where: {
      userId: params.userId,
      projectId: params.projectId,
    },
  });

  if (!likeToDelete) {
    throw new Error("Like não encontrado."); 
  }

  await db.like.delete({
    where: {
      id: likeToDelete.id, 
    },
  });

  revalidatePath(`/project/${params.projectId}`);
};