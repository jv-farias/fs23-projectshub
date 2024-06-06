import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

interface CheckLikeResponse {
  isLiked: boolean;
  error?: string;
}

export async function GET(
  req: NextRequest,
  _res: NextResponse<CheckLikeResponse>
): Promise<NextResponse<CheckLikeResponse> | void> {
  const userId = req.nextUrl.searchParams.get("userId");
  const projectId = req.nextUrl.searchParams.get("projectId");

  if (!userId || !projectId) {
    return NextResponse.json(
      { isLiked: false, error: "Missing userId or projectId" },
      { status: 400 }
    );
  }

  try {
    const existingLike = await db.like.findFirst({
      where: {
        userId: userId.toString(),
        projectId: projectId.toString(),
      },
    });

    return NextResponse.json({ isLiked: !!existingLike }, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { isLiked: false, error: "Error accessing the database" },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { isLiked: false, error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
