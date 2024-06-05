"use server";
import { db } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";
interface CheckLikeResponse {
  isLiked: boolean;
  error?: string;
}

export async function GET(
  req: NextRequest,
  _res: NextResponse<CheckLikeResponse>
): Promise<NextResponse | void> {
  const userId = req.nextUrl.searchParams.get("userId");
  const projectId = req.nextUrl.searchParams.get("projectId");

  try {
    const existingLike = await db.like.findFirst({
      where: {
        userId: userId?.toString(),
        projectId: projectId?.toString(),
      },
    });
    return NextResponse.json(
      { isLiked: existingLike !== null },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao verificar o like:", error);
    return NextResponse.json(
      { isLiked: false, error: "Erro ao verificar o like" },
      { status: 500 }
    );
  }
}
