"use server";

import { db } from "@/lib/prisma";

interface CheckLikeParams {
  userId: string;
  projectId: string;
}

export async function checkLike(params: CheckLikeParams) {
  const existingLike = await db.like.findFirst({
    where: {
      userId: params.userId,
      projectId: params.projectId,
    },
  });
  return existingLike !== null;
}