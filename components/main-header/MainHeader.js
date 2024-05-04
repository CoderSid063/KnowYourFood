import Link from "next/link";
import logoImg from "@/assets/logo.png";
import style from "./mainheader.module.css";
import Image from "next/image";
import MainHeaderBackground from "./MainHeaderBackground";
import Navlink from "./nav-link";

export default function MainHeader(params) {
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
          </ul>
        </nav>
      </header>
    </>
  );
}
