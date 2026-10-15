"use client";

import Link from "next/link";
import { navItems } from "@/config/site";

type NavLinksProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export default function NavLinks({
  variant = "desktop",
  onNavigate,
}: NavLinksProps) {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={
            variant === "mobile" ? "nav-link nav-link-mobile" : "nav-link"
          }
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
