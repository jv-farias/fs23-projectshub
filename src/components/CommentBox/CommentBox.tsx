import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { db } from "@/lib/prisma";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
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
    <div className="space-y-8 md:max-h-[600px] overflow-y-auto ">
      <Card>
        <CardHeader>
          <CardTitle>Comentários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comments.map((comment) => (
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    <CommentForm projectId={projectId} />
    </>
  );
};
