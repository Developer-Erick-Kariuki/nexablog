"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import "./editor.css";

interface BlockNoteEditorProps {
  onChange?: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export default function BlockNoteEditor({
  initialContent,
  onChange,
  editable,
}: BlockNoteEditorProps) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleImageUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });

    return res.url;
  };

  const editor = useCreateBlockNote({
    uploadFile: handleImageUpload,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={
        onChange
          ? () => {
              onChange(JSON.stringify(editor.document));
            }
          : () => {}
      }
      editable={editable}
    />
  );
}
