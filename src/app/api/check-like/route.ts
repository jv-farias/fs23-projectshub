"use server";
import { db } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface CheckLikeResponse {
  isLiked: boolean;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckLikeResponse>
) {
  const { userId, projectId } = req.query;

  try {
    const existingLike = await db.like.findFirst({
      where: {
        userId: userId?.toString(),
        projectId: projectId?.toString(),
      },
    });

    res.status(200).json({ isLiked: existingLike !== null });
  } catch (error) {
    console.error("Erro ao verificar o like:", error);
    res.status(500).json({ isLiked: false, error: "Erro ao verificar o like" });
  }
}
