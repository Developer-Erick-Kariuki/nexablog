"use client";

import Image from "next/image";
import React from "react";
import AddCover from "./AddCover";
import { Trash, X } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverImageProps {
  setUploadedCover: (cover: string | undefined) => void;
  url: string;
  isEditor?: boolean;
}

function CoverImage({ setUploadedCover, url, isEditor }: CoverImageProps) {
  const { edgestore } = useEdgeStore();

  const handleDeleteImage = async (url: string) => {
    try {
      await edgestore.publicFiles.delete({ url });

      setUploadedCover(undefined);
    } catch (error) {
      console.log("failed to delete the image", error);
    }
  };

  return (
    <div className="relative w-full h-[35vh] group">
      <Image src={url} fill alt="cover image" />
      {isEditor && (
        <div className="absolute top-8 right-5 opacity-0 group-hover:opacity-100 flex items-center gap-2">
          <AddCover setUploadedCover={setUploadedCover} replaceUrl={url} />
          <button
            className="flex bg-rose-500 p-2 rounded-lg items-center gap-2 ml-4"
            type="button"
            onClick={() => handleDeleteImage(url)}
          >
            <Trash size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default CoverImage;
