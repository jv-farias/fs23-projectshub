"use client";

import { addComent } from "@/actions/createComment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CommentFormProps } from "./types";
import { useState } from "react";
import { SpinnerIcon } from "../Icons/index.stories";
import { Spinner } from "../Icons/Icons";
const formSchema = z.object({
  content: z.string().min(1, {
    message: "Comentário deve ter pelo menos 1 caractere.",
  }),
});

export const CommentForm = ({ projectId }: CommentFormProps) => {
  const { data } = useSession();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const userId = data?.user?.id;
      if (!userId) {
        throw new Error("User is not logged in");
      }

      await addComent({
        userId: userId,
        content: values.content,
        projectId: projectId,
      });
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex">
                  <Input
                    placeholder="Adicione um comentário..."
                    {...field}
                    className="rounded-l-none"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <Button type="submit" className="w-full" disabled>
            <Spinner />
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            Comentar
          </Button>
        )}
      </form>
    </Form>
  );
};
