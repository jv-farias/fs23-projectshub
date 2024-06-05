"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddLikeParams {
  userId: string;
  projectId: string;
}

export const addLike = async (params: AddLikeParams) => {
  if (!params.userId || !params.projectId) {
    throw new Error(
      `User ID: ${params.userId} and Project ID: ${params.projectId} must not be null`
    );
  }

  await db.like.create({
    data: {
      user: {
        connect: { id: params.userId },
      },
      project: {
        connect: { id: params.projectId },
      },
    },
  });

  revalidatePath(`/project/${params.projectId}`);
};
