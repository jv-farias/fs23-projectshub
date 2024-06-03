import { Project, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { db } from "@/lib/prisma";

interface ProjectCardProps {
  project: Project;
  user: User;
}

export const ProjectCard = async ({ project, user }: ProjectCardProps) => {
  const likesCount = await db.like.count({
    where: { projectId: project.id },
  });


  return (
    <Card className="max-md:min-w-[80%] min-w-[280px] max-w-[280px] flex flex-col gap-4 p-4 rounded-2xl">
      <CardHeader className="p-0">
        <div className="relative w-full max-md:h-[150px] h-[180px]">
          <div className="absolute top-2.5 left-1.5 z-50">
            <Badge
              variant="secondary"
              className="flex gap-1 items-center top-2 left-2 "
            >
              <FaHeart size={12} className="fill-pink-600 text-primary" />
              <span className="text-xs"> {likesCount}</span>{" "}
            </Badge>
          </div>
          <Image
            src={project.thumbnail}
            style={{ objectFit: "cover" }}
            fill
            className="rounded-xl"
            alt={project.name}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div>
          <h2 className="font-bold text-lg overflow-hidden text-ellipsis text-nowrap">
            {project.name}
          </h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {project.description}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Avatar className="rounded-sm">
            <AvatarImage
              src={user.image ? user.image : ""}
              alt={`Avatar ${user.image}`}
            />
            <AvatarFallback className="rounded-sm">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-base overflow-hidden text-ellipsis text-nowrap">
              {user.name}
            </p>
            <span className="text-sm font-semibold text-[#A1A0AE] ">
              Criador
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0 flex flex-col gap-4">
        <div className="w-full flex justify-start">
          <div className="w-full flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {project.techStack.map((stack, index) => {
              return (
                <Badge className="text-nowrap" key={index}>
                  {stack.toUpperCase()}
                </Badge>
              );
            })}
          </div>
        </div>
        <div className="flex w-full justify-between gap-4">
          <Link
            target="_blank"
            className="w-1/2"
            href={project.previewLink ? project.previewLink : ""}
          >
            <Button className="w-full">Preview</Button>
          </Link>
          <Link
            target="_blank"
            className="w-1/2"
            href={project.githubLink ? project.githubLink : ""}
          >
            <Button className="w-full" variant={"outline"}>
              Repositório
            </Button>
          </Link>
        </div>
        <div className="w-full">
          <Link
            target="_blank"
            className="w-1/2"
            href={`/project/${project.id}`}
          >
            <Button className="w-full" variant={"link"}>
              Detalhes
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
