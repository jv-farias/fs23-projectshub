import { Hero } from "@/components/Hero";
import { PhoneMock } from "@/components/PhoneMock";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import Link from "next/link";

const SideMenu = async () => {
  
  const recentProject = await db.project.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const moreLikedProjects = await db.project.findMany({
    include: {
      user: true,
    },
    orderBy: {
      likes: "desc",
    },
  });

  return (
    <>
      <main className="container max-w-6xl px-10 max-lg:w-full  mx-auto ">
        <div className="pb-12 md:pt-32 md:pb-10">
          <div className="text-center pb-12 md:pb-16">
            <h1
              data-aos="zoom-y-out"
              className="text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tighter tracking-tighter"
            >
              Descubra a Criatividade e a Tecnologia da{" "}
            </h1>
            <span
              data-aos="zoom-y-out"
              className=" text-6xl md:text-6xl lg:text-7xl xl:text-8xl bg-clip-text  font-extrabold leading-tighter tracking-tighter mb-12 text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
            >
              Turma Fullstack 23
            </span>
            <div className="max-w-3xl lg:max-w-5xl mx-auto">
              <p
                className="text-xl max-md:mt-8 mt-4 text-gray-400 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Veja projetos inovadores criados por nossos talentosos alunos.
                Cada projeto é um reflexo de habilidades técnicas, criatividade
                e dedicação.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <Link href={"/explore"}>
                  <Button className="font-bold text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0">
                    Explore
                  </Button>
                </Link>
                <Link href={"/new-project"}>
                  <Button
                    variant={"secondary"}
                    className="font-bold text-white w-full sm:w-auto sm:ml-4"
                  >
                    Adicione seu projeto
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Hero />
        <section className="container px-0  flex flex-col items-center max-w-screen-2xl lg:mt-32 border-y-2 border-y-secondary py-20">
          <h3
            data-aos="zoom-y-out"
            className="z-20 text-4xl text-center md:text-5xl lg:text-6xl xl:text-7xl bg-clip-text font-extrabold leading-tighter tracking-tighter pb-10 text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
          >
            Agenda FrontEnd Day
          </h3>
          <div className="flex justify-between max-md:flex-col items-center">
            <div className="flex flex-col  gap-4 lg:pr-24">
              <h2 className="text-2xl font-bold">Funcionalidades</h2>
              <p
                data-aos="zoom-y-out"
                className="text-xl max-md:mt-4  text-gray-400 mb-8"
              >
                O foco principal foi aprimorar a experiência mobile, sem
                negligenciar a versão desktop. As funcionalidades chave do
                aplicativo incluem a animação do cronograma, já presente no site
                do Front-End Day, complementada por uma ferramenta de busca que
                facilita a localização de um palestrante específico ou de um
                horário determinado. Outra funcionalidade importante é a
                capacidade de criar um cronograma personalizado. Isso permite
                que cada usuário selecione e organize as atividades que deseja
                acompanhar, proporcionando uma experiência mais personalizada e
                eficiente.
              </p>

              <h2 className="text-2xl font-bold">Participantes</h2>

              <p
                data-aos="zoom-y-out"
                className="text-xl max-md:mt-4  text-gray-400 mb-8"
              >
                Este projeto foi realizado com a participação de {""}
                <span className="font-semibold">{""} João Vitor</span>,
                <span className="font-semibold">{""} Gustavo</span>,
                <span className="font-semibold">{""} Rodrigo</span>,
                <span className="font-semibold">{""} Gabriel Collares</span> e
                <span className="font-semibold">{""} Matheus</span>.
              </p>
            </div>

            <PhoneMock />
          </div>
        </section>

        <section
          data-aos="zoom-y-out"
          className="container px-0 flex flex-col max-w-screen-2xl mt-32"
        >
          <h3 className="font-bold mb-4">Recentes</h3>
          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {recentProject.map((project) => {
              return (
                <ProjectCard
                  project={project}
                  user={project.user}
                  key={project.id}
                />
              );
            })}
          </div>
        </section>

        <section
          data-aos="zoom-y-out"
          className="container px-0 flex flex-col max-w-screen-2xl my-10"
        >
          <h3 className="font-bold mb-4">Mais Curtidos</h3>
          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {moreLikedProjects.map((project) => {
              return (
                <ProjectCard
                  project={project}
                  user={project.user}
                  key={project.id}
                />
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default SideMenu;
