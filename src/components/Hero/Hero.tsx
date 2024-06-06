"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import { Separator } from "../ui/separator";

export const Hero = () => {
  const [tab, setTab] = useState<number>(1);
  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <section className="w-full flex">
      <div className="max-w-6xl mx-auto">
        <div data-aos="zoom-y-out">
          <Separator
            orientation="vertical"
            className="h-16 mx-auto bg-secondary w-1"
          />
          <Separator className="w-16 mx-auto bg-secondary h-1" />
        </div>

        <div className="pt-12 md:pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Nossa Trajetória</h1>
            <p className="text-xl text-gray-400">
              Ao longo de um ano, nosso mentor, Abraão Alves, nos conduziu na
              jornada para nos tornarmos desenvolvedores Fullstack. O curso
              abrangeu desde o básico do desenvolvimento web até a criação de
              servidores robustos e eficientes. Aprendemos a pensar criticamente
              sobre problemas e, o mais importante, a trabalhar em equipe e a
              construir soluções completas do início ao fim. O curso também
              enfatizou a importância dos testes, ensinando-nos a escrever
              testes unitários e end-to-end para garantir a qualidade do nosso
              código.
            </p>
          </div>
          <div className="md:grid md:grid-cols-12 md:gap-6 mt-10">
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="mb-8 md:mb-0 lg:pr-10">
                <div
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 1 ? "bg-secondary shadow-md border-gray-700 hover:shadow-lg" : "bg-[#1D1D1D] border-transparent"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Front-end
                    </div>
                    <div className="text-gray-300 text-base">
                      Vimos como criar interfaces modernas e responsivas
                      utilizando HTML, CSS e JavaScript. Aprendemos a dominar
                      frameworks populares como React e Tailwind para construir
                      aplicações web interativas e visualmente atraentes.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <FaReact
                      size={20}
                      className="animate-spin-slow text-secondary"
                    />
                  </div>
                </div>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 2 ? "bg-secondary shadow-md border-gray-700 hover:shadow-lg" : "bg-[#1D1D1D] border-transparent"}`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Back-end
                    </div>
                    <div className="text-gray-300 text-base">
                      Exploramos a lógica do servidor com Node.js e Express.
                      Aprendemos a gerenciar bancos de dados com PostgreSQL e
                      SQL, e utilizamos o Drizzle ORM para simplificar a
                      interação com o banco de dados.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <BiLogoPostgresql className="text-secondary" />
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${tab !== 3 ? "bg-secondary shadow-md border-gray-700 hover:shadow-lg" : "bg-[#1D1D1D] border-transparent"}`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(3);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Testes de Software
                    </div>
                    <div className="text-gray-300 text-base">
                      Garantimos a qualidade do nosso código com testes
                      unitários utilizando Jest e Vitest, e simulamos
                      comportamentos com MockJS. Realizamos testes de ponta a
                      ponta com Cypress para verificar a funcionalidade completa
                      das nossas aplicações.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <FaRobot size={20} className="text-secondary" />
                  </div>
                </a>
              </div>
            </div>
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <div className="transition-all">
                <div
                  className="relative flex flex-col text-center lg:text-right overflow-hidden"
                  data-aos="zoom-y-out"
                  ref={tabs}
                >
                  {tab === 1 && (
                    <div className="relative mt-5 inline-flex flex-col">
                      <Image
                        data-aos="fade-left"
                        className="md:max-w-none max-md:hidden mx-auto rounded"
                        src={
                          "https://cdn.leonardo.ai/users/ef12bd53-5876-44f4-87b7-e86eee283d9c/generations/65a03da5-e1c7-4c0f-a692-00256f16df9d/Default_frontend_developer_boy_character_with_black_hair_and_f_0.jpg"
                        }
                        width={500}
                        height={500}
                        alt="Features bg"
                      />
                    </div>
                  )}
                  {tab === 2 && (
                    <div className="relative mt-5 inline-flex flex-col">
                      <Image
                        data-aos="fade-left"
                        className="md:max-w-none max-md:hidden mx-auto rounded"
                        src={
                          "https://cdn.leonardo.ai/users/ef12bd53-5876-44f4-87b7-e86eee283d9c/generations/6574201c-9368-4d78-adbc-0988a06bb27d/Default_backend_developer_girl_character_with_yellow_hair_and_1.jpg"
                        }
                        width={500}
                        height={500}
                        alt="Features bg"
                      />
                    </div>
                  )}
                  {tab === 3 && (
                    <div className="relative inline-flex flex-col mt-5">
                      <Image
                        data-aos="fade-left"
                        className="md:max-w-none max-md:hidden mx-auto rounded"
                        src={
                          "https://cdn.leonardo.ai/users/ef12bd53-5876-44f4-87b7-e86eee283d9c/generations/45fd5e59-5849-4abe-aa74-35e347ebaedd/Default_quality_assurance_character_robot_with_macbook_with_p_1.jpg"
                        }
                        width={500}
                        height={500}
                        alt="Features bg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
