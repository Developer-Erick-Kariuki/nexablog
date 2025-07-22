"use client";

import { BlogSchema, BlogSchemaType } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import Formfield from "../shared/Formfield";
import AddCover from "./AddCover";
import { useEffect, useState, useTransition } from "react";
import CoverImage from "./CoverImage";
import { tags } from "@/lib/costants";
import Button from "../shared/Button";
import BlockNoteEditor from "./editor/BlockNoteEditor";
import { toast } from "sonner";
import { createBlog } from "@/actions/blog/create-blog";

export default function CreateBlogForm() {
  const session = useSession();

  const [content, setContent] = useState<string | undefined>();

  const userId = session.data?.user.userId;

  const [uploadedCover, setUploadedCover] = useState<string>();

  const [isPublishing, startPublishing] = useTransition();

  const [isSavingDraft, startSaving] = useTransition();

  const { register, handleSubmit, formState, setValue } =
    useForm<BlogSchemaType>({
      resolver: zodResolver(BlogSchema),
      defaultValues: {
        userId,
        isPublished: false,
      },
    });

  useEffect(() => {
    if (uploadedCover) {
      setValue("coverImage", uploadedCover, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [uploadedCover]);

  useEffect(() => {
    if (typeof content === "string") {
      setValue("content", content, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [content]);

  const onChange = (content: string) => {
    setContent(content);
  };

  const onPublish: SubmitHandler<BlogSchemaType> = (data) => {
    if (data.tags.length > 4) {
      return toast.error("Only a maximum of 4 tags is allowed");
    }

    startPublishing(() => {
      createBlog({ ...data, isPublished: true }).then((data) => {
        if (data.error) {
          return toast.error(data.error);
        }

        if (data.success) {
          return toast.success(data.success);
        }
      });
    });
  };

  const saveToDraft: SubmitHandler<BlogSchemaType> = (data) => {
    startSaving(() => {
      createBlog({ ...data, isPublished: false }).then((data) => {
        if (data.error) {
          return toast.error(data.error);
        }

        if (data.success) {
          return toast.success(data.success);
        }
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onPublish)}
      className="flex flex-col justify-between max-w-[1200px] m-auto min-h-[85vh] "
    >
      <div>
        {uploadedCover && (
          <CoverImage
            setUploadedCover={setUploadedCover}
            url={uploadedCover}
            isEditor={true}
          />
        )}

        {!uploadedCover && <AddCover setUploadedCover={setUploadedCover} />}

        <Formfield
          id="title"
          register={register}
          error={formState.errors.title}
          placeholder="Blog Title"
          disabled={false}
          inputClassNames="border-none text-5xl font-semibold bg-transparent px-0"
        />
        <fieldset className="flex flex-col border-y mb-4 py-2">
          <legend className="mb-2 pr-2">Select 4 tags</legend>
          <div className="flex gap-4 flex-wrap w-full">
            {tags.map((tag) => {
              if (tag === "All") {
                return null;
              }

              return (
                <label className="flex items-center space-x-2" key={tag}>
                  <input
                    type="checkbox"
                    value={tag}
                    {...register("tags")}
                    disabled={false}
                  />
                  <span>{tag}</span>
                </label>
              );
            })}
          </div>
          {formState.errors.tags && (
            <span className="text-sm text-rose-400">A tag is required</span>
          )}
        </fieldset>
        <BlockNoteEditor onChange={onChange} />
        {formState.errors.content && (
          <span className="text-sm text-rose-400">
            Content can not be empty
          </span>
        )}
      </div>

      <div className="border-t pt-2">
        {formState.errors.userId?.message && (
          <span className="text-sm text-rose-400">No userId found</span>
        )}

        <div className="flex items-center  gap-2">
          <Button
            type="submit"
            label={isPublishing ? "Publishing..." : "Publish"}
            className="bg-blue-400"
          />
          <Button
            type="button"
            label={isSavingDraft ? "Saving ..." : "Save as Draft"}
            onClick={handleSubmit(saveToDraft)}
          />
          <Button type="button" label="Delete" className="bg-rose-400" />
        </div>
      </div>
    </form>
  );
}
