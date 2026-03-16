import Button from "@/components/common/Button";
import { Plus, Youtube } from "lucide-react";

const YouTubePage = () => {
  return (
    <section className="rounded-3xl border border-platinum bg-white p-4 shadow-[0_18px_40px_-32px_rgba(28,31,48,0.5)] sm:p-6 lg:p-8">
      <div className="flex min-h-65 flex-col items-center justify-center px-4 py-10 text-center sm:min-h-75 sm:px-8">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sunray/10 text-sunray">
          <Youtube size={34} />
        </span>
        <h1 className="mt-4 text-base font-semibold text-ink sm:text-lg">
          No Blog Posts Yet
        </h1>
        <p className="mt-2 max-w-xl text-xs text-independence sm:text-sm">
          Link YouTube Videos to Your Blog Posts For Better SEO
        </p>
        <Button
          className="mt-5 w-full max-w-60 py-3 text-sm font-normal shadow-[0_10px_24px_-16px_rgba(201,170,63,0.8)]"
          icon={<Plus size={18} />}
          variant="primary"
        >
          Create Your First Blog
        </Button>
      </div>
    </section>
  );
}

export default YouTubePage;