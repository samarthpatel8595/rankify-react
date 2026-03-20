"use client";

import { ArrowLeft, ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = {
  onMenuClick?: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => {      
  const pathname = usePathname();
  const pageMeta = (() => {
    switch (pathname) {
      case "/blogs":
        return {
          title: "Blog Posts",
          subtitle: "Create and manage your AI-powered content",
        };
      case "/podcasts":
        return {
          title: "Podcast Studio",
          subtitle: "Generate Podcast Script From Your Blog Posts",
        };
      case "/keyword-research":
        return {
          title: "Keyword Research",
          subtitle: "Discover high-potential keywords with AI-powered insights",
        };
      case "/youtube":
        return {
          title: "YouTube Manager",
          subtitle: "Link YouTube Videos to Your Blog Posts for Better SEO",
        };
        case "/events":
        return {
          title: "Create New Event",
          subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        };
      case "/events/create":
        return {
          title: "Event Deshboard",
          subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        };
        case "/image-generation":
        return {
          title: "Image Generation",
          subtitle: "Create and manage your AI-powered content",
        };
        case "/image-generation/text-to-podcast":
        return {
          title: "Image Generation",
          subtitle: "Create and manage your AI-powered content",
        };
      default:
        return null;
    }
  })();

  return (
    <header className="sticky top-0 z-20 m-0 flex flex-wrap items-center justify-between gap-3 border-b border-platinum bg-white px-4 py-4 shadow-[0_8px_20px_-18px_rgba(28,31,48,0.5)] sm:gap-4 sm:px-6">
      <div className="flex items-center gap-3">
        {pageMeta ? (
          <Link
            href="/"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-ink transition hover:bg-slate-50 sm:inline-flex"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={18} />
          </Link>
        ) : (
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center text-ink md:hidden"
            aria-label="Open menu"
            onClick={onMenuClick}
          >
            <Menu size={18} />
          </button>
        )}
        {pageMeta ? (
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center text-ink sm:hidden"
            aria-label="Open menu"
            onClick={onMenuClick}
          >
            <Menu size={18} />
          </button>
        ) : null}
        {pageMeta ? (
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-ink sm:text-base">
              {pageMeta.title}
            </p>
            <p className="text-xs text-independence sm:text-sm">
              {pageMeta.subtitle}
            </p>
          </div>
        ) : (
          <h1 className="text-base font-semibold text-ink sm:text-lg">
            Welcome Evano..!!
          </h1>
        )}
      </div>
      <button
        type="button"
        className="flex items-center gap-3 px-2 py-2 text-left sm:px-3"
        aria-label="Open profile menu"
      >
        <Image
          src="/images/header/user.png"
          alt="User avatar"
          height={40}
          width={40}
          className="h-9 w-9 rounded-full sm:h-10 sm:w-10"
        />
        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold text-ink">Evano</p>
          <p className="text-xs text-independence">Rankify 365</p>
        </div>
        <span className="ml-1 text-sm text-independence sm:ml-2">
          <ChevronDown size={18} />
        </span>
      </button>
    </header>
  );
}

export default Header;
