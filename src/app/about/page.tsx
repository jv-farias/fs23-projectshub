import { Icons } from "@/components/Icons";
import Link from "next/link";

const AboutPage = async () => {
  return (
    <main className="container max-w-6xl px-10 max-lg:w-full  mx-auto ">
      <h1 className=" text-3xl md:text-3xl lg:text-4xl xl:text-5xl bg-clip-text font-extrabold leading-tighter tracking-tighter mb-8 text-transparent bg-gradient-to-r from-blue-500 to-teal-400 pb-2">
        Sobre o Projeto
      </h1>
      <ul className="flex flex-col space-y-4 w-full text-lg font-semibold mb-4">
        <li>
          <p>
            O projeto FS23-Projects Hub foi criado com o objetivo de reunir e
            armazenar todos os projetos desenvolvidos pela nossa turma em um
            único lugar. A ideia principal é permitir que possamos ver o que
            cada um fez, promovendo a troca de conhecimentos e a valorização do
            trabalho de todos. Além disso, essa plataforma nos oferece a
            oportunidade de, no futuro, olhar para trás e ver o quanto
            evoluímos, tanto individualmente quanto coletivamente.
          </p>
        </li>
        <li>
          <p>
            Este projeto surgiu de maneira espontânea, mas com uma excelente
            intenção: fortalecer a nossa comunidade acadêmica e incentivar a
            colaboração e o crescimento contínuo. Queremos criar um ambiente
            onde todos se sintam motivados a compartilhar suas conquistas e
            aprender uns com os outros.
          </p>
        </li>
        <li>
          <p>
            A base do projeto é desenvolvida em Next.js com React e TypeScript
            que nos oferece uma estrutura robusta e flexível. TailwindCSS foi
            escolhido para estilizar a interface. Para o back-end, foi utilizado
            Prisma ORM e PostgreSQL, garantindo uma interação eficiente e
            confiável com o banco de dados. Além disso, shadcn-ui foi empregado
            para melhorar ainda mais a usabilidade e a aparência do projeto.
          </p>
        </li>
        <li>
          <p>
            O FS23-Projects Hub é um projeto público, o que significa que
            qualquer pessoa interessada pode contribuir. Novas ideias, melhorias
            e colaborações são sempre bem-vindas, pois acredito que o trabalho
            em equipe é fundamental para o sucesso e a evolução contínua.
            Esperamos que todos tenham gostado dessa iniciativa e que ela sirva
            como um recurso valioso para a nossa turma. Que possamos aprender,
            crescer e celebrar nossas conquistas juntos. Até a próxima!
          </p>
        </li>
        <li className="flex flex-wrap items-center gap-4">
          <Link href={"https://www.github.com/jv-farias/fs23-projects-hub"} target="_blank">
            <Icons.GitHub className="w-6 h-6" />
          </Link>

          <Link href={"https://www.npmjs.com"} target="_blank">
            <Icons.Npm className="w-6 h-6" />
          </Link>

          <Link href={"https://www.react.com"} target="_blank">
            <Icons.React className="w-6 h-6" />
          </Link>

          <Link href={"https://www.shadcn-ui.com"} target="_blank">
            <Icons.Logo className="w-6 h-6" />
          </Link>

          <Link href={"https://www.tailwindcss.com"} target="_blank">
            <Icons.Tailwind className="w-6 h-6" />
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default AboutPage;
