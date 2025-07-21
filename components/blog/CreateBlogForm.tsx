"use client";

import { BlogSchema, BlogSchemaType } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Formfield from "../shared/Formfield";
import AddCover from "./AddCover";
import { useState } from "react";

export default function CreateBlogForm() {
  const session = useSession();

  const userId = session.data?.user.id;

  const [uploadedCover, setUploadedCover] = useState<string>();

  console.log(uploadedCover);

  const { register, handleSubmit, formState, setValue } =
    useForm<BlogSchemaType>({
      resolver: zodResolver(BlogSchema),
      defaultValues: {
        userId,
        isPublished: false,
      },
    });

  const onSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between max-w-[1200px] m-auto min-h-[85vh] "
    >
      <div>
        <AddCover setUploadedCover={setUploadedCover} />
        <Formfield
          id="title"
          register={register}
          error={formState.errors.title}
          placeholder="Blog Title"
          disabled={false}
          inputClassNames="border-none text-5xl font-semibold bg-transparent px-0"
        />
      </div>
    </form>
  );
}
