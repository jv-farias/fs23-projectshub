"use client";
/* eslint-disable react/no-unescaped-entities */

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formSchema = z
    .object({
      name: z.string().min(1, "Nome é obrigatório").max(100),
      email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
      password: z
        .string()
        .min(1, "Senha é obrigatória")
        .min(8, "Senha deve ter no mínimo 8 caracteres"),
      confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "As senhas não coincidem",
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    });

    if (!response.ok) {
      console.error("Failed to register");
      return;
    }
    router.push("/sign_in");
    setLoading(false);
  };

  const handleLoginClick = async () => {
    setLoading(true);
    const result = await signIn("github", { callbackUrl: "/" });
    if (result?.error) {
      console.error("Failed to sign in: ", result.error);
    } else {
      router.push("/");
    }
    setLoading(false);
  };
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Registrar</h1>
      <h2 className="my-5 text-gray-300 font-medium text-center">
        Crie sua conta para começar a usar o ProjectsHub
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirme sua senha"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full font-bold" type="submit">
            {loading ? (
              <CgSpinner className="animate-spin" size={20} />
            ) : (
              <>
                <p className="font-bold py-6">Registrar</p>
              </>
            )}
          </Button>
        </form>
      </Form>
      <div className="flex items-center justify-center my-4 w-full overflow-hidden">
        <Separator className="w-full" />
        <p className="mx-4 text-gray-300 font-semibold text-sm">OU</p>
        <Separator className="w-full" />
      </div>

      <Button
        variant={"outline"}
        onClick={handleLoginClick}
        className="w-full mx-auto py-6 flex gap-3 items-center"
      >
        {loading ? (
          <CgSpinner className="animate-spin" size={20} />
        ) : (
          <>
            <FaGithub size={20} />
            <p className="font-bold">Continue com o GitHub</p>
          </>
        )}
      </Button>
    </section>
  );
};
