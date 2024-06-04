import { ProjectCard } from "@/components/ProjectCard";
import { db } from "@/lib/prisma";
export const dynamic = "force-dynamic";

const ExplorePage = async () => {
  const recentProject = await db.project.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="container max-w-6xl mt-4 max-lg:w-full mx-auto ">
      <h1 className=" text-3xl md:text-3xl lg:text-4xl xl:text-5xl bg-clip-text font-extrabold leading-tighter tracking-tighter mb-10 text-transparent bg-gradient-to-r from-blue-500 to-teal-400 pb-2">
        Explore Todos os Projetos
      </h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {recentProject.map((project) => {
          return (
            <ProjectCard
              maxWidth= {false}
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

export default ExplorePage;
