"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Progress } from "../ui/progress";

interface AddCoverProps {
  setUploadedCover: (coverImage: string) => void;
  replaceUrl?: string;
}

export default function AddCover({
  setUploadedCover,
  replaceUrl,
}: AddCoverProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { edgestore } = useEdgeStore();

  const imgInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    imgInputRef.current?.click();
  };

  useEffect(() => {
    let isMounted = true;
    const uploadImage = async () => {
      if (!file) return;
      setIsUploading(true);
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          options: replaceUrl ? { replaceTargetUrl: replaceUrl } : undefined,
        });

        if (isMounted) {
          setUploadedCover(res.url);
        }
      } catch (error) {
        console.log("upload failed", error);
      } finally {
        if (isMounted) {
          setIsUploading(false);
        }
      }
    };

    uploadImage();

    return () => {
      isMounted = false;
    };
  }, [file]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        ref={imgInputRef}
        hidden
      />
      <button
        className="cursor-pointer bg-transparent underline-offset-2 p-3 rounded-md mt-4 hover:opacity-75 border-2 flex items-center gap-2"
        type="button"
        onClick={handleButtonClick}
      >
        <ImageIcon size={20} />
        <span>{replaceUrl ? "Change Cover" : "Add Cover Image"}</span>
      </button>
      {isUploading && <p className="text-green-400">Uplaoding ...</p>}
    </div>
  );
}
