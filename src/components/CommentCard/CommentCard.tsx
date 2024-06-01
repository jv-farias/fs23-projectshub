import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CommentCardProps } from "./types";

export const CommentCard = ({
  avatar,
  username,
  content,
  createdAt,
}: CommentCardProps) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-10 w-10">
        <AvatarImage alt={username} src={avatar} />
        <AvatarFallback>{username}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm">{username}</h4>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {createdAt}
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400">{content}</p>
      </div>
    </div>
  );
};
