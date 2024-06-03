"use server";

import { db } from "@/lib/prisma";

interface GetLikeParams {
  projectId: string;
}

export const getLikes = async (params: GetLikeParams) => {
  await db.like.findMany({
    where: {
      projectId: params.projectId,
    },
  });

  return;
};
