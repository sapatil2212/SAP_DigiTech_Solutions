import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { Nav, Footer } from "../index";
import {
  GraduationCap, Star, Clock, Users, ArrowRight, ExternalLink,
  Sparkles, CheckCircle2, Search, Phone
} from "lucide-react";
import {
  getAllProductDetails,
  loadAndSyncCustomProducts,
  type ProductDetail,
} from "@/lib/productData";

export const Route = createFileRoute("/products/")({
  component: ProductsPage,
  loader: async () => {
    const prods = await loadAndSyncCustomProducts();
    return { initialProducts: prods };
  },
});

/* -------------------------------------------------------------------------- */
/*                               Main Page Route                              */
/* -------------------------------------------------------------------------- */
function ProductsPage() {
  const loaderData = Route.useLoaderData();
  const [products, setProducts] = useState<ProductDetail[]>(() => {
    return loaderData?.initialProducts || getAllProductDetails();
  });
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sync on mount and listen to any product updates from admin
  useEffect(() => {
    loadAndSyncCustomProducts().then((all) => {
      setProducts([...all]);
    });

    const handleUpdate = () => {
      setProducts([...getAllProductDetails()]);
    };
    window.addEventListener("sap_products_updated", handleUpdate);
    return () => {
      window.removeEventListener("sap_products_updated", handleUpdate);
    };
  }, []);

  // Compute dynamic category pills from products
  const categories = useMemo(() => {
    const list = [{ id: "all", label: `All Products (${products.length})` }];
    const seen = new Set<string>();

    for (const p of products) {
      const cat = p.categoryName || p.categoryGroup;
      if (cat && !seen.has(cat)) {
        seen.add(cat);
        list.push({ id: cat, label: cat });
      }
    }
    return list;
  }, [products]);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === "all" ||
      p.categoryName === activeCategory ||
      p.categoryGroup === activeCategory ||
      (p as any).category === activeCategory;

    const matchesSearch =
      searchQuery.trim() === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.heroDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#FDFDFC] text-slate-900 overflow-x-clip pt-28 md:pt-32 selection:bg-[#FF6B00] selection:text-white">
      <Nav />

      {/* Hero Header Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Ambient Subtle Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-radial from-[#FF6B00]/8 via-slate-200/30 to-transparent blur-3xl pointer-events-none" />

        <div className="container-1280 relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/10 text-slate-800 text-xs font-semibold tracking-wide">
            <span className="size-2 rounded-full bg-[#FF6B00] animate-pulse" />
            <span>SAP DigiTech Software Suite</span>
            <span className="text-slate-300">|</span>
            <span className="text-[#FF6B00] font-bold">100% White-Label Code</span>
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1B2240] tracking-tight leading-[1.08]">
            Explore Proprietary SaaS &<br className="hidden sm:inline" />{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#E05300] to-[#1B2240] bg-clip-text text-transparent">
              Production Codebases.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Battle-tested enterprise applications, AI automation tools, and multi-tenant architectures. Get complete source code ownership with zero recurring royalty fees.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, tech stacks, or features..."
              className="w-full bg-white border border-slate-200 rounded-full pl-11 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FF6B00] transition-colors shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={[
                  "px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border",
                  activeCategory === cat.id
                    ? "bg-[#1B2240] text-white border-[#1B2240] shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900"
                ].join(" ")}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────── */}
      {/*              Course-Style Product Cards Grid (Light Mode)                 */}
      {/* ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-8 md:py-16 relative">
        <div className="container-1280 px-4">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="text-base text-slate-600">No products found matching "{searchQuery}".</p>
              <button
                type="button"
                onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                className="btn-primary text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((prod) => {
                const liveUrl = prod.url.startsWith("http://") || prod.url.startsWith("https://")
                  ? prod.url
                  : `https://${prod.url}`;
                const originalPrice = prod.sourceCodeOffer?.originalPrice || 49999;
                const fixedPrice = prod.sourceCodeOffer?.fixedPrice || 499;
                const discount = prod.sourceCodeOffer?.discountPercentage || 99;
                const badge = prod.badge || "PREMIUM";
                const level = prod.categoryGroup || "ENTERPRISE SAAS";

                return (
                  <div
                    key={prod.id}
                    className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-[#FF6B00]/60 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/70"
                  >
                    {/* Card Thumbnail Header (16:9 Aspect Ratio) */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                      <img
                        src={prod.localImg || "/assets/work/website-preview/briefvault.png"}
                        alt={`${prod.name} Preview`}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/assets/work/website-preview/briefvault.png";
                        }}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/30 pointer-events-none" />

                      {/* Top-Left Pill Badge: PREMIUM */}
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-[0.68rem] font-bold text-white uppercase tracking-wider shadow-sm">
                        <CheckCircle2 className="size-3 text-emerald-400" />
                        <span>{badge}</span>
                      </div>

                      {/* Top-Right Pill Badge: Discount Highlight */}
                      <div className="absolute top-3 right-3 inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-white text-xs font-black shadow-md shadow-[#FF6B00]/25">
                        <span>{discount}% OFF</span>
                      </div>
                    </div>

                    {/* Card Body Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      {/* Top Row: Architecture Level & Rating */}
                      <div className="flex items-center justify-between text-xs font-semibold mb-2">
                        <div className="flex items-center gap-1.5 text-slate-500 text-[0.72rem] font-bold uppercase tracking-wider">
                          <GraduationCap className="size-3.5 text-[#FF6B00]" />
                          <span>{level}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                          <Star className="size-3.5 fill-amber-400 text-amber-400" />
                          <span>4.9</span>
                        </div>
                      </div>

                      {/* Product Title */}
                      <Link
                        to="/products/$productId"
                        params={{ productId: prod.id }}
                        className="group/title block"
                      >
                        <h3 className="text-xl font-bold text-[#1B2240] group-hover/title:text-[#FF6B00] transition-colors leading-tight line-clamp-1">
                          {prod.name}
                        </h3>
                      </Link>

                      {/* Description / Tagline (2 Lines) */}
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                        {prod.heroDesc || prod.tagline || prod.detailedDesc}
                      </p>

                      {/* Metadata Row with subtle border divider */}
                      <div className="flex items-center gap-4 py-3 my-3 border-y border-slate-100 text-[0.72rem] text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Clock className="size-3.5 text-slate-400" />
                          <span>FULL SOURCE CODE</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="size-3.5 text-slate-400" />
                          <span>BY SAP DIGITECH</span>
                        </div>
                      </div>

                      {/* Card Footer: Pricing & Explore Action Button */}
                      <div className="flex items-center justify-between pt-1 mt-auto">
                        {/* Left: Pricing details */}
                        <div className="flex flex-col">
                          <span className="line-through text-xs text-slate-400 font-medium">
                            ₹{originalPrice.toLocaleString("en-IN")}
                          </span>
                          <span className="text-2xl font-black text-[#1B2240] leading-none mt-0.5">
                            ₹{fixedPrice.toLocaleString("en-IN")}
                          </span>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2">
                          {/* Live Website Preview Icon */}
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Launch ${prod.name} live application`}
                            className="size-10 rounded-xl bg-slate-100 hover:bg-[#FF6B00] text-slate-600 hover:text-white grid place-items-center transition-all duration-200 border border-slate-200"
                          >
                            <ExternalLink className="size-4" />
                          </a>

                          {/* Explore CTA Button */}
                          <Link
                            to="/products/$productId"
                            params={{ productId: prod.id }}
                            className="px-5 py-2.5 rounded-xl bg-[#1B2240] text-white hover:bg-[#FF6B00] font-extrabold text-xs tracking-wider uppercase transition-all duration-200 shadow-sm flex items-center gap-1.5 group/btn"
                          >
                            <span>EXPLORE</span>
                            <ArrowRight className="size-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────── */}
      {/*                 Enterprise Custom Engineering Studio CTA                   */}
      {/* ────────────────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#080C16] text-white border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00]/10 via-transparent to-cyan-500/10 pointer-events-none" />
        <div className="container-1280 relative z-10 text-center max-w-3xl mx-auto px-4 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
            <Sparkles className="size-3.5 text-[#FF6B00]" /> Custom Systems Engineering & White-Labeling
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Need a Bespoke SaaS Platform or Custom AI Integration?
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Our engineering studio builds white-labeled SaaS portals, custom CRM workflows, and autonomous AI integrations tailored specifically for your vertical.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a href="/contact" className="btn-primary">
              Book Architecture Strategy Call <ArrowRight className="size-4" />
            </a>
            <a
              href="https://wa.me/917745868073?text=Hi%20SAP%20DigiTech%20Solutions%2C%20I%20would%20like%20to%20discuss%20custom%20SaaS%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Phone className="size-4 text-[#25D366]" /> +91 77458 68073
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
