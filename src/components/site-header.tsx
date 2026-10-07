"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { services } from "@/content/services";

const groups = [
  {
    label: "Services",
    href: "/services",
    items: services.map((service) => ({
      label: service.title,
      href: `/services#${service.slug}`,
    })),
  },
  {
    label: "Products",
    href: "/products",
    items: [{ label: "[PRODUCT NAME]", href: "/products/product-name-placeholder" }],
  },
];

const links = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

function closeOpenMenus() {
  document.querySelectorAll<HTMLDetailsElement>(".nav-dropdown[open]").forEach((menu) => {
    menu.open = false;
  });
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [homeScrollPassed, setHomeScrollPassed] = useState(false);
  const scrolled = pathname !== "/" || homeScrollPassed;
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileDialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const updateScrollState = () => setHomeScrollPassed(window.scrollY > 24);
    const frame = window.requestAnimationFrame(updateScrollState);
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollState);
    };
  }, [pathname]);

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
    closeOpenMenus();
    menuButton.current?.focus();
  }

  const isHomeTop = pathname === "/" && !scrolled;

  return (
    <header className={`site-header${pathname === "/" ? " is-home" : ""}${isHomeTop ? " is-home-top" : ""}${scrolled ? " is-scrolled" : ""}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="page-shell header-inner">
        <Brand />
        <nav className="main-nav" aria-label="Main navigation">
          {groups.map((group) => (
            <details className="nav-dropdown" key={group.label}>
              <summary>
                <span>{group.label}</span>
                <ChevronDown size={14} aria-hidden="true" />
              </summary>
              <div className="dropdown-panel">
                {group.items.map((item) => (
                  <Link href={item.href} key={item.href} onClick={closeOpenMenus}>
                    {item.label}
                  </Link>
                ))}
                <Link className="dropdown-all" href={group.href} onClick={closeOpenMenus}>
                  Explore all {group.label.toLowerCase()} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </details>
          ))}
          {links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
          <details className="nav-dropdown">
            <summary>
              <span>Resources</span>
              <ChevronDown size={14} aria-hidden="true" />
            </summary>
            <div className="dropdown-panel">
              <Link href="/blog">Blog <span className="coming-soon-tag">Soon</span></Link>
              <Link href="/case-studies">Case studies <span className="coming-soon-tag">Soon</span></Link>
            </div>
          </details>
          <Link href="/contact">Contact</Link>
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
          {groups.map((group) => (
            <details key={group.label}>
              <summary>{group.label}<ChevronDown size={17} aria-hidden="true" /></summary>
              <div className="mobile-nav-submenu">
                {group.items.map((item) => <Link href={item.href} key={item.href} onClick={closeMenu}>{item.label}</Link>)}
                <Link href={group.href} onClick={closeMenu}>Explore all {group.label.toLowerCase()}</Link>
              </div>
            </details>
          ))}
          {links.map((link) => <Link href={link.href} key={link.href} onClick={closeMenu}>{link.label}</Link>)}
          <details>
            <summary>Resources<ChevronDown size={17} aria-hidden="true" /></summary>
            <div className="mobile-nav-submenu">
              <Link href="/blog" onClick={closeMenu}>Blog · Coming soon</Link>
              <Link href="/case-studies" onClick={closeMenu}>Case studies · Coming soon</Link>
            </div>
          </details>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
          <Link className="button mobile-contact" href="/contact" onClick={closeMenu}>Contact us ↗</Link>
        </nav>
      </div>
    </header>
  );
}
