import { CommentBox } from "@/components/CommentBox";
import { LikeButton } from "@/components/LikeButton";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/prisma";
import { CalendarIcon, CodeIcon } from "lucide-react";
import Image from "next/image";
import { ProjectPageProps } from "./types";

const ProjectDetailPage = async ({ params }: ProjectPageProps) => {
  const project = await db.project.findUnique({
    where: {
      id: params.id,
    },

    include: {
      user: true,
    },
  });

  return (
    <main className="container mx-auto my-12 px-4 md:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <div>
          <Image
            alt="Project Thumbnail"
            className="w-full overflow-hidden rounded-lg object-cover"
            width={1500}
            height={1500}
            src={project?.thumbnail ? project?.thumbnail : ""}
          />
          <div className="mt-6 flex  flex-col flex-wrap items-start gap-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <Badge className="text-nowrap" variant={"outline"}>
                Data de criação:{" "}
                {project?.createdAt
                  ? new Date(project.createdAt).toLocaleDateString("pt-br", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : ""}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <CodeIcon className="h-4 w-4" />
              {project?.techStack.map((stack, index) => {
                return (
                  <Badge className="text-nowrap" key={index}>
                    {stack.toUpperCase()}
                  </Badge>
                );
              })}
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {project?.name}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            {project?.description}
          </p>
          <LikeButton projectId={params.id ? params.id : ""} />
        </div>
        <div className="space-y-8">
          <CommentBox projectId={params.id} />
        </div>
      </div>
    </main>
  );
};

export default ProjectDetailPage;
