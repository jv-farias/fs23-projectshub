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

  const existingLike = await db.like.findFirst({
    where: {
      userId: params.userId,
      projectId: params.projectId,
    },
  });

  if (!existingLike) {
    throw new Error("No like found for this user and project");
  }

  await db.like.delete({
    where: {
      id: existingLike.id,
    },
  });

  revalidatePath(`/project/${params.projectId}`);
};
