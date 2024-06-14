"use client";
import Link from "next/link";
import style from "./nav-link.module.css";
import { usePathname } from "next/navigation";

export default function Navlink({ href, children }) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={`${path === href && style.active} ${style.link}`}
    >
      {children}
    </Link>
  );
}
