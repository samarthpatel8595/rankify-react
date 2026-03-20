"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, X, Youtube, ImageIcon } from "lucide-react";
import { BlogIcon, DashboardIcon } from "@/components/common/Icons";
import { CalendarCheck } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: DashboardIcon },
  { label: "Blogs", href: "/blogs", icon: BlogIcon },
  { label: "Podcasts", href: "/podcasts", icon: "podcasts" },
  { label: "YouTube", href: "/youtube", icon: Youtube },
  { label: "Keyword Research", href: "/keyword-research", icon: Search },
  { label: "Events", href: "/events", icon: CalendarCheck},
  { label: "Image Generation", href: "/image-generation", icon:ImageIcon},
];

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const pathname = usePathname();

  const renderNavLinks = () => (
    <nav className="flex flex-1 flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`group flex items-center justify-start gap-3 rounded-xl px-4 py-3 text-left text-base font-medium transition ${isActive
              ? "bg-white/10 text-sunray"
              : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            onClick={onClose}
          >
            {Icon === "podcasts" ? (
              <Image
                src={
                  isActive
                    ? "/icons/podcast-icon-gold.svg"
                    : "/icons/podcast-icon-white.svg"
                }
                alt="Podcasts"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            ) : (
              <Icon
                className={`h-6 w-6 ${isActive
                  ? "text-sunray"
                  : "text-white/70 group-hover:text-white"
                  }`}
              />
            )}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="relative hidden h-screen w-full flex-col gap-8 bg-ink px-6 pb-10 pt-8 text-floral md:sticky md:top-0 md:flex">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/ASC-Rankify-365-White-Logo.svg"
              alt="Rankify 365"
              width={180}
              height={40}
            className="h-9 w-auto"
          />
        </Link>
      </div>
        {renderNavLinks()}
      </aside>
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 transition md:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col gap-8 bg-ink px-6 pb-10 pt-6 text-floral shadow-2xl transition md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <Image
              src="/images/ASC-Rankify-365-White-Logo.svg"
              alt="Rankify 365"
              width={180}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white"
            aria-label="Close menu"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        {renderNavLinks()}
      </aside>
    </>
  );
}

export default Sidebar;
