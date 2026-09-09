import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Nav, Footer, Portfolio } from "./index";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
});

function PortfolioPage() {
  useEffect(() => {
    // Scroll reveal logic — adapted for tall pages with large grids.
    // We target individual leaf elements rather than wrapping containers
    // so IntersectionObserver thresholds are always reachable.
    const sections = document.querySelectorAll<HTMLElement>("main section");
    const targets: HTMLElement[] = [];

    sections.forEach((section) => {
      // Filter out absolute-positioned decorative blobs
      const kids = (Array.from(section.children) as HTMLElement[]).filter(
        (el) => {
          const pos = window.getComputedStyle(el).position;
          return pos !== "absolute" && pos !== "fixed";
        }
      );

      const roots =
        kids.length === 1 && kids[0].children.length > 0
          ? (Array.from(kids[0].children) as HTMLElement[])
          : kids;

      roots.forEach((el, i) => {
        // If the element is a large grid (e.g. the project card grid),
        // reveal each child card individually instead of the whole grid.
        if (el.offsetHeight > 600 && el.children.length > 1) {
          Array.from(el.children).forEach((child, j) => {
            const htmlChild = child as HTMLElement;
            htmlChild.classList.add("reveal");
            htmlChild.style.setProperty(
              "--reveal-delay",
              `${Math.min(j * 50, 300)}ms`
            );
            targets.push(htmlChild);
          });
        } else {
          el.classList.add("reveal");
          el.style.setProperty(
            "--reveal-delay",
            `${Math.min(i * 80, 320)}ms`
          );
          targets.push(el);
        }
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
      {/* Render the full portfolio showcase with all projects loaded */}
      <Portfolio isFullPage={true} />
      <Footer />
    </main>
  );
}
