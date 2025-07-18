import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

export default function SearchInput() {
  return (
    <div className="relative hidden md:block">
      <Search className="absolute top-3 left-4 h-4 w-4" />
      <Input placeholder="Search blogs" className="pl-10" />
    </div>
  );
}
