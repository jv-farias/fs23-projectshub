"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

export const ImageUpload = ({ onChange, value }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType) {
    return (
      <div className="relative h-24 w-24 ml-4">
        <Image fill src={value} alt="Upload" className=" rounded-sm" />
        <Button
          variant={"destructive"}
          onClick={() => onChange("")}
          className="h-6 w-6 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <UploadDropzone
      appearance={{
        button: {
          marginTop: "15px",
        },
        container: {
          overflow: "hidden",
        },
      }}
      content={{
        label: "Importe uma imagem",
        allowedContent({ ready, fileTypes, isUploading }) {
          fileTypes = ["image/.png, .jpg, .jpeg"];
          if (!ready) return "Verificando o que você permite";
          if (isUploading) return "Parece que algo está sendo carregado";
          return `${fileTypes.join(", ")}`;
        },
        button({ ready }) {
          if (!ready) return "Carregando...";
        },
      }}
      endpoint="imageUploader"
      className="flex mt-0 w-full max-md:w-full rounded-none rounded-r-md border border-solid border-input  bg-background px-3 py-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onUploadProgress={(progress) => {
        console.log(progress);
      }}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
