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

  const existingLike = await db.like.findFirst({
    where: {
      userId: params.userId,
      projectId: params.projectId,
    },
  });

  if (existingLike) {
    throw new Error("Você já deu like nesse projeto!");
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

  await db.project.update({
    where: { id: params.projectId },
    data: {
      likes: { increment: 1 },
    },
  });

  revalidatePath(`/project/${params.projectId}`);
  revalidatePath("/");
  revalidatePath("/explore");
  revalidatePath("/my-projects");
};
