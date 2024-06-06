import { ProjectForm } from "@/components/ProjectForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const NewProjectPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <>
      <main className="container max-w-6xl xl:max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-4xl bg-clip-text font-extrabold self-center leading-tighter tracking-tighter text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Participe da nossa comunidade
          </h1>
          <p>
            Ao compartilhar seu projeto conosco, você tem a oportunidade de
            receber feedback valioso e aprimorar seu trabalho. Não hesite, faça
            parte!
          </p>
        </div>
        <ProjectForm />
      </main>
    </>
  );
};

export default NewProjectPage;
