"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, Pencil, Shield, User, UserRound } from "lucide-react";
import { FaBookmark } from "react-icons/fa";

import { signOut, useSession } from "next-auth/react";

export default function UserButton() {
  const session = useSession();

  const imageURL = session.data?.user.image || "";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-2 rounded-full border-slate-800 dark:border-slate-300">
        <Avatar>
          <AvatarImage src={imageURL} />
          <AvatarFallback>
            <UserRound />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <User size={18} /> Profile
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <Pencil size={18} /> Create Post
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <FaBookmark size={18} /> Bookmark
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <Shield size={18} /> Admin
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2" onClick={() => signOut()}>
            <LogOut size={18} /> Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
