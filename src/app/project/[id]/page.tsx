import { CommentBox } from "@/components/CommentBox";
import { LikeButton } from "@/components/LikeButton";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/prisma";
import { CalendarIcon, CodeIcon } from "lucide-react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
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
    <main className="container max-w-6xl max-md:mt-2 mt-6">
      <div className="w-full flex justify-between max-lg:gap-8 gap-16 max-md:gap-6 max-md:grid max-md:grid-cols-1 ">
        <div className="max-md:w-full w-full overflow-hidden rounded-lg object-cover">
          <Image
            alt="Project Thumbnail"
            className="max-md:min-h-[250px] w-full min-h-[500px] max-md:min-w-full overflow-hidden rounded-lg object-cover"
            width={600}
            height={600}
            src={project?.thumbnail ? project?.thumbnail : ""}
          />
        </div>
        <div className="w-[85%] ml-0">
          <div className="flex flex-col flex-wrap items-start gap-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <CgProfile className="h-4 w-4" />
                <Badge className="text-nowrap" variant={"outline"}>
                  <p className="mr-1">Criado por:</p>
                  <p>{project?.user.name}</p>
                </Badge>
              </div>
              <div className="flex items-center gap-2">
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
            </div>
            <div className="flex flex-wrap items-center gap-2">
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
          <h1 className="mt-4 text-wrap text-3xl font-bold tracking-tight sm:text-4xl">
            {project?.name}
          </h1>
          <p className="mt-4 text-wrap text-gray-500 dark:text-gray-400 ">
            {project?.description}
          </p>
          <LikeButton projectId={params.id ? params.id : ""} />
        </div>
      </div>
      <div className="space-y-8 mt-12 max-md:w-full">
        <CommentBox projectId={params.id} />
      </div>
    </main>
  );
};

export default ProjectDetailPage;
