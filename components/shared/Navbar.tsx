import React from "react";
import Container from "../common/Container";
import Link from "next/link";
import Image from "next/image";
import ToggleTheme from "../common/ToggleTheme";
import SearchInput from "../SearchInput";
import Notifications from "../Notifications";
import UserButton from "../UserButton";

const Navbar = () => {
  const session: boolean = true;
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
            <Notifications />
            <UserButton />
            {session ? (
              <h2>User</h2>
            ) : (
              <>
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
