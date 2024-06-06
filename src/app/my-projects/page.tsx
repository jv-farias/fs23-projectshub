import { MyProjectCard } from "@/components/MyProjectCard";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { Frown, FrownIcon } from "lucide-react";
import { getServerSession } from "next-auth";

const MyProjects = async () => {
  const session = await getServerSession(authOptions);

  const [myProjects] = await Promise.all([
    db.project.findMany({
      where: {
        userId: session?.user.id,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);
  

  return (
    <main className="container max-w-6xl mt-4 max-lg:w-full mx-auto ">
      <h1 className=" text-3xl md:text-3xl lg:text-3xl xl:text-4xl bg-clip-text font-extrabold leading-tighter tracking-tighter mb-10 text-transparent bg-gradient-to-r from-blue-500 to-teal-400 pb-2">
      {myProjects.length === 0 ? `Olá, ${session?.user.name}! Você ainda não tem projetos :(` : `Olá, ${session?.user.name}! Aqui estão seus projetos:`}
      </h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {myProjects.map((project) => {
          return (
            <MyProjectCard
              project={project}
              user={project.user}
              key={project.id}
            />
          );
        })}
      </div>
    </main>
  );
};

export default MyProjects;
