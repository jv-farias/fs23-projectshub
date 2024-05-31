/* eslint-disable react/no-unescaped-entities */

import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/LoginForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LoginPage = () => {
  return (
    <section className="max-lg:p-0 p-6 flex w-scren flex-1 h-screen bg-[#212227] ">
      <div className="max-lg:hidden justify-between bg-[#212227]Í flex flex-col  items-start w-2/5">
        <h1 className="text-xl font-extrabold">DCTEAM 23</h1>
        <div className="flex flex-col items-start gap-6 justify-center pr-8">
          <p className="italic font-medium text-gray-400">
            "A turma FS-23 foi fundamental para o meu crescimento, tanto
            profissional quanto pessoal. Durante o curso, aprendi não apenas
            sobre programação, mas também desenvolvi laços de amizade que
            levarei para a vida toda. Juntos, superamos desafios, celebramos
            conquistas e criamos um ambiente de apoio mútuo."
          </p>
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://media.licdn.com/dms/image/D4D03AQEiQZeCZT44mg/profile-displayphoto-shrink_800_800/0/1713622054745?e=1721865600&v=beta&t=Nyah3wnZK_q0dSyorFDwz65VZrnBby3Sh0JB0-GnULc" />
              <AvatarFallback>João Vitor</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-bold">João Vitor Farias</p>
              <p className="text-xs text-gray-400 font-bold">
                Criador do Repósitorio de Projetos
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#17191C] flex items-center justify-center px-3 w-full rounded-2xl ">
        <div className="w-[90%] md:w-[60%] lg:w-[40%] ">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};
export default LoginPage;
