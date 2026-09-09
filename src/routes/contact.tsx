import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Nav, Footer, Contact } from "./index";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  useEffect(() => {
    // Scroll reveal logic
    const sections = document.querySelectorAll<HTMLElement>("main section");
    const targets: HTMLElement[] = [];
    sections.forEach((section) => {
      const kids = Array.from(section.children) as HTMLElement[];
      const roots = kids.length === 1 && kids[0].children.length > 0
        ? (Array.from(kids[0].children) as HTMLElement[])
        : kids;
      roots.forEach((el, i) => {
        el.classList.add("reveal");
        el.style.setProperty("--reveal-delay", `${Math.min(i * 80, 320)}ms`);
        targets.push(el);
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-clip pt-20">
      <Nav />
      {/* Dedicate page space and center the form card */}
      <Contact />
      <Footer />
    </main>
  );
}
