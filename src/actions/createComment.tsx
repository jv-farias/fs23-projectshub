"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddComentParams {
  content: string;
  userId: string;
  projectId: string;
}

export const addComent = async (params: AddComentParams) => {
  if (!params.userId || !params.projectId) {
    throw new Error(`User ID: ${params.userId} and Project ID: ${params.projectId} must not be null`);
  }
  await db.comment.create({
    data: {
      user: {
        connect: { id: params.userId },
      },
      project: {
        connect: { id: params.projectId },
      },
      content: params.content,
    },
  });

  revalidatePath(`/project/${params.projectId}`);
};
