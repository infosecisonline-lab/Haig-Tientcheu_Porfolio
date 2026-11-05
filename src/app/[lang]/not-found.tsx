import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container-x" style={{ minHeight: "80svh", display: "grid", alignContent: "center", gap: "1.5rem" }}>
      <h1 className="h-section">404</h1>
      <p className="m-0">This page does not exist. / Cette page n’existe pas.</p>
      <p className="m-0">
        <Link className="text-link" href="/en">English</Link> · <Link className="text-link" href="/fr">Français</Link>
      </p>
    </main>
  );
}
