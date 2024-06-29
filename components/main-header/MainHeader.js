"use client";

import Link from "next/link";
import logoImg from "@/assets/logo.png";
import style from "./mainheader.module.css";
import Image from "next/image";
import MainHeaderBackground from "./MainHeaderBackground";
import Navlink from "./nav-link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function MainHeader() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogin = () => {
    router.push("/sign-in");
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  // console.log("Session:", session);

  return (
    <>
      <MainHeaderBackground />
      <header className={style.header}>
        <Link href="/" className={style.logo}>
          <Image src={logoImg} priority={true} alt="LOGO" />
          NextLevel Food
        </Link>
        <nav className={style.nav}>
          <ul>
            <li>
              <Navlink href="/meals">Browse Meals</Navlink>
            </li>
            <li>
              <Navlink href="/community">Foodies Community</Navlink>
            </li>
            {session ? (
              <>
                <li>
                  <button onClick={handleLogout} className={style.button}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={handleLogin} className={style.button}>
                    Login
                  </button>
                </li>
                <li>
                  <button onClick={handleSignup} className={style.button}>
                    Sign Up
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
