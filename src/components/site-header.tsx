"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";

const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Products", "/products"],
  ["Careers", "/careers"],
  ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="page-shell header-inner">
        <Brand />
        <nav className={`main-nav${open ? " is-open" : ""}`} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link className="header-contact" href="/contact" onClick={() => setOpen(false)}>
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </Link>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {links.map(([label, href]) => (
          <Link key={href} href={href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <Link href="/contact" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
