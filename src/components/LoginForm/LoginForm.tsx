"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import { z } from "zod";

export const LoginForm = () => {
  const router = useRouter();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingGithub, setLoadingGithub] = useState(false);

  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoadingLogin(true);
    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/",
      redirect: true,
    }).then((signInData) => {
      setLoadingLogin(false);
      if (signInData?.error) {
        console.error("Failed to sign in: ", signInData.error);
      }
    });
  };

  const handleLoginGithub = async () => {
    setLoadingGithub(true);
    signIn("github", {
      callbackUrl: "/",
      redirect: false,
    }).then((result) => {
      setTimeout(() => {
        setLoadingGithub(false);
      }, 2000);
      if (result?.error) {
        console.error("Failed to sign in: ", result.error);
      } else {
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    });
  };

  return (
    <section className="flex flex-col items-center  justify-center">
      <h1 className="text-3xl font-bold">Bem-vindo de volta!</h1>
      <h2 className="mt-3 text-gray-300 font-medium text-center">
        Faça login no Projects Hub com o seu email e senha ou com o GitHub.
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-8 w-full"
        >
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
          <Button className="w-full font-bold" type="submit">
            {loadingLogin ? (
              <CgSpinner className="animate-spin" size={20} />
            ) : (
              <>
                <p className="font-bold py-6">Login</p>
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
        onClick={handleLoginGithub}
        className="w-full mx-auto py-6 flex gap-3 items-center"
      >
        {loadingGithub ? (
          <CgSpinner className="animate-spin" size={20} />
        ) : (
          <>
            <FaGithub size={20} />
            <p className="font-bold">Continue com o GitHub</p>
          </>
        )}
      </Button>
      <p className="text-gray-300 font-semibold text-sm mt-4">
        Se você não tem uma conta, você pode se registrar{" "}
        <Link href="/register" className="text-blue-500">
          aqui
        </Link>
      </p>
    </section>
  );
};
