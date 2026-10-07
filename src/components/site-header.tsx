"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";

const links = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [homeScrollPassed, setHomeScrollPassed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const scrolled = pathname !== "/" || homeScrollPassed;
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileDialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;
    const updateScrollState = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setHomeScrollPassed(currentY > 24);
        if (open || currentY <= 24 || currentY < previousY - 3) {
          setHidden(false);
        } else if (currentY > previousY + 3 && currentY > 120) {
          setHidden(true);
        }
        previousY = currentY;
      });
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollState);
    };
  }, [open, pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const focusable = () =>
      Array.from(
        mobileDialog.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), summary, input:not([disabled])',
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0);
    const first = focusable()[0];
    first?.focus();

    function trapFocus(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const elements = focusable();
      if (!elements.length) return;
      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [open]);

  function closeMenu() {
    setOpen(false);
    menuButton.current?.focus();
  }

  const isHomeTop = pathname === "/" && !scrolled;
  const headerClassName = [
    "site-header",
    pathname === "/" ? "is-home" : "",
    isHomeTop ? "is-home-top" : "",
    scrolled ? "is-scrolled" : "",
    hidden && !open ? "is-hidden" : "",
    open ? "is-menu-open" : "",
  ].filter(Boolean).join(" ");

  return (
    <header className={headerClassName}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="page-shell header-inner">
        <Brand />
        <nav className="main-nav" aria-label="Main navigation">
          {links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
          <Link className="header-contact" href="/contact">
            Contact us <span aria-hidden="true">↗</span>
          </Link>
        </nav>
        <button
          ref={menuButton}
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
      <div
        id="mobile-navigation"
        ref={mobileDialog}
        className={`mobile-nav-dialog${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal={open || undefined}
        aria-label="Navigation menu"
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link href="/" onClick={closeMenu}>Home</Link>
          {links.map((link) => <Link href={link.href} key={link.href} onClick={closeMenu}>{link.label}</Link>)}
          <Link className="button mobile-contact" href="/contact" onClick={closeMenu}>Contact us ↗</Link>
        </nav>
      </div>
    </header>
  );
}
