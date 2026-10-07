import Link from "next/link";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      className={`brand${footer ? " brand-footer" : ""}`}
      href="/"
      aria-label="Vallumnar home"
    >
      <svg
        aria-hidden="true"
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
      >
        <rect width="34" height="34" rx="11" fill="currentColor" />
        <path
          d="M8.5 11.5 16.8 24l8.7-13"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="26" cy="10" r="2" fill="#7DD3FC" />
      </svg>
      <span>vallumnar</span>
    </Link>
  );
}
