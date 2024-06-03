"use client";

import { addProject } from "@/actions/createProject";
import { Icons } from "@/components/Icons";
import { InputTags } from "@/components/InputTags";
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
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookTextIcon, FolderPen, ImageIcon, Link } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImageUpload } from "../ImageUpload";

const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 3 characters.",
  }),
  description: z
    .string()
    .min(3, { message: "Description project must be at least 3 characters" })
    .max(255, {
      message: "Description project must be at maximum 255 characters",
    }),
  previewLink: z.string().url({
    message: "Preview Link must be valid",
  }),
  repositoryLink: z.string().url({ message: "Repository Link must be valid" }),
  imagePreview: z.string().url({ message: "Image URL is required" }),
  technologies: z
    .array(z.string())
    .min(1, { message: "At least one technology is required" }),
});

export const ProjectForm = () => {
  const { data } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      description: "",
      previewLink: "",
      repositoryLink: "",
      imagePreview: "",
      technologies: [],
    },
  });

  const handleImageUploaded = (url: string) => {
    setImagePreview(url);
    form.setValue("imagePreview", url);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const isValid = await form.trigger("imagePreview");
    if (!isValid) return;

    try {
      const userId = data?.user?.id;
      if (!userId) {
        throw new Error("User is not logged in");
      }
      await addProject({
        name: values.projectName,
        description: values.description,
        githubLink: values.repositoryLink,
        previewLink: values.previewLink,
        thumbnail: values.imagePreview,
        techStack: values.technologies.map((tech) => ({ name: tech })),
        userId: userId,
      });

      form.reset();

      toast({
        title: "Projeto publicado",
        description: "Seu projeto foi publicado com sucesso!",
        action: (
          <ToastAction
            onClick={() => {
              router.push("/my-projects");
            }}
            altText="Visualizar"
          >
            Visualizar
          </ToastAction>
        ),
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Projeto</FormLabel>
              <FormControl>
                <div className="flex">
                  <div className="bg-secondary h-10 flex items-center justify-center rounded-l-lg min-w-10 max-w-10">
                    <FolderPen className="w-[18px] opacity-30" />
                  </div>
                  <Input
                    placeholder="Nome do Projeto"
                    {...field}
                    className="rounded-none rounded-r-md"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <div className="flex">
                  <div className="bg-secondary h-10 flex items-center justify-center rounded-l-lg min-h-[100px] min-w-10">
                    <BookTextIcon className="w-[18px] opacity-30" />
                  </div>
                  <Textarea
                    placeholder="Description your project"
                    {...field}
                    className="rounded-none rounded-r-md min-h-[100px]"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imagePreview"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex">
                  <div className="bg-secondary flex items-center justify-center rounded-l-lg min-w-10 max-w-10">
                    <ImageIcon className="w-[18px] opacity-30" />
                  </div>
                  <ImageUpload value={field.value} onChange={field.onChange} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="previewLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preview Link </FormLabel>
              <FormControl>
                <div className="flex">
                  <div className="bg-secondary h-10 flex items-center justify-center rounded-l-lg min-w-10 max-w-10">
                    <Link className="w-[18px] opacity-30" />
                  </div>
                  <Input
                    placeholder="www.your-preview-link.com"
                    {...field}
                    className="rounded-none rounded-r-md"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repositoryLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repository Link </FormLabel>
              <FormControl>
                <div className="flex">
                  <div className="bg-secondary h-10 flex items-center justify-center rounded-l-lg min-w-10 max-w-10">
                    <Icons.GitHub className="w-[18px] opacity-30" />
                  </div>
                  <Input
                    placeholder="www.github.com/your-project"
                    {...field}
                    className="rounded-none rounded-r-md"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Technologies</FormLabel>
              <FormControl>
                <InputTags {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};
