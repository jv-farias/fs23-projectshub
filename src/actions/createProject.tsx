"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddProjectParams {
  name: string;
  thumbnail: string;
  description: string;
  githubLink: string;
  previewLink: string;
  techStack: TechStack[];
  userId: string;
}

interface TechStack {
  name: string;
}

export const addProject = async (params: AddProjectParams) => {
  interface TechStack {
    name: string;
  }

  await db.project.create({
    data: {
      userId: params.userId,
      name: params.name,
      thumbnail: params.thumbnail,
      description: params.description,
      githubLink: params.githubLink,
      previewLink: params.previewLink,
      techStack: params.techStack.map((tech: TechStack) => tech.name),
    },
  });

  revalidatePath("/");
  revalidatePath("/my-projects");
};
