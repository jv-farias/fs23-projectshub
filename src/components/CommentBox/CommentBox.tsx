import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/prisma";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInWeeks,
} from "date-fns";
import { CommentCard } from "../CommentCard";
import { CommentForm } from "../CommentForm";

function formatCommentDate(date: Date | string) {
  const now = new Date();
  const commentDate = new Date(date);

  const diffInWeeks = differenceInWeeks(now, commentDate);
  if (diffInWeeks > 0) return `${diffInWeeks}sem`;

  const diffInDays = differenceInDays(now, commentDate);
  if (diffInDays > 0) return `${diffInDays}d`;

  const diffInHours = differenceInHours(now, commentDate);
  if (diffInHours > 0) return `${diffInHours}h`;

  const diffInMinutes = differenceInMinutes(now, commentDate);
  if (diffInMinutes > 0) return `${diffInMinutes}min`;

  const diffInSeconds = differenceInSeconds(now, commentDate);
  if (diffInSeconds > 0) return `${diffInSeconds}seg`;

  return "agora";
}

export const CommentBox = async ({ projectId }: any) => {
  const comments = await db.comment.findMany({
    where: {
      projectId: projectId,
    },
    include: {
      user: true,
    },
  });

  return (
    <>
      <CardTitle>Comentários</CardTitle>
      <div className="space-y-8 overflow-y-auto ">
        <Card>
          <CardContent>
            <div className="space-y-4 mt-6">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    avatar={comment.user.image ? comment.user.image : ""}
                    username={comment.user.name ? comment.user.name : ""}
                    content={comment.content}
                    createdAt={
                      comment.createdAt
                        ? `${formatCommentDate(comment.createdAt)}`
                        : ""
                    }
                  />
                ))
              ) : (
                <p>Nenhum comentário</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <CommentForm projectId={projectId} />
    </>
  );
};
