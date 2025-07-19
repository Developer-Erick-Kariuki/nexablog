"use client";

import React, { useEffect } from "react";
import Container from "../common/Container";
import Link from "next/link";
import Image from "next/image";
import ToggleTheme from "../common/ToggleTheme";
import SearchInput from "../SearchInput";
import Notifications from "../Notifications";
import UserButton from "../UserButton";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const session = useSession();

  const isLoggedIn = session.status === "authenticated";
  const path = usePathname();

  useEffect(() => {
    if (!isLoggedIn && path) {
      const updateSession = async () => {
        await session.update();
      };
      updateSession();
    }
  }, [path, isLoggedIn]);
  return (
    <header className="border-b">
      <Container>
        <nav className="flex items-center py-4 justify-between mx-auto">
          <Link href="/">
            <Image
              src="/logo-white.png"
              width={180}
              height={48}
              alt="site-logo"
            />
          </Link>
          <SearchInput />
          <ul className="flex justify-between gap-6">
            <ToggleTheme />

            {isLoggedIn && <Notifications />}
            {isLoggedIn && <UserButton />}
            {!isLoggedIn && (
              <>
                {" "}
                <Link href="/login">Signin</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
